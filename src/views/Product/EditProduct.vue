<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Edit Product</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label for="categoryName">Category</label>
            <select class="form-control" v-model="categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">{{category.categoryName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="productName">Name</label>
            <input type="text" class="form-control" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" v-model="description" required>
          </div>
          <div class="form-group">
            <label for="imageURL">ImageURL</label>
            <input type="url" class="form-control" v-model="imageURL" required>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" class="form-control" v-model="price" required>
          </div>
          <button type="button" class="btn btn-secondary" @click="editProduct">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});
export default {
  data(){
    return {
      id : null,
      categoryId : 0,
      name : null,
      description : null,
      imageURL : null,
      price : 0,
      productIndex : null
    }
  },
  props : ["baseURL", "products", "categories"],
  methods : {
    async editProduct() {
      const updatedProduct = {
        id : this.id,
        categoryId : this.categoryId,
        name : this.name,
        description : this.description,
        imageURL : this.imageURL,
        price : this.price,
      }
      try {
        await api.post(`${this.baseURL}product/update/${this.id}`, JSON.stringify(updatedProduct))
        .then(() => {
          //sending the event to parent to handle
          this.$emit("fetchData");
          this.$router.push({name : 'AdminProduct'})},
        swal({
          text: "Product Updated Successfully!",
          icon: "success",
          closeOnClickOutside: false,
        }));
        // Clear input fields after successful submission
        this.categoryId = null;
        this.name = null;
        this.description = null;
        this.imageURL = null;
        this.price = null;
      } catch (error) {
        console.error(error);
        // Handle error gracefully, show a user-friendly message, etc.
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.productIndex = this.products.findIndex(product => product.id == this.id);
    //input fields
    this.categoryId = this.products[this.productIndex].categoryId;
    this.name = this.products[this.productIndex].name;
    this.description = this.products[this.productIndex].description;
    this.imageURL = this.products[this.productIndex].imageURL;
    this.price = this.products[this.productIndex].price;
  }
}
</script>

<style scoped>
h3 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

</style>