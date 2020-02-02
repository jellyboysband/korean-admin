import axios from 'axios';
class CategoryService {
  static createCategory(data) {
    return axios.post(`${window.env.API_URL}/api/admin/categories`, data).then(response => response.data);
  }
  static updateCategory(id, data) {
    return axios.put(`${window.env.API_URL}/api/admin/categories/${id}`, data).then(response => response.data);
  }
  static getCategoryList() {
    return axios.get(`${window.env.API_URL}/api/admin/categories`).then(response => response.data);
  }
  static deleteCategory(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/categories/${id}`).then(response => response.data);
  }
}

export default CategoryService;
