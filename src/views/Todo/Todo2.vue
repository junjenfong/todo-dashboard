<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
          <v-form @submit.prevent="storeDB">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                >
                <v-text-field
                  v-model="title"
                  class="purple-input"
                  label="Title"
                />
                </v-col>
                <v-col cols="12">
                <v-textarea
                  v-model="body"
                  class="purple-input"
                  label="Body"
                  auto-grow
                />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >

                  <v-btn
                    type="submit"
                    color="success"
                    class="mr-3"
                  >
                    Submit
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
            </v-container>
          </v-form>
      </v-col>

      <v-col
        cols="12"
        md="8"
      >
        <TodoList :todos="todos"/>
      </v-col>
    </v-row>
  </v-container>
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
      todos: [],
      error: ''
    }
  },
  methods: {
    resetForm: function () {
      this.title = ''
      this.body = ''
    },
    setError (error) {
      console.log(error)
      this.error = error
    },
    storeDB: function () {
      const formData = {
        title: this.title,
        body: this.body
      }
      console.log(formData)
      console.log(this.todos)
      this.$http.secured.post('/api/v1/todos', formData)
        .then(res => {
          console.log(res)
          this.fetchData()
        })
        .catch(error => { console.log(error) })
    },
    fetchData () {
      this.resetForm()
      this.$http.secured.get('/api/v1/todos')
        .then(response => { this.todos = response.data })
        .catch(error => this.setError(error))
    },
    editData (val) {
      this.$http.secured.patch(`/api/v1/todos/${val}`, { is_active: false })
        .then(res => {
          console.log(res)
          this.fetchData()
        })
        .catch(error => { console.log(error) })
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.fetchData()
    }
  }
}
</script>
