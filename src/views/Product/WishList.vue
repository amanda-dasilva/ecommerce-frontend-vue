<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Your WishList</h4>
      </div>
    </div>

    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ProductBox :product="product"> </ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '../../components/Product/ProductBox';
const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});
export default {
  data() {
    return {
      products: null,
      token: null,
    };
  },
  name: 'WhishListView',
  components: { ProductBox },
  props: ['baseURL'],
  methods: {
    async fetchWishlist() {
      // fetch products
      try {
        await api
        .get(`${this.baseURL}wishlist/${this.token}`)
        .then((data) => (this.products = data.data))
      } catch (error) {
        console.error(error);
        // Handle error gracefully, show a user-friendly message, etc.
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchWishlist();
  },
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
