import Axios from 'axios';

const state = {
  status: '',
  token: localStorage.getItem('token') || ''
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },

  auth_success(state, token) {
    state.status = 'success';
    state.token = token;
  },

  auth_error(state) {
    state.status = 'error';
  },

  logout(state) {
    window.localStorage.removeItem('token');
    delete Axios.defaults.headers.common['X-Culinario-Token'];
    state.status = '';
    state.token = '';
    state.login = '';
  }
};

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      Axios.post(
        `${window.env.API_URL}/api/admin/login`,
        {
          username,
          password
        },
        {}
      )
        .then(response => {
          const token = response.data.token;
          window.localStorage.setItem('token', token);

          Axios.defaults.headers.common['AdminCookie'] = token;

          commit('auth_success', token);

          resolve(response);
        })
        .catch(err => {
          commit('auth_error');
          window.localStorage.removeItem('token');
          reject(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout');
      resolve('');
      // Axios.delete(`${window.env.API_URL}/api/login`)
      //   .then(response => {
      //     resolve(response);
      //   })
      //   .catch(err => {
      //     delete Axios.defaults.headers.common['AdminCookie'];
      //     resolve(err);
      //   });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
