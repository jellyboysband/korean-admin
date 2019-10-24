<template>
  <div class="row justify-content-center" v-if="brandList.length">
    <brand-table :brandList="brandList" @deleteOrRestore="deleteOrRestore"></brand-table>
    <vuestic-modal ref="largeModal" :large="true" @ok="ok" @cancel="cancel">
      <p>{{ $t('brand.confirm') }} {{ brand.name }}?</p>
    </vuestic-modal>
  </div>
  <div v-else>
    <p>{{ $t('brand.empty') }}</p>
  </div>
</template>

<script>
import BrandTable from 'components/brands/BrandTable';
import BrandService from 'services/network/BrandService';

export default {
  components: {
    BrandTable
  },
  props: {
    filter: Object
  },
  mounted() {
    this.getBrands();
  },
  methods: {
    getBrands() {
      BrandService.getBrandList().then(response => {
        this.brandList = response.list;
      });
    },

    deleteOrRestore(brand) {
      console.log('TCL: deleteOrRestore -> brand', brand);
      this.brand = brand;
      this.$refs.largeModal.open();
    },
    ok() {
      BrandService.deleteBrand(this.brand.id).then(response => {
        this.getBrands();
        this.$toasted.global.global_success({
          message: 'Brand was deleted!'
        });
        this.brand = {};
      });
    },
    cancel() {
      this.brand = {};
    }
  },
  data() {
    return {
      brandList: [],
      brand: {}
    };
  }
};
</script>

<style></style>
