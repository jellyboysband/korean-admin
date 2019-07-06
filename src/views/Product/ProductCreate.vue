<template>
  <div class="flex xs12">
    <vuestic-widget :headerText="$t('product.create')">
      <form
        autocomplete="off"
        @submit.prevent="submitProduct"
        class="va-row flex justify-content-between"
      >
        <fieldset class="flex xs-6">
          <!--  TITLE -->
          <div class="form-group">
            <div class="input-group">
              <input
                id="productName"
                type="text"
                v-model="fields.name"
                required
                data-qa="products-name"
              />
              <label class="control-label" for="productName">{{ $t('product.name') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                id="productDescription"
                type="text"
                v-model="fields.description"
                required
                data-qa="products-description"
              />
              <label class="control-label" for="productDescription">{{ $t('product.description') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                id="productApply"
                type="text"
                v-model="fields.apply"
                required
                data-qa="products-apply"
              />
              <label class="control-label" for="productApply">{{ $t('product.apply') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                id="productPrice"
                type="number"
                v-model.number="fields.price"
                required
                data-qa="products-price"
              />
              <label class="control-label" for="productPrice">{{ $t('product.price') }}</label>
              <i class="bar"></i>
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <v-select
                v-if="selectOptions.brands"
                label="name"
                :data-label=" $t('product.brand')"
                :class="fields.brand ? 'selected' : ''"
                :options="selectOptions.brands"
                v-model="fields.brand"
                :clearable="false"
                required
                data-qa="product-brand"
              />
              <p v-else>{{ $t('product.empty') }}</p>
            </div>
          </div>
        </fieldset>

        <div class="flex xs6">
          <div class="form-group">
            <div class="input-group">
              <vuestic-file-upload
                id="image"
                type="image"
                :file-types="'.png, .jpg, .jpeg'"
                dropzone
                v-model="advancedGallery"
              />
              <label class="control-label black-label" for="image">{{ $t('product.image') }}</label>
              <i class="bar"></i>
            </div>
          </div>
        </div>
        <div class="flex xs12">
          <button
            class="btn btn-primary"
            :disabled="!isReadyToSubmit"
            type="submit"
          >{{ $t('submit') }}</button>
        </div>
      </form>
    </vuestic-widget>
  </div>
</template>

<script>
import ProductService from 'services/network/ProductService.js';

import BrandService from 'services/network/BrandService.js';

export default {
  computed: {
    isReadyToSubmit() {
      const uuuu = Object.keys(this.fields).find(
        key => this.fields[key] === null
      );
      return !uuuu;
    }
  },
  mounted() {
    BrandService.getBrandList().then(response => {
      this.selectOptions.brands = response;
    });
  },
  methods: {
    submitProduct() {
      ProductService.createProduct({
        name: this.fields.name,
        description: this.fields.description,
        apply: this.fields.apply,
        price: this.fields.price,
        brandID: this.fields.brand.id,

        photo: this.advancedGallery.length ? this.advancedGallery[this.advancedGallery.length - 1] : null,
      }).then(response => {
        this.$toasted.global.global_success({
          message: 'Product was created!'
        });
        this.$router.push({ name: 'admin__products' });
      });
    }
  },
  data() {
    return {
      advancedGallery: [],
      fields: {
        name: null,
        description: null,
        apply: null,
        price: null,
        brand: null,
      },
      selectOptions: {
        brands: null
      }
    };
  }
};
</script>

<style>
</style>
