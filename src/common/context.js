import deepmerge from 'deepmerge';
import { VuexOrmPluginConfig } from '../support/interfaces';

export default class Context {
  /**
   * Private constructor, called by the setup method
   *
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
   */
  constructor(components, options) {
    this.components = components;
    this.options = deepmerge({}, VuexOrmPluginConfig, options);
    this.database = options.database;

    if (!this.options.localforage) {
      this.options.localforage = {
        name: this.options.name,
      };
    }

    if (!options.database) {
      throw new Error('database option is required to initialise!');
    }
  }

  /**
   * This is called only once and creates a new instance of the Context.
   * @param {Components} components The Vuex-ORM Components collection
   * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
   * @returns {Context}
   */
  static setup(components, options) {
    this.instance = new Context(components, options);
    return this.instance;
  }

  /**
   * Get the singleton instance of the context.
   * @returns {Context}
   */
  static getInstance() {
    return this.instance;
  }

  /**
   * Get Model from State
   * @param {object} state
   */
  getModelFromState(state) {
    const entity = this.database.entities.find((e) => e.name === state.$name);
    return entity && entity.model;
  }

  /**
   * Get model by entity
   * @param {Object} entity
   */
  getModelByEntity(entity) {
    return _find(this.database.entities, {
      name: entity,
    }).model;
  }
}
