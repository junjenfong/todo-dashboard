import axios from 'axios'
axios.defaults.baseURL = process.env.vue_rails_api

export default {
  async function () {
    const response = await axios.get('todos')
    return response.data
  }

}
