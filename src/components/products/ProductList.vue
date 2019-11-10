<template>
  <div class="row justify-content-center" v-if="productList.length">
    <product-table :productList="productList" @deleteOrRestore="deleteOrRestore"></product-table>
    <vuestic-modal ref="largeModal" :large="true" @ok="ok" @cancel="cancel">
      <p>Are you sure you want to remove product {{ product.name }}?</p>
    </vuestic-modal>
  </div>
  <div v-else>
    <p>There is no products!</p>
  </div>
</template>

<script>
import ProductTable from 'components/products/ProductTable';
import ProductService from 'services/network/ProductService';

export default {
  components: {
    ProductTable
  },
  props: {
    filter: Object
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      ProductService.getProductList({}).then(response => {
        this.productList = response.list;
        response.list.forEach(element => {
          let priceMin = element.extras.length ? element.extras[0].price : null;
          let priceMax = element.extras.length ? element.extras[0].price : null;
          for (const product of element.extras) {
            if (product.price < priceMin) {
              priceMin = product.price;
            }
            if (product.price > priceMax) {
              priceMax = product.price;
            }
          }
          if (priceMin !== null && priceMax !== null) {
            if (priceMin !== priceMax) {
              element.priceRange = `${priceMin}-${priceMax}`;
            } else {
              element.priceRange = `${priceMin}`;
            }
          } else {
            if (priceMax !== null) {
              element.priceRange = `${priceMax}`;
            } else if (priceMin !== null) {
              element.priceRange = `${priceMin}`;
            }
          }
        });
      });
    },

    deleteOrRestore(product) {
      this.product = product;
      this.$refs.largeModal.open();
    },
    ok() {
      ProductService.deleteProduct(this.product.id).then(response => {
        this.getProducts();
        this.$toasted.global.global_success({
          message: 'Product was deleted!'
        });
        this.product = {};
      });
    },
    cancel() {
      this.product = {};
    }
  },
  data() {
    return {
      productList: [],
      product: {}
    };
  }
};
</script>

<style></style>
