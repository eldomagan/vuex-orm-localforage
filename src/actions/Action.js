import _merge from 'lodash-es/merge';
import localforage from 'localforage';
import Context from '../common/context';

export default class Action {
  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    model.localforage = _merge({ storeName: model.entity }, model.localforage || {});

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
