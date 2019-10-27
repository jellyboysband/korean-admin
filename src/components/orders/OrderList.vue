<template>
  <div class="row justify-content-center" v-if="orderList.length">
    <order-table :orderList="orderList" @reject="reject" @resolve="resolve"></order-table>
  </div>
  <div v-else>
    <p>There is no orders!</p>
  </div>
</template>

<script>
import OrderTable from 'components/orders/OrderTable';
import OrderService from 'services/network/OrderService';

export default {
  components: {
    OrderTable
  },
  props: {
    filter: Object
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      OrderService.getOrderList({}).then(response => {
        this.orderList = response.list;
      });
    },
    reject(id) {
      OrderService.setStatus(id, 'REJECTED').then(() => {
        this.getOrders();
      });
    },
    resolve(id) {
      OrderService.setStatus(id, 'RESOLVED').then(() => {
        this.getOrders();
      });
    }
  },
  data() {
    return {
      orderList: [],
      order: {}
    };
  }
};
</script>

<style></style>
