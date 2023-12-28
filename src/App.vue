<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div style="min-height: 60vh">
      <router-view v-if="products && categories"
         :baseURL="baseURL"
         :products="products"
         :categories="categories"
         @fetchData="fetchData">
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>

import axios from 'axios';
import Navbar from "./components/NavbarComponent.vue"
import Footer from "./components/FooterComponent.vue"

export default {
  data() {
    return {
      baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:8080/",
      products: null,
      categories: null,
    };
  },

  components : { Navbar, Footer},
  methods : {
    // fetch products
    async fetchProducts() {
      try {
        const res = await axios.get(this.baseURL + 'product/');
        this.products = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    //fetch categories
    async fetchCategories() {
      try {
        const res = await axios.get(this.baseURL + 'category/');
        this.categories = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchData() {
      await this.fetchProducts();
      await this.fetchCategories();
    },
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>