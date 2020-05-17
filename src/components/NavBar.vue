<template>
  <div>
    <template>
      <div>
        <v-app-bar
          color="deep-purple accent-4"
          dense
          dark
        >
          <v-toolbar-title @click="directBackHome">Todo List</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items v-if="!signedIn()">
          <v-btn @click="directToLogin" text >
           Login
          </v-btn>

          <v-btn @click="directToSignup" text>
            Signup
          </v-btn>

        </v-toolbar-items>

          <v-toolbar-items v-if="signedIn()">
            <v-btn @click="viewTodo" text>Add todo</v-btn>
            <v-btn @click="signOut" text>Signout</v-btn>
          </v-toolbar-items>
          <v-menu
            left
            bottom
          >

          </v-menu>
        </v-app-bar>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {

  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'failed to sign out'))
    },
    directBackHome () {
      console.log('asdasd')
      this.$router.push('/')
    },
    directToLogin () {
      this.$router.replace('/login')
    },
    directToSignup () {
      this.$router.replace('/signup')
    },
    viewTodo () {
      this.$router.replace('/todo')
    }
  },
  created () {
    this.signedIn()
  }
}
</script>
