import axios from 'axios';
class BrandService {
  static createBrand(data) {
    return axios.post(`${window.env.API_URL}/api/admin/brands`, data).then(response => response.data);
  }
  static getBrandList() {
    return axios.get(`${window.env.API_URL}/api/admin/brands`).then(response => response.data);
  }
  static deleteBrand(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/brands`, { params: { id } }).then(response => response.data);
  }
}

export default BrandService;
