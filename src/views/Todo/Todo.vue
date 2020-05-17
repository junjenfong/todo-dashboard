<template>
  <div>
      <v-container class="py-0" cols="12">
          <v-form @submit.prevent="storeDB">
          <v-row>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="title"
                class="purple-input"
                label="Title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-textarea
                v-model="body"
                class="purple-input"
                label="Body"
                auto-grow
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              class="text-right"
              md="4"
            >
              <v-btn
                color="success"
                class="mr-3"
                type="submit"
              >
                Add Todo
              </v-btn>
              <v-btn
              color="primary"
              class="mr-0"
              @click="resetForm"
              >
              Reset
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
     <TodoList
    :todos="todos"
    />
  </div>
</template>

<script>
import TodoList from '@/views/Todo/TodoList'
export default {
  name: 'Todo',
  components: {
    TodoList
  },
  data () {
    return {
      title: '',
      body: '',
      todos: []
    }
  },
  methods: {
    resetForm: function () {
      this.title = ''
      this.body = ''
    },
    storeDB: function () {
      const formData = {
        title: this.title,
        body: this.body
      }
      console.log(formData)
      console.log(this.todos)
    }
  },
  created () {
    this.$http.plain.get('/')
      .then(response => { this.todos = response.data })
    console.log(this.todos)
    this.todos.map(e => ({
      id: e.id,
      color: '#1F7087',
      title: e.title,
      body: e.body
    }))
    console.log(this.todos)
  }
}
</script>
<style type="text/css"></style>
