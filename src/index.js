import VuexOrmLocalForage from './vuex-orm-localforage';

export default class VuexOrmLocalForagePlugin {
  /**
   * This is called, when VuexORM.install(VuexOrmLocalForage, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexOrmLocalForage}
   */
  static install(components, options) {
    return new VuexOrmLocalForage(components, options);
  }
}
