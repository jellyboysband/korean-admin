<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('brand.create')">
        <form autocomplete="off" @submit.prevent="submitBrand">
          <div class="va-row flex-wrap justify-content-between">
            <div class="flex xs5">
              <fieldset>
                <!--  TITLE -->
                <div class="form-group">
                  <div class="input-group">
                    <input
                      id="brandName"
                      type="text"
                      v-model="fields.name"
                      required
                      data-qa="brands-name"
                    />
                    <label class="control-label" for="brandName">{{ $t('brand.name') }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <button
            class="btn btn-primary"
            :disabled="!isReadyToSubmit"
            type="submit"
          >{{ $t('submit') }}</button>
        </form>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import BrandService from 'services/network/BrandService.js';

export default {
  computed: {
    isReadyToSubmit() {
      return !Object.keys(this.fields).find(
        key => this.fields[key] === null || this.fields[key] === ''
      );
    }
  },
  mounted() {

  },
  methods: {
    submitBrand() {
      BrandService.createBrand({
        name: this.fields.name,
      }).then(response => {
        this.$toasted.global.global_success({
          message: 'Brand was created!'
        });
        this.$router.push({ name: 'admin__brands' });
      });
    }
  },
  data() {
    return {
      fields: {
        name: null,
      },
    };
  }
};
</script>

<style>
</style>
