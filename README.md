[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/vuex-orm-localforage.svg)](https://github.com/eldomagan/vuex-orm-localforage/blob/master/LICENSE.md)

# Vuex ORM Plugin: LocalForage

VuexORMLocalforage is a plugin for the amazing [VuexORM](https://github.com/vuex-orm/vuex-orm) that let you sync your [Vuex](https://github.com/vuejs/vuex) Store with an IndexedDB database using [LocalForage](https://github.com/localForage/localForage).

## Installation

Add the package to your dependencies

```shell
yarn add vuex-orm-localforage
```
Or

```shell
npm install --save vuex-orm-localforage
```

Then you can setup the plugin

``` js
import VuexORM from '@vuex-orm/core'
import VuexORMLocalForage from 'vuex-orm-localforage'

const database = new VuexORM.Database()

VuexORM.use(VuexORMLocalForage, {
  database
})

// ...

export default () => new Vuex.Store({
  namespaced: true,
  plugins: [VuexORM.install(database)]
})

```

See https://vuex-orm.github.io/vuex-orm/guide/prologue/getting-started.html#create-modules on how to setup the database

## Actions

This plugin add some vuex actions to load and persist data in an IndexedDB

| Action  | Description |
| ------- | ----------- |
| $fetch  | Load data from the IndexedDB store associated to a model and persist them in the Vuex Store |
| $get    | Load data by id from the IndexedDB store associated and persist it to Vuex Store |
| $create | Like VuexORM `insertOrUpdate`, but also persist data to IndexedDB |
| $update | Update records using VuexORM `update` or `insertOrUpdate` then persist changes to IndexedDB |
| $delete | Like VuexORM `delete`, but also remove data from IndexedDB |

## Example Usage

```vue
<template>
  <div>
    <input type="text" v-model="todo">
    <input type="button" @click="addTodo">

    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>

<script>
  import Todo from './store/models/Todo'

  export default {
    data () {
      return {
        todo: ''
      }
    },

    computed: {
      todos () {
        return Todo.query().all()
      }
    },

    async mounted () {
      // Load todos from IndexedDB
      await Todo.$fetch()
    },

    methods: {
      addTodo () {
        if (this.todo) {
          // Insert the todo in VuexORM Store and also persist it to IndexedDB
          Todo.$create({
            title: this.todo
          })
        }
      }
    }
  }
</script>
```
## Configuration Options

These are options you can pass when calling VuexORM.use()

```js
{
  // The VuexORM Database instance
  database,

  /**
   * LocalForage config options
   *
   * @see https://github.com/localForage/localForage#configuration
   */
  localforage: {
    name: 'vuex', // Name is required
    ...
  },

  /**
   * You can override names of actions introduced by this plugin
   */
  actions: {
    $get: '$get',
    $fetch: '$fetch',
    $create: '$create',
    $update: '$update',
    $delete: '$delete'
  },

  /**
   * Function use to generate record id when the primary key is not auto increment
   */
  generateId (record) {

  }
}
```

You can also override localforage config per model

```js
class Post extends Model {
  static localforage = {
    driver: localforage.WEBSQL,
    storeName: 'my_posts'
  }
}
```

## Using with other VuexORM Plugin

There may be a conflict when using this plugin along with other VuexORM plugins as they are following the same API (aka they introduced the same actions: $fetch, $create...)


Just override actions names like that

```js
VuexORM.use(VuexORMLocalForage, {
  database,
  actions: {
    $get: '$getFromLocal',
    $fetch: '$fetchFromLocal',
    $create: '$createLocally',
    $update: '$updateLocally',
    $delete: '$deleteFromLocal'
  }
})
```

Then

```js
Post.$fetchFromLocal() // instead of Post.$fetch()
...
```
