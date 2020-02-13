<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('category.create')">
        <form autocomplete="off" @submit.prevent="submitCategory">
          <div class="va-row flex-wrap justify-content-between">
            <div class="flex xs6">
              <fieldset>
                <!--  TITLE -->
                <div class="form-group">
                  <div class="input-group">
                    <input
                      id="categoryName"
                      type="text"
                      v-model.trim="fields.name"
                      required
                      data-qa="categories-name"
                    />
                    <label class="control-label" for="categoryName">{{ $t('category.name') }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="flex xs6">
              <fieldset>
                <div class="form-group">
                  <div class="input-group">
                    <v-select
                      label="name"
                      :data-label=" $t('category.parent')"
                      :class="fields.parent ? 'selected' : ''"
                      :options="categoryList"
                      v-model="fields.parent"
                      :clearable="true"
                      data-qa="category-parent"
                    />
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
import CategoryService from 'services/network/CategoryService.js';

export default {
  computed: {
    isReadyToSubmit() {
      return ![null, ''].includes(this.fields.name);
      // return !Object.keys(this.fields).find(
      //   key => this.fields[key] === null || this.fields[key] === ''
      // );
    }
  },
  mounted() {
    CategoryService.getCategoryList().then(response => {
      this.categoryList = response.list;
    });
  },
  methods: {
    submitCategory() {
      CategoryService.createCategory({
        name: this.fields.name,
        parentId: this.fields.parent ? this.fields.parent.id : null
      }).then(response => {
        this.$toasted.global.global_success({
          message: 'Category was created!'
        });
        this.$router.push({ name: 'admin__categories' });
      });
    }
  },
  data() {
    return {
      fields: {
        name: null,
        parent: null
      },
      categoryList: []
    };
  }
};
</script>

<style>
</style>
