import Axios from 'axios';

const state = {
  status: '',
  id: '',
  username: ''
};

const mutations = {
  profile_request(state) {
    state.status = 'loading';
  },

  profile_success(state, profile) {
    state.status = 'success';
    state.id = profile.id;
    state.username = profile.username;
  },

  profile_error(state) {
    state.status = 'error';
  },

  logout(state) {
    state.status = '';
    state.id = '';
    state.username = '';
  }
};

const actions = {
  profile({ commit }) {
    return new Promise((resolve, reject) => {
      commit('profile_request');
      Axios({
        url: `${window.env.API_URL}/api/products`,
        method: 'GET'
      }).then(response => {
        const profile = { id: 1, username: response.username };
        commit('profile_success', profile);
        resolve(response);
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
