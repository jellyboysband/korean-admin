<template>
  <div class="row justify-content-center" v-if="filteredProducts.length">
    <table class="table table-striped first-td-padding table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('product.name') }}</th>
          <th>{{ $t('product.brand') }}</th>
          <th>{{ $t('product.description') }}</th>
          <th>{{ $t('product.apply') }}</th>
          <th>{{ $t('product.price') }}</th>
          <th>{{ $t('product.categories') }}</th>
          <th>{{ $t('product.delete') }}?</th>
        </tr>
      </thead>
      <tbody data-qa="products-table">
        <!--  -->
        <tr
          v-for="product in filteredProducts"
          :key="product.id"
          class="clickable"
          @click="handleRowClick(product.id)"
        >
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.apply }}</td>
          <td>{{ product.priceRange }}</td>
          <td>{{ product.categories.map(it=>it.name).join('; ') }}</td>
          <!-- <td>{{ product.url }}</td> -->
          <td>
            <span
              aria-hidden="true"
              class="entypo maki-trash trash"
              style="color: #e34a4a"
              @click.stop="deleteOrRestore(product)"
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
    <vuestic-modal ref="largeModal" :large="true" @ok="ok" @cancel="cancel">
      <p>Are you sure you want to remove product {{ product.name }}?</p>
    </vuestic-modal>
  </div>
  <div v-else>
    <p>There is no products!</p>
  </div>
</template>

<script>
import ProductService from 'services/network/ProductService';

export default {
  components: {},
  props: {
    filter: Object
  },

  computed: {
    filteredProducts() {
      return this.productList.filter(product => {
        const good = true;
        if (this.filter.brand.length) {
          if (!this.filter.brand.includes(product.brand.id)) {
            return false;
          }
        }
        if (this.filter.categories.length) {
          if (
            !product.categories.some(it =>
              this.filter.categories.includes(it.id)
            )
          ) {
            return false;
          }
        }
        if (this.filter.name) {
          if (
            product.name
              .toLowerCase()
              .search(this.filter.name.toLowerCase()) === -1
          ) {
            return false;
          }
        }
        return good;
      });
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    handleRowClick(id) {
      this.$router.push({
        name: 'admin__product.edit',
        params: { productId: id }
      });
    },
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

<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
