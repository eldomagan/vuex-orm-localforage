[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/vuex-orm-localforage.svg)](https://github.com/eldomagan/vuex-orm-localforage/blob/master/LICENSE.md)

# Vuex ORM Plugin: LocalForage

VuexORMLocalforage is a plugin for the amazing [VuexORM](https://github.com/vuex-orm/vuex-orm) that let you sync your [Vuex](https://github.com/vuejs/vuex) with an IndexedDB database using [LocalForage](https://github.com/localForage/localForage).

## Installation
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
| $create | Like VuexORM `insert`, but also persist data to IndexedDB |
| $update | Like VuexORM `update`, but also persist changes to IndexedDB |
| $delete | Like VuexORM `delete`, but also remove data from IndexedDB |

### Example Usage

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
