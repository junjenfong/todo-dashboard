<template>
    <v-container>
        <v-col
          v-for="item in reverse"
          :key="item.id"
          cols="12"
        >
          <v-card
          color="#952175"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.body"></v-card-subtitle>
                <v-card-subtitle v-text="item.is_active"></v-card-subtitle>

                </div>
              </div>
                <div>
                  <v-col
                      cols="12"
                      class="text-right"
                    >
                    <v-icon class="mr-3" @click="editTodo(item.id)">mdi-pencil</v-icon>
                    <v-icon class="mr-3" @click="MarkAsDone(item.id)">mdi-check-circle</v-icon>

                    </v-col>

            </div>

          </v-card>
        </v-col>
    </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  props: ['getData', 'todos'],
  computed: {
    reverse () {
      // if (this.todos.length > 10) {
      //   return this.todos.slice(10)
      // } else {
      //   return this.todos.slice().reverse()
      // }
      return this.todos.slice().reverse()
    }
  },
  methods: {
    MarkAsDone: function (val) {
      console.log('markasdone', val)
      this.$http.secured.delete(`/api/v1/todos/${val}`)
        .then(res => {
          console.log(res)
          this.$parent.fetchData()
        })
        .catch(error => { console.log(error) })
    },
    editTodo: function (val) {
      console.log('editTodo', val)
      this.$parent.editData(val)
    }
  },
  created () {
    console.log('child', this.todos)
  }
}
</script>
