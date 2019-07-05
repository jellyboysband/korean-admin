<template>
  <table class="table table-striped first-td-padding table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t('brand.name') }}</th>
        <th>{{ $t('brand.delete') }}?</th>
      </tr>
    </thead>
    <tbody data-qa="brands-table">
      <!--  -->
      <tr v-for="brand in brandList" :key="brand.id">
        <td>{{ brand.id }}</td>
        <td>{{ brand.name }}</td>
        <td>
          <span
            aria-hidden="true"
            class="entypo maki-trash trash"
            style="color: #e34a4a"
            @click.stop="$emit('deleteOrRestore', brand) "
          ></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  components: {
  },
  props: {
    brandList: Array
  },
  methods: {
  },
  data() {
    return {
    };
  }
};
</script>
<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
