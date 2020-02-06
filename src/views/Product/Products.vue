<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('product.products')">
        <template v-product:header-content>
          <router-link
            :to="{name:'admin__product.create'}"
            class="btn btn-micro btn-primary"
            :data-qa="`widgetButton-Create`"
          >{{$t('create')}}</router-link>
        </template>
        <product-filters :startFilter="this.filter" @handleFilterChange="handleFilterChange"></product-filters>
        <product-list :filter="this.filter"></product-list>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import ProductList from 'components/products/ProductList';
import ProductFilters from 'components/products/ProductFilter';

export default {
  props: [],
  components: {
    ProductList,
    ProductFilters
  },
  methods: {
    handleFilterChange(filter) {
      this.filter = JSON.parse(JSON.stringify(filter));
    }
  },
  data() {
    return {
      filter: {
        name: '',
        categories: [],
        brand: []
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
