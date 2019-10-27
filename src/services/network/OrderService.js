import axios from 'axios';

class OrderService {
  static editOrder(id, data = {}) {
    return axios.put(`${window.env.API_URL}/api/admin/orders/${id}`, data).then(response => {
      return response.data;
    });
  }
  static setStatus(id, status) {
    return axios.put(`${window.env.API_URL}/api/admin/orders/${id}/status`, { status }).then(response => {
      return response.data;
    });
  }
  static getOrderList({ limit = 1000, offset = 0, order = '-createdAt', ...params }) {
    return axios.get(`${window.env.API_URL}/api/admin/orders`, { params: { limit, offset, order, ...params } }).then(response => response.data);
  }
  static getOrderById(id) {
    return axios.get(`${window.env.API_URL}/api/admin/orders/${id}`).then(response => response.data);
  }
}

export default OrderService;
