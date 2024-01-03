<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link text-light dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Accounts
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <router-link class="dropdown-item" v-if="!isLoggedIn" :to="{ name: 'Signin' }">Log In</router-link>
      <router-link class="dropdown-item" v-if="!isLoggedIn" :to="{ name: 'Signup' }">Sign Up</router-link>
      <a class="dropdown-item" v-if="isLoggedIn" href="#" @click.prevent="signout">Sign Out</a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AccountDropdownComponent',
  props: {
    token: Boolean,
  },
  computed: {
    isLoggedIn() {
      return this.token;
    },
  },
  methods: {
    signout() {
      this.$emit('signout');
    },
  },
};
</script>
