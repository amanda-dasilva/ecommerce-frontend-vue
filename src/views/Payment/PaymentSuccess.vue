<template>
  <div class="alert alert-success" role="alert" id="message">
    Payment successful
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});
export default {
    name:'PaymentSuccess',
    props:["baseURL"],
    data() {
    return {
      token: null,
      sessionId:null
    }
  },
  methods:{
    async saveOrder() {
      await api.post(`${this.baseURL}order/add?token=${this.token}&sessionId=${this.sessionId}`)
              .then(()=>{
                //window.location.href = '/order'
                //document.getElementById("message").innerHTML = "order placed";
                this.$router.push({ name: 'OrderHistory'})
                //router.push()
              }).catch((error)=>{
        console.log(error);
      })
    }
  },
  mounted(){
    this.token = localStorage.getItem("token");
    this.sessionId = localStorage.getItem("sessionId");
    this.saveOrder()
  }
}
</script>