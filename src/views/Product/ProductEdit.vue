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

          <div class="form-group" v-if="selectOptions.brands.length">
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
          <div class="form-group" v-if="selectOptions.tags.length">
            <div class="input-group">
              <v-select
                label="name"
                :data-label=" $t('product.tag')"
                :class="fields.tags.length ? 'selected' : ''"
                :options="selectOptions.tags"
                v-model="fields.tags"
                :clearable="false"
                required
                data-qa="product-tags"
                taggable
                multiple
                @option:created="createTag"
              />
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
              <label class="control-label black-label" for="image">{{ $t('product.newImage') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="flex xs6">
            <img :src="fields.avatarUrl" />
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
import TagService from 'services/network/TagService.js';

export default {
  props: ['productId'],
  computed: {
    isReadyToSubmit() {
      const uuuu = Object.keys(this.fields).find(
        key => this.fields[key] === null
      );
      return !uuuu;
    }
  },
  mounted() {
    Promise.all([
      BrandService.getBrandList().then(response => {
        this.selectOptions.brands = response.list;
      }),
      TagService.getTagList().then(response => {
        this.selectOptions.tags = response.list;
      })
    ]).then(_ => {
      ProductService.getProductById(this.productId).then(response => {
        this.fields.name = response.name;
        this.fields.description = response.description;
        this.fields.apply = response.apply;
        this.fields.price = response.price;
        this.fields.brand = response.brand;
        this.fields.tags = response.tags;
        this.fields.avatarUrl = response.avatarUrl;
      });
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
    createTag(e) {
      const name = typeof e === 'string' ? e : e.name;
      TagService.createTag({ name }).then(tag => {
        TagService.getTagList().then(response => {
          this.selectOptions.tags = response.list;
          this.fields.tags = [
            ...this.fields.tags.slice(0, -1),
            this.selectOptions.tags.find(it => it.id === tag.id)
          ];
        });
      });
    },
    submitProduct() {
      ProductService.createProduct({
        name: this.fields.name,
        description: this.fields.description,
        apply: this.fields.apply,
        price: this.fields.price,
        brandId: this.fields.brand.id,

        photo: this.advancedGallery.length
          ? this.advancedGallery[this.advancedGallery.length - 1]
          : null,
        tags: this.fields.tags.map(it => it.id)
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
        tags: [],
        avatarUrl: null
      },
      selectOptions: {
        brands: [],
        tags: []
      }
    };
  }
};
</script>

<style>
</style>
