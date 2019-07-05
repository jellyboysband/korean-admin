<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('product.create')">
        <form autocomplete="off" @submit.prevent="submitProduct">
          <div class="va-row flex-wrap justify-content-between">
            <div class="flex xs5">
              <fieldset>
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
                    <label class="control-label" for="productName">Name</label>
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
                    <label class="control-label" for="productDescription">Description</label>
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
                    <label class="control-label" for="productApply">Apply</label>
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
                    <label class="control-label" for="productPrice">Price</label>
                    <i class="bar"></i>
                  </div>
                </div>

                <div class="form-group">
                  <div class="input-group">
                    <v-select
                      v-if="selectOptions.brands"
                      label="name"
                      :data-label="'brand'"
                      :class="fields.brand ? 'selected' : ''"
                      :options="selectOptions.brands"
                      v-model="fields.brand"
                      :clearable="false"
                      required
                      data-qa="product-brand"
                    />
                    <p v-else>!!There is no product!!</p>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <button class="btn btn-primary" :disabled="!isReadyToSubmit" type="submit">Submit</button>
        </form>
      </vuestic-widget>
    </div>
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
      console.log('TCL: isReadyToSubmit -> uuuu', uuuu);
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
