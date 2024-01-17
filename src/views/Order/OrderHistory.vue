<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Your Orders</h4>
      </div>
    </div>
    <!-- for each order display -->
    <div v-for="order in orderList" :key="order.id" class="row mt-2 pt-3 justify-content-around">
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <!-- display image in left -->
        <img :src="order.imageURL" class="w-100 card-img-top embed-responsive-item">
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link :to="'/orders'">Order No: {{ order.id }}</router-link>
          </h6>
          <p class="mb-0">{{ order.totalItems }} item<span v-if="order.totalItems > 1">s</span></p>
          <p id="item-price" class="mb-0 font-weight-bold">Total Cost: $ {{ order.totalCost }}</p>
          <p id="item-total-price">Ordered on: {{ order.orderdate }}</p>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.params = config.params || {};
    config.params.token = token;
  }
  return config;
});

export default {
  data() {
    return {
      orderList: [],
    };
  },
  props: ["baseURL"],
  name: 'OrderHistory',
  methods: {
    async listOrders() {
      try {
        const res = await api.get(`${this.baseURL}order/`);
        if (res.status === 200) {
          this.orderList = res.data.map(order => ({
            id: order.id,
            totalCost: order.totalPrice,
            orderdate: order.createdDate.substring(0, 10),
            imageURL: order.orderItems && order.orderItems.length > 0 && order.orderItems[0].product.imageURL
              ? order.orderItems[0].product.imageURL
              : '',
            totalItems: order.orderItems ? order.orderItems.length : 0,
          }));
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    },
  },
  mounted() {
    this.listOrders();
  },
};
</script>

<style scoped>
h4,
h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}
</style>
