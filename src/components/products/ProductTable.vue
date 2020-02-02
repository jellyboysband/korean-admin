<template>
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
        v-for="product in productList"
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
            @click.stop="$emit('deleteOrRestore', product)"
          ></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
  props: {
    productList: Array
  },
  methods: {
    editProduct(productId) {
      this.productId = productId;
      this.showModal = true;
    },
    updateProductData(id) {
      this.$emit('updateProduct', id);
      this.showModal = false;
    },
    handleRowClick(id) {
      this.$router.push({
        name: 'admin__product.edit',
        params: { productId: id }
      });
    }
  },
  data() {
    return {
      productId: null
    };
  }
};
</script>
<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
