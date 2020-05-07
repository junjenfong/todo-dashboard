import Swal from 'sweetalert2'

export default {
  successfulLogin () {
    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  },
  failureLogin () {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
}
