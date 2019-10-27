import axios from 'axios';

import UploadService from './UploadService';
class ProductService {
  static createProduct({ photo, ...data }) {
    return axios.post(`${window.env.API_URL}/api/admin/products`, data).then(response => {
      if (photo) {
        return UploadService.send(response.data.id, { file: photo }).then(it => response.data);
      } else {
        return response.data;
      }
    });
  }
  static editProduct(id, { photo, ...data }) {
    return axios.put(`${window.env.API_URL}/api/admin/products/${id}`, data).then(response => {
      if (photo) {
        return UploadService.send(response.data.id, { file: photo }).then(it => response.data);
      } else {
        return response.data;
      }
    });
  }
  static getProductList({ limit = 1000, offset = 0, order = '-id', ...params }) {
    return axios.get(`${window.env.API_URL}/api/admin/products`, { params: { limit, offset, order, ...params } }).then(response => response.data);
  }
  static getProductById(id) {
    return axios.get(`${window.env.API_URL}/api/admin/products/${id}`).then(response => response.data);
  }
  static deleteProduct(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/products`, { params: { id } }).then(response => response.data);
  }
}

export default ProductService;
