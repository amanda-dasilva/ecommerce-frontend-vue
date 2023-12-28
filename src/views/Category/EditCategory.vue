<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Edit Category</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label for="categoryName">Category Name</label>
            <input type="text" id="categoryName" class="form-control" v-model="categoryName" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" id="description" class="form-control" v-model="description" required>
          </div>
          <div class="form-group">
            <label for="imageURL">Image URL</label>
            <input type="url" id="imageURL" class="form-control" v-model="imageUrl" required>
          </div>
          <button type="button" class="btn btn-secondary" @click="editCategory">Submit</button>
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
  data() {
    return {
      id: null,
      categoryName: null,
      description: null,
      imageUrl: null,
      categoryIndex : null,
    };
  },
  props: ["baseURL", "categories"],
  methods: {
    async editCategory() {
      const updatedCategory = {
        id: this.id,
        categoryName: this.categoryName,
        description: this.description,
        imageUrl: this.imageUrl,
      };
      try {
        await api.post(`${this.baseURL}category/update/${this.id}`, JSON.stringify(updatedCategory))
        .then(() => {
          //sending the event to parent to handle
          this.$emit("fetchData");
          this.$router.push({name : 'AdminCategory'})},
        swal({
          text: "Category Updated Successfully!",
          icon: "success",
          closeOnClickOutside: false,
        }));
        // Clear input fields after successful submission
        this.categoryName = null;
        this.description = null;
        this.imageUrl = null;
      } catch (error) {
        console.error(error);
        // Handle error gracefully, show a user-friendly message, etc.
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.categoryIndex = this.categories.findIndex(category => category.id == this.id);
    this.categoryName = this.categories[this.categoryIndex].categoryName;
    this.description = this.categories[this.categoryIndex].description;
    this.imageUrl = this.categories[this.categoryIndex].imageUrl;
  },
};
</script>

<style scoped>
h3 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
