<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping cart</h3>
      </div>
    </div>
    <!--    loop over all the cart items and display one by one-->
    <div v-for="cartItem in cartItems" :key="cartItem.product.id" class="row mt-2 pt-3 justify-content-around">
      <div class="col-2"></div>
      <!-- display image -->
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <router-link :to="{ name: 'ShowDetails', params: { id : cartItem.product.id } }">
          <img v-bind:src="cartItem.product.imageURL" class="w-100 card-img-top embed-responsive-item">
        </router-link>
      </div>
      <!-- display product name, quantity and price -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title"><router-link :to="{ name: 'ShowDetails', params: { id : cartItem.product.id } }">{{cartItem.product.name}} </router-link></h6>
          <p id="item-price" class="mb-0 font-weight-bold">$ {{cartItem.product.price}} per unit</p>
          <p id="item-quantity" class="mb-0">
            Quantity :
            <input size="1" class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0" v-model="cartItem.quantity" /></p>
          <p id="item-total-price" class="mb-0">Total : <span class="font-weight-bold"> $ {{totalcost}}</span></p>
          <br><a href="#" @click="deleteItem(cartItem.id)">Remove From Cart</a>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr></div>
    </div>

    <!-- display total price -->
    <div class="total-cost pt-2 text-right">
      <h5>Total : $ {{totalcost}}</h5>
      <button :disabled="isDisabled()" type="button" class="btn btn-secondary confirm" @click="checkout">Confirm Order</button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});
export default {
  data() {
    return {
      cartItems: [],
      token: null,
    }
  },
  computed: {
  totalcost() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
},
  name: 'CartView',
  props: ["baseURL"],
  methods: {
     isDisabled(){
       if(this.cartItems.length === 0){
         return true;
       }
       return false;
     },
    // fetch all the items in cart
    async listCartItems(){
      await api.get(`${this.baseURL}cart/?token=${this.token}`).then((response) => {
        if(response.status==200){
          const result = response.data;
          // store cartitems and total price in two variables
          this.cartItems = result.cartItems;
          // this.totalcost = result.totalCost
        }
      },
      (error)=>{
        console.log(error)
      });
    },
    // go to checkout page
    checkout(){
      this.$router.push({ name: 'Checkout'})
    },
    //delete the cart item
    async deleteItem(itemId) {
       // 2. first delete the item by calling delete api
      await api.delete(`${this.baseURL}cart/delete/${itemId}?token=${this.token}`)
        .then((response)=>{
          if(response.status == 200){
            // 3. refresh the data by calling listCartItems
            this.listCartItems();
          }
        },(error)=>{
          console.log(error)
        })
    }
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.listCartItems();
  },
};

</script>

<style scoped>
h4, h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

#item-price {
  color: #232F3E;
}

#item-quantity{
  float: left;
}

#item-total-price {
  float: right;
}

.confirm {
  font-weight: bold;
  font-size: larger;
}

</style>