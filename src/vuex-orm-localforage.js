import Context from './common/context';
import Action from './actions/Action';
import Fetch from './actions/Fetch';
import Persist from './actions/Persist';
import Get from './actions/Get';
import Destroy from './actions/Destroy';
import DestroyAll from './actions/DestroyAll';
import Replace from './actions/Replace';

export default class VuexOrmLocalForage {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
   */
  constructor(components, options) {
    Context.setup(components, options);
    this.setupActions();
    this.setupModels();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get
   */
  setupActions() {
    const context = Context.getInstance();
    const { actions } = context.options;

    context.components.Actions[actions.$get] = Get.call.bind(Get);
    context.components.Actions[actions.$fetch] = Fetch.call.bind(Fetch);
    context.components.Actions[actions.$create] = Persist.create.bind(Persist);
    context.components.Actions[actions.$update] = Persist.update.bind(Persist);
    context.components.Actions[actions.$replace] = Replace.call.bind(Replace);
    context.components.Actions[actions.$delete] = Destroy.call.bind(Destroy);
    context.components.Actions[actions.$deleteAll] = DestroyAll.call.bind(DestroyAll);
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels() {
    const context = Context.getInstance();
    const { actions } = context.options;

    /**
     * Transform Model and Modules
     */
    context.database.entities.forEach((entity) => {
      entity.model = Action.transformModel(entity.model);
    });

    context.components.Model[actions.$fetch] = function fetchFromLocalStore(payload = {}) {
      return this.dispatch(actions.$fetch, payload);
    };

    context.components.Model[actions.$get] = function getFromLocalStore(payload = {}) {
      return this.dispatch(actions.$get, payload);
    };

    context.components.Model[actions.$create] = function insertIntoLocalStore(payload = {}) {
      return this.dispatch(actions.$create, payload);
    };

    context.components.Model[actions.$update] = function updateToLocalStore(payload = {}) {
      return this.dispatch(actions.$update, payload);
    };

    context.components.Model[actions.$replace] = function replaceLocalStore(payload = {}) {
      return this.dispatch(actions.$replace, payload);
    };

    context.components.Model[actions.$delete] = function deleteFromLocalStore(payload = {}) {
      return this.dispatch(actions.$delete, payload);
    };

    context.components.Model[actions.$deleteAll] = function clearLocalStore() {
      return this.dispatch(actions.$deleteAll);
    };
  }
}
