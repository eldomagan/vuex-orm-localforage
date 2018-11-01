import Action from './Action';
import Context from '../common/context';

export default class Fetch extends Action {
  /**
   * Call $fetch method
   * @param {object} store
   * @param {object} params
   */
  static async call({ state, dispatch }) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);

    const records = [];

    return model.$localStore.iterate((record) => {
      records.push(record);
    }).then(() => dispatch('insertOrUpdate', {
      data: records,
    }));
  }
}
