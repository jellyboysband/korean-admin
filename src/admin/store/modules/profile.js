import Axios from 'axios';

const state = {
  status: '',
  id: ''
};

const mutations = {
  profile_request(state) {
    state.status = 'loading';
  },

  profile_success(state, profile) {
    state.status = 'success';
    state.id = profile.id;
  },

  profile_error(state) {
    state.status = 'error';
  },

  logout(state) {
    state.status = '';
    state.id = '';
  }
};

const actions = {
  profile({ commit }) {
    return new Promise((resolve, reject) => {
      commit('profile_request');
      // FIXME: костыль ебаный
      Axios({
        url: `${window.env.API_URL}/products`,
        method: 'GET'
      }).then(response => {
        const profile = { id: 1 };
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
