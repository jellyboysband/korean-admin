<template>
  <table class="table table-striped first-td-padding table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('order.status') }}</th>
        <th>{{ $t('order.phone') }}</th>
        <th>{{ $t('order.cost') }}</th>
        <th>{{ $t('order.createdAt') }}</th>
        <th>{{ $t('order.reject') }}?</th>
        <th>{{ $t('order.resolve') }}?</th>
      </tr>
    </thead>
    <tbody data-qa="orders-table">
      <!--  -->
      <tr
        v-for="order in orderList"
        :key="order.id"
        class="clickable"
        @click="handleRowClick(order.id)"
      >
        <td>{{ order.id }}</td>
        <td>{{ $t(`order.${order.status}`)}}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.cost }}</td>
        <td>
          {{ new Date(order.createdAt).toLocaleString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
          })}}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            @click.stop="$emit('reject', order.id)"
            :disabled="order.status==='WAITING'"
          >{{$t('order.reject')}}</button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-success"
            @click.stop="$emit('resolve', order.id)"
            :disabled="order.status==='WAITING'"
          >{{$t('order.resolve')}}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
  props: {
    orderList: Array
  },
  methods: {
    editOrder(orderId) {
      this.orderId = orderId;
      this.showModal = true;
    },
    updateOrderData(id) {
      this.$emit('updateOrder', id);
      this.showModal = false;
    },
    handleRowClick(id) {
      this.$router.push({
        name: 'admin__order.edit',
        params: { orderId: id }
      });
    }
  },
  data() {
    return {
      orderId: null
    };
  }
};
</script>
<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
