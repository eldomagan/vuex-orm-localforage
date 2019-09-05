import { Model as VuexORMModel } from '@vuex-orm/core';
import Action from './Action';
import Model from '../orm/Model';
import Context from '../common/context';

export default class Persist extends Action {
  /**
   * Is called when an item is inserted or updated in the store
   *
   * @param {object} store
   * @param {object} payload
   */
  static async call({ dispatch }, payload, action = 'insertOrUpdate') {
    return dispatch(action, payload).then((result) => {
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

  static create(context, payload) {
    return this.call(context, payload);
  }

  static update(context, payload) {
    const vuexAction = payload.where ? 'update' : 'insertOrUpdate';
    return this.call(context, payload, vuexAction);
  }
}
