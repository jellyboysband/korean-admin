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
        <th>{{ $t('product.delete') }}?</th>
      </tr>
    </thead>
    <tbody data-qa="products-table">
      <!--  -->
      <tr v-for="product in productList" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.brandName }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.apply }}</td>
        <td>{{ product.price }}</td>
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
  components: {
  },
  props: {
    productList: Array
  },
  methods: {
    handleRowClick(productId) {
      this.$router.push({ name: 'admin__product.info', params: { productId } });
    },
    editProduct(productId) {
      this.productId = productId;
      this.showModal = true;
    },
    updateProductData(id) {
      this.$emit('updateProduct', id);
      this.showModal = false;
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
