<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Logo -->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" :src="require('@/assets/logo.png')" />
    </router-link>

    <!-- Burger Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            :class="{ 'form-control': true, disabled: !token }"
            size="100"
            type="text"
            class="form-control"
            placeholder="Search Items"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="searchQuery"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>

      <!-- Admin Dropdown -->
      <AdminDropdown />
      
      <!-- Account Dropdown -->
      <AccountDropdown :token="loggedIn" @signout="signout" />
    </div>
  </nav>
</template>

<script>
import swal from 'sweetalert';
import AdminDropdown from './AdminDropdownComponent.vue';
import AccountDropdown from './AccountDropdownComponent.vue';
export default {
  name: 'NavbarComponent',
  data() {
    return {
      token: null,
      searchQuery: '',
      loggedIn: false,
    };
  },
  methods: {
    signout() {
      // delete the token from local storage
      localStorage.removeItem('token');
      this.loggedIn = false;
      //delete session ID
      localStorage.removeItem('sessionId');
      //redirect to home page
      this.$router.push({ name: 'Home' });
      //show a sweet alert
      swal({
        text: 'Logged you out. Visit Again',
        icon: 'success',
        closeOnClickOutside: false,
      });
    },
  },
  mounted() {
    this.loggedIn = localStorage.getItem('token')!== null;
  },
  components: {
    AdminDropdown,
    AccountDropdown,
  },
};
</script>

<style scoped>
#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-link {
  color: rgba(255, 255, 255);
}

#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
</style>
