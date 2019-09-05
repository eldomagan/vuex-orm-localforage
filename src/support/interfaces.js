import { Database } from '@vuex-orm/core';

/**
 * Generate Random id
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
   * @param {Database} Instance of VuexORM database
   */
  database: new Database(),

  /**
   * @param {string} Default DataStore prefix
   */
  name: 'vuex', // Keep for backward compatibilities

  /**
   * @param {object} localforage config
   */
  localforage: {
    name: 'vuex',
  },

  /**
   *
   */
  actions: {
    $fetch: '$fetch',
    $get: '$get',
    $create: '$create',
    $update: '$update',
    $delete: '$delete',
  },

  /**
   * Generate Id for
   */
  generateId: guid,

  /**
   * @param {boolean} Load data from LocalForage on startup
   */
  autoFetch: true,
};

export default {
  VuexOrmPluginConfig,
};
