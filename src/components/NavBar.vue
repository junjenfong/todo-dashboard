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

          <v-btn @click="directToLogin" text >
           Login
          </v-btn>

          <v-btn text>
            register
          </v-btn>
        <!--   <v-toolbar-items v-if="isLoggedIn">
            <v-btn text>Add todo</v-btn>
            <b-btn text @click="logout">Signout</b-btn>
          </v-toolbar-items> -->
          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
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
    directBackHome () {
      console.log('asdasd')
      this.$router.push('/')
    },
    directToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
