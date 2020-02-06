<template>
  <div class="va-row mt-2 pt-2">
    <div class="flex xs4">
      <div class="form-group">
        <div class="input-group mr-4">
          <input
            id="categoryName"
            type="text"
            v-model.trim="filter.name"
            data-qa="categories-name"
            @input="changeFilter(filter)"
          />
          <label class="control-label" for="categoryName">{{ $t('category.name') }}</label>
          <i class="bar"></i>
        </div>
      </div>
    </div>
    <div class="flex xs8">
      <div class="form-group">
        <div class="input-group mr-4">
          <v-select
            label="name"
            :data-label=" $t('product.brand')"
            :class="'selected'"
            :options="selectOptions.brands"
            v-model="filter.brand"
            :clearable="true"
            multiple
            data-qa="product-brand"
            @change="changeFilter(filter)"
          />
        </div>
        <div class="input-group mr-4">
          <v-select
            label="name"
            :data-label=" $t('product.categories')"
            :class="'selected'"
            :options="selectOptions.categories"
            v-model="filter.categories"
            :clearable="true"
            multiple
            @change="changeFilter(filter)"
            data-qa="product-categories"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandService from 'services/network/BrandService.js';
import CategoryService from 'services/network/CategoryService.js';

export default {
  components: {},
  props: {},

  computed: {},
  mounted() {
    BrandService.getBrandList().then(response => {
      this.selectOptions.brands = response.list;
    });
    CategoryService.getCategoryList().then(response => {
      this.selectOptions.categories = response.list;
    });
  },
  methods: {
    changeFilter(filter) {
      const newFilter = {
        name: filter.name,
        brand: (filter.brand || []).map(it => it.id),
        categories: (filter.categories || []).map(it => it.id)
      };
      if (newFilter.categories.length) {
        const parents = new Set(newFilter.categories);
        for (const category of filter.categories) {
          const catParents = this.getAllChilds(
            category,
            this.selectOptions.categories
          );
          for (const catId of catParents) {
            parents.add(catId);
          }
        }
        newFilter.categories = [...parents];
      }
      console.log('TCL: changeFilter -> newFilter', newFilter.categories);

      this.$emit('handleFilterChange', newFilter);
    },

    getAllChilds(category, categories, ids = new Set()) {
      ids.add(category.id);
      const child = categories.find(it => it.parentId === category.id);
      if (!child || ids.has(child.id)) {
        return [...ids];
      }
      return this.getAllChilds(child, categories, ids);
    }

    // changeBrand(brands) {},
    // changeCategories(categories) {}
  },
  data() {
    return {
      filter: {
        brand: [],
        categories: [],
        name: ''
      },
      selectOptions: {
        brands: [],
        categories: []
      }
    };
  }
};
</script>
