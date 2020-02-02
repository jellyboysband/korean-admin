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
              <textarea-autosize
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
              <textarea-autosize
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
              <textarea-autosize
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
              <v-select
                label="name"
                :data-label=" $t('product.brand')"
                :class="fields.brand ? 'selected' : ''"
                :options="selectOptions.brands"
                v-model="fields.brand"
                :clearable="false"
                required
                data-qa="product-brand"
                :taggable="true"
                @option:created="createBrand"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <v-select
                label="name"
                :data-label=" $t('product.category')"
                :class="fields.categories.length ? 'selected' : ''"
                :options="selectOptions.categories"
                v-model="fields.categories"
                :clearable="false"
                required
                data-qa="product-categories"
                taggable
                multiple
                @option:created="createCategory"
              />
            </div>
          </div>

          <div class="form-group" v-for="(extra,i) of fields.extras" :key="i">
            <div class="input-group">
              <input
                :id="`product-price${i}`"
                type="number"
                v-model.number="extra.price"
                required
                :data-qa="`products-price${i}`"
              />
              <label class="control-label" :for="`product-price${i}`">{{ $t('product.price') }}</label>
              <i class="bar"></i>
            </div>

            <div class="input-group">
              <input
                :id="`product-volume${i}`"
                type="number"
                v-model.number="extra.volume"
                required
                :data-qa="`products-volume${i}`"
              />
              <label class="control-label" :for="`product-volume${i}`">{{ $t('product.volume') }}</label>
              <i class="bar"></i>
            </div>
            <div class="input-group">
              <input
                :id="`product-weight${i}`"
                type="number"
                v-model.number="extra.weight"
                required
                :data-qa="`products-weight${i}`"
              />
              <label class="control-label" :for="`product-weight${i}`">{{ $t('product.weight') }}</label>
              <i class="bar"></i>
            </div>

            <div class="input-group">
              <vuestic-file-upload
                id="image"
                type="image"
                :file-types="'.png, .jpg, .jpeg'"
                dropzone
                v-model="extra.photo"
              />
              <label class="control-label black-label" for="image">{{ $t('product.image') }}</label>
              <i class="bar"></i>
            </div>
            <div class="input-group">
              <button
                class="btn btn-danger"
                :disabled="fields.extras.length<=1"
                type="button"
                @click="fields.extras.splice(i,1)"
              >{{ $t('button.deleteOption') }}</button>
            </div>
          </div>
          <div class="input-group">
            <button
              class="btn btn-primary"
              type="button"
              @click="fields.extras.push({price:0,weight:0,volume:0,photo:[]})"
            >{{ $t('button.addOption') }}</button>
          </div>
        </fieldset>

        <div class="flex xs6"></div>
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
import CategoryService from 'services/network/CategoryService.js';

export default {
  computed: {
    isReadyToSubmit() {
      const notReady = Object.keys(this.fields).find(
        key => this.fields[key] === null
      );
      return !notReady;
    }
  },
  mounted() {
    BrandService.getBrandList().then(response => {
      this.selectOptions.brands = response.list;
    });
    CategoryService.getCategoryList().then(response => {
      this.selectOptions.categories = response.list;
    });
  },
  methods: {
    createBrand(e) {
      const name = typeof e === 'string' ? e : e.name;
      BrandService.createBrand({ name }).then(brand => {
        BrandService.getBrandList().then(response => {
          this.selectOptions.brands = response.list;
          this.fields.brand = this.selectOptions.brands.find(
            it => it.id === brand.id
          );
        });
      });
    },
    createCategory(e) {
      const name = typeof e === 'string' ? e : e.name;
      CategoryService.createCategory({ name }).then(category => {
        CategoryService.getCategoryList().then(response => {
          this.selectOptions.categories = response.list;
          this.fields.categories = [
            ...this.fields.categories.slice(0, -1),
            this.selectOptions.categories.find(it => it.id === category.id)
          ];
        });
      });
    },
    submitProduct() {
      ProductService.createProduct({
        name: this.fields.name,
        description: this.fields.description,
        apply: this.fields.apply,
        extras: this.fields.extras,
        brandId: this.fields.brand.id,

        categories: this.fields.categories.map(it => it.id)
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
      fields: {
        name: null,
        description: null,
        apply: null,
        brand: null,
        categories: [],
        extras: [{ price: 0, weight: 0, volume: 0, photo: [] }]
      },
      selectOptions: {
        brands: [],
        categories: []
      }
    };
  }
};
</script>

<style>
</style>
