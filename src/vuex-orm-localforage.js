import { map as _map } from 'lodash-es';
import Context from './common/context';
import Action from './actions/Action';
import Fetch from './actions/Fetch';
import Persist from './actions/Persist';
import Get from './actions/Get';
import Destroy from './actions/Destroy';

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
    this.setupLifecycles();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get
   */
  setupActions() {
    const context = Context.getInstance();

    context.components.Actions.$get = Get.call.bind(Get);
    context.components.Actions.$fetch = Fetch.call.bind(Fetch);
    context.components.Actions.$create = Persist.create.bind(Persist);
    context.components.Actions.$update = Persist.update.bind(Persist);
    context.components.Actions.$delete = Destroy.call.bind(Destroy);
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels() {
    const context = Context.getInstance();

    /**
     * Transform Model and Modules
     */
    _map(context.database.entities, (entity) => {
      entity.model = Action.transformModel(entity.model);
      return entity;
    });

    context.components.Model.$fetch = function fetchFromLocalStore(config = {}) {
      return this.dispatch('$fetch', config);
    };

    context.components.Model.$get = function getFromLocalStore(config = {}) {
      return this.dispatch('$get', config);
    };

    context.components.Model.$create = function insertIntoLocalStore(config = {}) {
      return this.dispatch('$create', config);
    };

    context.components.Model.$update = function updateToLocalStore(config = {}) {
      return this.dispatch('$update', config);
    };

    context.components.Model.$delete = function deleteFromLocalStore(config = {}) {
      return this.dispatch('$delete', config);
    };
  }

  setupLifecycles() {
    const context = Context.getInstance();

    if (context.options.beforeCreate) {
      context.components.Query.on('beforeCreate', context.options.beforeCreate);
    }
  }
}
