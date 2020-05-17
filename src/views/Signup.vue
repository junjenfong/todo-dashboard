<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark flat>
            <v-toolbar-title>Signup form</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip bottom></v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Login" name="login" type="text" v-model="email"></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                id="password_confirmation"
                label="Password Confirmation"
                name="password_confirmation"
                type="password"
                v-model="password_confirmation"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="signUp">Signup</v-btn>
            <v-btn color="error" @click="resetForm" class="reset">Reset Form</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SweetAlert from '@/services/sweetalert'
export default {
  name: 'Signup',
  components: {},
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  methods: {
    resetForm () {
      this.email = ''
      this.password = ''
      this.password_confirmation = ''
    },
    signUp () {
      const userDetails = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      console.log(this.$http)
      this.$http.plain.post('/signup', userDetails)
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      console.log(response)
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.go('/')
    },
    signupFailed (error) {
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
  }
}
</script>
