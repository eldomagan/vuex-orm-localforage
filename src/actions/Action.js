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

    /**
     * Rewrite model id generator using the one provided by user
     */
    const oldIdFn = model.id;
    model.id = (record) => {
      const keys = Array.isArray(model.primaryKey) ? model.primaryKey : [model.primaryKey];

      keys.forEach((key) => {
        if (!record[key]) {
          record[key] = context.options.generateId(record);
        }
      });

      return oldIdFn.call(model, record);
    };

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
