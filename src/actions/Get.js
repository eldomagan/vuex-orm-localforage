import Action from './Action';
import Context from '../common/context';

export default class Get extends Action {
  /**
   * Call $fetch method
   * @param {object} store
   * @param {object} params
   */
  static async call({ state, dispatch }, params) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const id = typeof params === 'object' ? params.id : params;

    if (id) {
      return model.$localStore.getItem(id)
        .then(record => dispatch('insertOrUpdate', {
          data: record,
        }));
    }

    return null;
  }
}
