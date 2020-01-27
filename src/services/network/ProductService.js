import axios from 'axios';

import UploadService from './UploadService';
class ProductService {
  static createProduct({ extras, ...data }) {
    return axios.post(`${window.env.API_URL}/api/admin/products`, data).then(response => {
      const tasks = [];
      for (const extra of extras) {
        tasks.push(axios.post(`${window.env.API_URL}/api/admin/productExtras`, { ...extra, productId: response.data.id }).then(it => {
          if (extra.photo) {
            return UploadService.send(it.data.id, { file: extra.photo[extra.photo.length - 1] }).then(it => it.data);
          } else {
            return it.data;
          }
        }));
      }
      return Promise.all(tasks).then(_ => response.data);
    });
  }
  static editProduct(id, data) {
    return axios.put(`${window.env.API_URL}/api/admin/products/${id}`, data).then(response => {

    });
  }

  static uploadPhoto(id, photo) {
    return UploadService.send(id, { file: photo }).then(response => response.data);
  }

  static getProductList({ limit = 1000, offset = 0, order = '-id', ...params }) {
    return axios.get(`${window.env.API_URL}/api/admin/products`, { params: { limit, offset, order, ...params } }).then(response => response.data);
  }
  static getProductById(id) {
    return axios.get(`${window.env.API_URL}/api/admin/products/${id}`).then(response => response.data);
  }
  static deleteProduct(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/products/${id}`).then(response => response.data);
  }

  static createExtra(data) {
    return axios.post(`${window.env.API_URL}/api/admin/productExtras`, data).then(response => {
      return response.data;
    });
  }
  static editExtra(id, { photo, ...data }) {
    return axios.put(`${window.env.API_URL}/api/admin/productExtras/${id}`, data).then(response => {
      if (photo) {
        return UploadService.send(id, { file: photo[photo.length - 1] }).then(it => response.data);
      } else {
        return response.data;
      }
    });
  }
  static getExtraList({ limit = 1000, offset = 0, order = '-id', ...params }) {
    return axios.get(`${window.env.API_URL}/api/admin/productExtras`, { params: { limit, offset, order, ...params } }).then(response => response.data);
  }
  static getExtraById(id) {
    return axios.get(`${window.env.API_URL}/api/admin/productExtras/${id}`).then(response => response.data);
  }
  static deleteExtra(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/productExtras/${id}`).then(response => response.data);
  }
}

export default ProductService;
