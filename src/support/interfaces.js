import { Database } from '@vuex-orm/core';

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
   * @param {boolean} Load data from LocalForage on startup
   */
  autoFetch: true,
};

export default {
  VuexOrmPluginConfig,
};
