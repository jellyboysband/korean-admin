import axios from 'axios';
class BrandService {
  static createBrand(data) {
    return axios.post(`${window.env.API_URL}/brand`, data).then(response => response.data);
  }
  static getBrandList() {
    return axios.get(`${window.env.API_URL}/brand`).then(response => response.data);
  }
  static deleteBrand(id) {
    return axios.delete(`${window.env.API_URL}/brand`, { params: { id } }).then(response => response.data);
  }
}

export default BrandService;
