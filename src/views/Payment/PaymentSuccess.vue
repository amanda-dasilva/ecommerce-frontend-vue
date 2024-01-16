<template>
  <div class="alert alert-danger" role="alert">Payment successful</div>
</template>

<script lang="ts">
export default {
  name: 'PaymentSuccess',
  props: ['baseURL'],
  data() {
    return {
      token: null,
      sessionId: null,
    };
  },
  methods: {},
  mounted() {},
};
</script>
