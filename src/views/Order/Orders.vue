<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('order.orders')">
        <template v-order:header-content></template>
        <!-- <order-filters :startFilter="this.filter" @change="handleFilterChange"></order-filters> -->
        <order-list :filter="this.filter"></order-list>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import OrderList from 'components/orders/OrderList';
// import OrderFilters from 'components/orders/OrderFilters';

export default {
  props: [],
  components: {
    OrderList
    // OrderFilters
  },
  methods: {
    handleFilterChange(filter) {
      this.filter = filter;
    }
  },
  data() {
    return {
      filter: {
        order: '-createdAt'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
