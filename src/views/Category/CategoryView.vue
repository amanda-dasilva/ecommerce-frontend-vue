<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Our Categories</h3>
          <router-link id="add-category" :to="{ name: 'AddCategory' }" v-show="$route.name === 'AdminCategory'">
            <button type="button" class="btn btn-secondary">Add a new Category</button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div v-for="category of categories" :key="category.id" class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
          <CategoryBox :category="category"></CategoryBox>
        </div>
      </div>
    </div>
  </template>

<script>
// import axios from 'axios';
import CategoryBox from '../../components/Category/CategoryBox';

export default {
  name: 'CategoryView',
  components: { CategoryBox },
  props: ["categories"],
};
</script>

<style scoped>
  h3 {
      font-family: 'Roboto', sans-serif;
      color: #484848;
      font-weight: 700;
  }

  #add-category {
      float: right;
      font-weight: 500;
  }
</style>