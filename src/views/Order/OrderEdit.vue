<template>
  <div class="flex xs12" v-if="selectOptions.products.length">
    <vuestic-widget :headerText="$t('order.edit')">
      <form
        autocomplete="off"
        @submit.prevent="submitOrder"
        class="va-row flex justify-content-between"
      >
        <fieldset class="flex xs-6" v-if="order">
          <!--  TITLE -->
          <div class="form-group">
            <div class="input-group">
              <input
                :class="'selected'"
                id="Phone"
                type="text"
                v-bind:value="order.phone"
                data-qa="orders-phone"
                disabled
              />
              <label class="control-label" for="phone">{{ $t('order.phone') }}</label>
              <i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                :class="'selected'"
                id="resultCost"
                type="text"
                v-bind:value="fields.resolvedProducts.reduce((acc,curr)=>acc+=curr.count*curr.price,0)"
                data-qa="orders-resultCost"
                disabled
              />
              <label class="control-label" for="phone">{{ $t('order.resultCost') }}</label>
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
                <textarea-autosize
                  id="Product"
                  type="text"
                  v-bind:value="selectOptions.products.find(it=>product.extraId===it.id) ?
                  (selectOptions.products.find(it=>product.extraId===it.id).product.name +'\n'+selectOptions.products.find(it=>product.extraId===it.id).volume + ' мл.'+'\n'+selectOptions.products.find(it=>product.extraId===it.id).weight + ' гр.' ):
                  (products.find(it=>product.extraId===it.id).product.name+'\n'+products.find(it=>product.extraId===it.id).volume + ' мл.'+'\n'+products.find(it=>product.extraId===it.id).weight + ' гр.')"
                  :data-qa="`orders-product${i}`"
                  disabled
                />
                <label class="control-label" for="product">{{ $t('order.product') }}</label>
                <i class="bar"></i>
              </div>
              <div class="input-group">
                <input
                  :id="`price${i}`"
                  type="number"
                  v-model.number="product.price"
                  :data-qa="`orders-price${i}`"
                />
                <label class="control-label" :for="`price${i}`">{{ $t('order.price') }}</label>
                <i class="bar"></i>
              </div>
              <div class="input-group">
                <input
                  :id="`count${i}`"
                  type="number"
                  v-model.number="product.count"
                  :data-qa="`orders-count${i}`"
                />
                <label class="control-label" :for="`count${i}`">{{ $t('order.count') }}</label>
                <i class="bar"></i>
              </div>

              <button
                type="button"
                class="btn btn-danger"
                @click="fields.resolvedProducts.splice(i,1)"
              >X</button>
            </div>
          </div>
          <!-- <div class="form-group">
            <div class="input-group">
              <v-select
                label="product.name"
                :data-label="$t('order.products')"
                :class="'selected'"
                :options="selectOptions.products.filter(it=>!fields.resolvedProducts.map(p=>p.extraId).includes(it.id)) "
                v-model="selectedProduct"
                :clearable="false"
                required
                data-qa="order-status"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addProduct(selectedProduct)"
            >{{$t('orders.addProduct')}}</button>
          </div>
          -->
          <button type="submit" class="btn btn-primary">{{$t('button.submit')}}</button>
        </fieldset>
      </form>
    </vuestic-widget>
  </div>
</template>

<script>
import OrderService from 'services/network/OrderService.js';

import ProductService from 'services/network/ProductService.js';

export default {
  props: ['orderId'],
  computed: {
    isReadyToSubmit() {
      return true;
    }
  },
  mounted() {
    ProductService.getExtraList({}).then(response => {
      this.selectOptions.products = response.list;
      response.list.forEach(it => {
        it.name = `${it.volume} мл. ${it.weight} гр. ${it.price} р. ${it.product.name}`;
      });
    });
    OrderService.getOrderById(this.orderId).then(response => {
      this.order = response;
      this.fields.status = this.selectOptions.statuses.find(
        it => it.value === response.status
      );
      this.products = response.data.map(it => it.product);
      this.fields.resolvedProducts = response.data.map(it => {
        return {
          productId: it.product.id,
          price: it.product.price,
          extraId: it.product.extraId,
          count: it.count
        };
      });
    });
  },
  methods: {
    submitOrder() {
      OrderService.editOrder(this.orderId, {
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
      if (!product) {
        return;
      }
      this.fields.resolvedProducts = [
        ...this.fields.resolvedProducts,
        { productId: product.id, count: 1, price: product.price }
      ];
      this.selectedProduct = null;
    }
  },
  data() {
    return {
      advancedGallery: [],
      fields: {
        status: null,
        resolvedProducts: []
      },
      order: null,
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
