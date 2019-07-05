<template>
  <div class="va-row">
    <div class="flex xs12">
      <vuestic-widget :headerText="$t('brand.brands')">
        <template v-brand:header-content>
          <router-link
            :to="{name:'admin__brand.create'}"
            class="btn btn-micro btn-primary"
            :data-qa="`widgetButton-Create`"
          >Create</router-link>
        </template>
        <!-- <brand-filters :startFilter="this.filter" @change="handleFilterChange"></brand-filters> -->
        <brand-list :filter="this.filter"></brand-list>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import BrandList from 'components/brands/BrandList';

export default {
  props: [],
  components: {
    BrandList,
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
