<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link text-light dropdown-toggle"
      href="#"
      id="navbarDropdownAdmin"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Admin
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownAdmin">
      <router-link class="dropdown-item" :to="{ name: 'AdminCategory' }">Category</router-link>
      <router-link class="dropdown-item" :to="{ name: 'AdminProduct' }">Products</router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AdminDropdownComponent',
};
</script>
