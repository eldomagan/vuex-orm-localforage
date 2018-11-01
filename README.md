# Vuex ORM Plugin: LocalForage

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/vuex-orm-localforage.svg)](https://github.com/eldomagan/vuex-orm-localforage/blob/master/LICENSE.md)

# Installation
``` js
import VuexORM from '@vuex-orm/core'
import VuexORMLocalForage from 'vuex-orm-localforage'
import database from './database'
..

VuexORM.use(VuexORMLocalForage, {
  database
})
..

export default () => new Vuex.Store({
  namespaced: true,
  plugins: [VuexORM.install(database)]
})

```
