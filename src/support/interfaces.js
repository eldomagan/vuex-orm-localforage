import { Database } from '@vuex-orm/core';

/**
 * Genetate Random id
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export const VuexOrmPluginConfig = {
  /**
   * Default VuexORM Database
   */
  database: new Database(),

  /**
   * Default DataSrore prefix
   */
  name: 'vuex',

  commonFields: {},

  /**
   * Generate Id for
   */
  generateId: guid,

  /**
   * Load data from localstore on startup
   */
  autoFetch: true,

  /**
   * @param {*} record
   */
  beforeCreate() {
  },
};

export default {
  VuexOrmPluginConfig,
};
