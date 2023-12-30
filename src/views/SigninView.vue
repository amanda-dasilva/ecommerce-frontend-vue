<template>
  <div class="container">
    <!--    Logo Div-->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../assets/logo.png" />
        </router-link>
      </div>
    </div>
    <!--    sign in form-->
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin-div" class="flex-item border">
          <h2 class="pt-4 pl-4">Sign-In</h2>
          <form @submit="signin" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                v-model.trim="email"
                required
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                v-model.trim="password"
                required
              />
            </div>
            <small class="form-text text-muted"
              >By continuing, you agree to Ecommerce's Conditions of Use and
              Privacy Notice.</small
            >
            <button type="submit" class="btn btn-secondary mt-2 py-0">
              Continue
              <!--  loading bar will appear when we are making the API call and saveing the token -->
              <div
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>
          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center"
            >New to Ecommerce?</small
          >
          <p class="text-center">
            <router-link
              :to="{ name: 'Signup' }"
              class="btn btn-dark text-center mx-auto px-5 py-1 mb-2"
              >Create Your Ecommerce Account</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
export default {
  name: 'SigninView',
  props: ['baseURL'],
  data() {
    return {
      email: null,
      password: null,
      loading: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      this.loading = true;
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        // call the API
        await api
          .post(`${this.baseURL}user/signIn`, JSON.stringify(user))
          .then(res => {
            // login successful, we will get token in res.data object
            localStorage.setItem('token', res.data.token);
            // redirect to home page
            this.$router.replace('/');
            swal({
              text: 'Login successful!',
              icon: 'success',
              closeOnClickOutside: false,
            });
          });
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          swal({
            text: 'Invalid email or password. Please try again.',
            icon: 'error',
            closeOnClickOutside: false,
          });
        } else {
          swal({
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            closeOnClickOutside: false,
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style scoped>
.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8 #a2a6ac #a2a6ac;
}

.btn-secondary {
  background-color: #f0c14b;
  color: black;
  border-color: #a88734 #9c7e31 #846a29;
  border-radius: 0;
}

#logo {
  width: 150px;
}

@media only screen and (min-width: 992px) {
  #signin-div {
    width: 40%;
  }
}
</style>
