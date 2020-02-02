<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('category.categories')">
        <template v-category:header-content>
          <router-link
            :to="{name:'admin__category.create'}"
            class="btn btn-micro btn-primary"
            :data-qa="`widgetButton-Create`"
          >{{$t('create')}}</router-link>
        </template>
        <!-- <category-filters :startFilter="this.filter" @change="handleFilterChange"></category-filters> -->
        <category-list :filter="this.filter"></category-list>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import CategoryList from 'components/categories/CategoryList';

export default {
  props: [],
  components: {
    CategoryList,
  },
  methods: {
    handleFilterChange(filter) {
      this.filter = filter;
    }
  },
  data() {
    return {
      filter: {
        // hallId: this.hallId || null,
        // vgm: null,
        // limit: null,
        // offset: null,
        // title: null,
        // order: '-id',
        // deleted: false
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
