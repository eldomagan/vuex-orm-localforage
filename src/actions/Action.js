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

    const originalFill = model.prototype.$fill;

    model.prototype.$fill = function fill(record) {
      const keys = Array.isArray(model.primaryKey) ? model.primaryKey : [model.primaryKey];

      keys.forEach((key) => {
        if (!record[key]) {
          record[key] = context.options.generateId(record);
        }
      });

      originalFill.call(this, record);
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
