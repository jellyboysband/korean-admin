import axios from 'axios';
class ProductService {
  static createProduct(data) {
    return axios.post(`${window.env.API_URL}/product`, data).then(response => response.data);
  }
  static getProductList({ limit = 10000, offset = 0, ...params }) {
    return axios.get(`${window.env.API_URL}/products`, { params: { limit, offset, ...params } }).then(response => response.data);
  }
  static getProductById(id) {
    return axios.get(`${window.env.API_URL}/product/${id}`).then(response => response.data);
  }
  static deleteProduct(id) {
    return axios.delete(`${window.env.API_URL}/product`, { params: { id } }).then(response => response.data);
  }
}

export default ProductService;
