import Model from '../orm/Model';
import Action from './Action';
import DestroyAll from './DestroyAll';

export default class Replace extends Action {
  /**
   * Replace all data with new from DB after new additions from the store
   *
   * @param {object} record
   * @param {object} payload
   */
  static async call({ state, dispatch }, payload) {
    return dispatch('create', payload).then((result) => {
      let records = [];
      if (Array.isArray(result)) {
        records = result;
      } else if (typeof result.$self === 'function') { // FIX: instance of Vuex Model is not working
        records.push(result);
      } else {
        Object.keys(result).forEach((entity) => {
          result[entity].forEach((record) => {
            records.push(record);
          });
        });
      }

      DestroyAll.clearDB(state);

      return Promise.all(records.map((record) => {
        const model = record.$self();
        const key = this.getRecordKey(record);
        const data = Model.getPersistableFields(model).reduce((obj, field) => {
          obj[field] = record[field];
          return obj;
        }, {});

        return model.$localStore.setItem(key, data);
      }));
    });
  }
}
