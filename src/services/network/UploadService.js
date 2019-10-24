import axios from 'axios';
class UploadService {
  static send(id, { file }) {
    const data = new FormData();
    data.append('file', file);
    const options = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.put(`${window.env.API_URL}/api/admin/avatar/${id}`, data, options).then(response => response.data);
  }
}

export default UploadService;
