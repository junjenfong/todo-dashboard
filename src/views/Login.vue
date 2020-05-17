<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip bottom></v-tooltip>
          </v-toolbar>
          <v-form @submit.prevent="signIn">
          <v-card-text>
              <v-text-field label="Login" name="login" type="text" v-model="email"></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                v-model="password"
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" type="submit">Login</v-btn>
            <v-btn color="error" @click="resetForm" class="reset">Reset Form</v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SweetAlert from '@/services/sweetalert'
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    resetForm () {
      this.email = ''
      this.password = ''
    },
    signIn () {
      console.log('click le')
      const userDetails = {
        email: this.email,
        password: this.password
      }
      this.$http.plain.post('/signin', userDetails)
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      console.log(response)
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.go('/')
    },
    signinFailed (error) {
      console.log(error)
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    }
  },
  created () {
    this.checkSignedIn()
    console.log('ok ah')
  }
}
</script>
