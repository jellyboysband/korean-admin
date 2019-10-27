<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('order.orders')">
        <template v-order:header-content>
          <router-link
            :to="{name:'admin__order.create'}"
            class="btn btn-micro btn-primary"
            :data-qa="`widgetButton-Create`"
          >{{$t('create')}}</router-link>
        </template>
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
    OrderList,
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
        // hallId: this.hallId || null,
        // vgm: null,
        // limit: null,
        // offset: null,
        // title: null,
        // order: '-id',
        // deleted: false
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
