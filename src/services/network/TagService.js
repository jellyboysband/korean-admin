import axios from 'axios';
class TagService {
  static createTag(data) {
    return axios.post(`${window.env.API_URL}/api/admin/tags`, data).then(response => response.data);
  }
  static getTagList() {
    return axios.get(`${window.env.API_URL}/api/admin/tags`).then(response => response.data);
  }
  static deleteTag(id) {
    return axios.delete(`${window.env.API_URL}/api/admin/tags`, { params: { id } }).then(response => response.data);
  }
}

export default TagService;
