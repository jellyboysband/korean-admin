<template>
  <div class="flex xs12">
    <vuestic-widget :headerText="$t('order.create')">
      <form
        autocomplete="off"
        @submit.prevent="submitOrder"
        class="va-row flex justify-content-between"
      >
        <fieldset class="flex xs-6">
          <!--  TITLE -->
          <div class="form-group">
            <div class="input-group">
              <input id="Phone" type="text" v-bind:value="order.phone" data-qa="orders-phone" />
              <label class="control-label" for="phone">{{ $t('order.phone') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <v-select
                label="text"
                :data-label="$t('order.status')"
                :class="'selected'"
                :options="selectOptions.statuses"
                v-model="fields.status"
                :clearable="false"
                required
                data-qa="order-status"
              />
            </div>
          </div>
          <div v-for="(product,i) of fields.resolvedProducts" :key="i">
            <div class="form-group">
              <div class="input-group">
                <input id="Phone" type="text" v-bind:value="order.phone" data-qa="orders-phone" />
                <label class="control-label" for="phone">{{ $t('order.phone') }}</label>
                <i class="bar"></i>
              </div>
              <div class="input-group">
                <input id="Phone" type="text" v-bind:value="order.phone" data-qa="orders-phone" />
                <label class="control-label" for="phone">{{ $t('order.phone') }}</label>
                <i class="bar"></i>
              </div>
              <div class="input-group">
                <input id="Phone" type="text" v-bind:value="order.phone" data-qa="orders-phone" />
                <label class="control-label" for="phone">{{ $t('order.phone') }}</label>
                <i class="bar"></i>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="input-group">
              <input
                id="orderApply"
                type="text"
                v-model="fields.apply"
                required
                data-qa="orders-apply"
              />
              <label class="control-label" for="orderApply">{{ $t('order.apply') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                id="orderPrice"
                type="number"
                v-model.number="fields.price"
                required
                data-qa="orders-price"
              />
              <label class="control-label" for="orderPrice">{{ $t('order.price') }}</label>
              <i class="bar"></i>
            </div>
          </div>

          <div class="form-group" v-if="selectOptions.brands.length">
            <div class="input-group">
              <v-select
                label="name"
                :data-label=" $t('order.brand')"
                :class="fields.brand ? 'selected' : ''"
                :options="selectOptions.brands"
                v-model="fields.brand"
                :clearable="false"
                required
                data-qa="order-brand"
                :taggable="true"
                @option:created="createBrand"
              />
            </div>
          </div>
          <div class="form-group" v-if="selectOptions.tags.length">
            <div class="input-group">
              <v-select
                label="name"
                :data-label=" $t('order.tag')"
                :class="fields.tags.length ? 'selected' : ''"
                :options="selectOptions.tags"
                v-model="fields.tags"
                :clearable="false"
                required
                data-qa="order-tags"
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
              <label class="control-label black-label" for="image">{{ $t('order.image') }}</label>
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
import OrderService from 'services/network/OrderService.js';

import ProductService from 'services/network/ProductService.js';

export default {
  computed: {
    isReadyToSubmit() {
      return true;
    }
  },
  mounted() {
    ProductService.getBrandList().then(response => {
      this.selectOptions.products = response.list;
    });
    OrderService.getById(this.orderId).then(response => {
      this.order = response;
      this.fields.status = this.selectOptions.statuses.find(
        it => it.value === response.status
      );
      this.fields.resolvedProducts = response.data.map(it => {
        return {
          productId: it.product.id,
          price: it.product.price,
          count: it.count
        };
      });
    });
  },
  methods: {
    submitOrder() {
      OrderService.createOrder({
        status: this.fields.status.value,
        resolvedProducts: this.fields.resolvedProducts
      }).then(response => {
        this.$toasted.global.global_success({
          message: 'Order was created!'
        });
        this.$router.push({ name: 'admin__orders' });
      });
    },
    addProduct(product) {
      this.fields.resolvedProducts = [
        ...this.fields.resolvedProducts,
        { productId: product.id, count: 1, price: product.price }
      ];
    }
  },
  data() {
    return {
      advancedGallery: [],
      fields: {
        status: null,
        resolvedProducts: []
      },
      products: [],
      selectedProduct: [],
      selectOptions: {
        products: [],
        statuses: [
          { value: 'WAITING', text: this.$t('order.WAITING') },
          { value: 'PROGRESS', text: this.$t('order.PROGRESS') },
          { value: 'RESOLVED', text: this.$t('order.RESOLVED') },
          { value: 'REJECTED', text: this.$t('order.REJECTED') }
        ]
      }
    };
  }
};
</script>

<style>
</style>
