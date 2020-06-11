import Action from './Action';
import Context from '../common/context';

export default class DestroyAll extends Action {
  /**
   * Is Called after new model deletion from the store
   *
   * @param {object} record
   * @param {string} entityName
   */
  static async call({ state, dispatch }) {
    return dispatch('deleteAll').then(async (result) => {
      const context = Context.getInstance();
      const model = context.getModelFromState(state);
      model.$localStore.clear();

      return result;
    });
  }
}
