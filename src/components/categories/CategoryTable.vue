<template>
  <table class="table table-striped first-td-padding table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('category.name') }}</th>
        <th>{{ $t('category.parent') }}</th>
        <th>{{ $t('category.submit') }}</th>
        <th>{{ $t('category.delete') }}?</th>
      </tr>
    </thead>
    <tbody data-qa="categories-table">
      <!--  -->
      <tr v-for="category in categoryList" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.parentId?categoryList.find(it=>it.id===category.parentId).name:'' }}</td>
        <td>
          <v-select
            label="name"
            :data-label=" $t('product.parent')"
            :class="category.parent ? 'selected' : ''"
            :options="categoryList.filter(it=>it.id!==category.id)"
            v-model="category.parent"
            :clearable="true"
            required
            data-qa="category-parent"
          />
        </td>
        <td>
          <button class="btn btn-micro btn-success" type="button">{{$t('category.submit')}}</button>
        </td>
        <td>
          <span
            aria-hidden="true"
            class="entypo maki-trash trash"
            style="color: #e34a4a"
            @click.stop="$emit('deleteOrRestore', category) "
          ></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
  props: {
    categoryList: Array
  },
  methods: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
