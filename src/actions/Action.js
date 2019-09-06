import _merge from 'lodash-es/merge';
import localforage from 'localforage';
import Context from '../common/context';

export default class Action {
  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    const context = Context.getInstance();

    model.localforage = _merge({ storeName: model.entity }, model.localforage || {});

    const originaIdFnName = model.getIndexIdFromRecord ? 'getIndexIdFromRecord' : 'id';
    const originalIdFn = model[originaIdFnName];

    if (typeof originalIdFn === 'function') {
      model[originaIdFnName] = function idFn(record) {
        const keys = Array.isArray(this.primaryKey) ? this.primaryKey : [this.primaryKey];

        keys.forEach((key) => {
          if (!record[key]) {
            record[key] = context.options.generateId(record);
          }
        });

        return originalIdFn.call(model, record);
      };
    }

    model.$localStore = localforage.createInstance(_merge(
      {},
      Context.getInstance().options.localforage,
      model.localforage,
    ));

    return model;
  }

  static getRecordKey(record) {
    return typeof record.$id === 'string' ? record.$id : String(record.$id);
  }
}
