<template>
  <div class="row justify-content-center" v-if="categoryList.length">
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
          <!--   <td>{{ category.name }}</td>-->
          <td>
            <div class="form-group">
              <div class="input-group">
                <input class="va-input" v-model.trim="category.name" />
                <i class="bar"></i>
              </div>
            </div>
          </td>
          <td>
            <v-select
              label="name"
              :data-label=" $t('category.parent')"
              :class="category.parent ? 'selected' : ''"
              :options="getOptions(categoryList,category)"
              v-model="category.parent"
              :clearable="true"
              required
              data-qa="category-parent"
              @change="changeParent(category,category.parent?category.parent.id:null)"
            />
          </td>
          <td>
            <button
              class="btn btn-micro btn-success"
              type="button"
              @click="updateCategory(category)"
            >{{$t('category.submit')}}</button>
          </td>
          <td>
            <span
              aria-hidden="true"
              class="entypo maki-trash trash"
              style="color: #e34a4a"
              @click.stop="deleteOrRestore(category) "
            ></span>
          </td>
        </tr>
      </tbody>
    </table>

    <vuestic-modal ref="largeModal" :large="true" @ok="ok" @cancel="cancel">
      <p>{{ $t('category.confirm') }} {{ category.name }}?</p>
    </vuestic-modal>
  </div>
  <div v-else>
    <p>{{ $t('category.empty') }}</p>
  </div>
</template>

<script>
import CategoryTable from 'components/categories/CategoryTable';
import CategoryService from 'services/network/CategoryService';

export default {
  components: {
    CategoryTable
  },
  props: {
    filter: Object
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    updateCategory({ id, name, parent }) {
      CategoryService.updateCategory(id, {
        name,
        parentId: parent ? parent.id : null
      }).then(response => {
        console.log('TCL: updateCategory -> response', response);
      });
    },
    getCategories() {
      CategoryService.getCategoryList().then(response => {
        response.list.forEach(
          it =>
            (it.parent = it.parentId
              ? response.list.find(parent => parent.id === it.parentId)
              : null)
        );
        this.categoryList = response.list;
      });
    },

    deleteOrRestore(category) {
      this.category = category;
      this.$refs.largeModal.open();
    },
    ok() {
      CategoryService.deleteCategory(this.category.id).then(response => {
        this.getCategories();
        this.$toasted.global.global_success({
          message: 'Category was deleted!'
        });
        this.category = {};
      });
    },
    cancel() {
      this.category = {};
    },
    changeParent(current, parentId) {
      current.parentId = parentId;
      this.updateCategory(current);
    },
    getOptions(list, current) {
      const result = list.filter(
        it => !this.isCycleWithFakeParent(current.id, it.id, list)
      );
      return result;
    },
    isCycleWithFakeParent(categoryId, fakeParentId, categories) {
      categories = categories.map(it => {
        return {
          id: it.id,
          parentId: it.parentId
        };
      });
      const category = categories.find(it => it.id === categoryId);
      category.parentId = fakeParentId;
      const result = this.isCycle(category, categories);
      return result;
    },
    isCycle(category, categories, ids = new Set()) {
      if (!category.parentId) {
        return false;
      }
      ids.add(category.id);
      if (ids.has(category.parentId)) {
        return true;
      }
      return this.isCycle(
        categories.find(it => it.id === category.parentId),
        categories,
        ids
      );
    }
  },
  data() {
    return {
      categoryList: [],
      category: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.trash {
  font-size: 30px;
}
</style>
