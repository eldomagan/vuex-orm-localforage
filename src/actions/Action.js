import { merge as _merge } from 'lodash-es';
import localforage from 'localforage';
import Context from '../common/context';

export default class Action {
  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    const context = Context.getInstance();

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

    model.$localStore = localforage.createInstance({
      name: Context.getInstance().options.name,
      storeName: model.entity,
    });

    return model;
  }

  static getRecordKey(record) {
    return typeof record.$id === 'string' ? record.$id : String(record.$id);
  }
}
