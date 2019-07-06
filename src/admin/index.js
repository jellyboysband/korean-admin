// Polyfills
import 'es6-promise/auto';
import 'babel-polyfill';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from '../App';
import store from './store';
import router from '../router/index.js';
import VuesticPlugin from '@/vuestic-theme/vuestic-plugin';
import '../i18n';
import Axios from 'axios';
import toasted from 'vue-toasted';
import VueSelect from 'vue-select';
import 'prismjs';
import 'prismjs/themes/prism.css';
import VuePrismComponent from 'vue-prism-component';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueProgressBar from 'vue-progressbar';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Vue2Filters from 'vue2-filters';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(Vue2Filters);
Vue.use(VueProgressBar, {
  color: '#4ab2e3',
  failedColor: 'red',
  thickness: '4px'
});

if (window.env.SENTRY_DSN) {
  Sentry.init({
    dsn: window.env.SENTRY_DSN,
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true
      })
    ]
  });
}

Vue.use(VueTextareaAutosize);
Vue.use(VuesticPlugin);
Vue.use(toasted);

Vue.component('v-select', VueSelect);
Vue.component('prism', VuePrismComponent);

Vue.config.errorHandler = function(err, vm, info) {
  console.log(err);
  console.log(info);
  Vue.toasted.error(err.message, { duration: 3000 });
};

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});

Vue.toasted.register(
  'global_success',
  payload => {
    if (!payload.message) {
      return 'Success!';
    }
    return 'Success!' + payload.message;
  },
  {
    type: 'success',
    duration: 3000
  }
);

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });

Vue.filter('formatDate', function(value) {
  if (!value) return null;
  const date = new Date(value);
  const lng = navigator.browserLanguage || navigator.language || navigator.userLanguage;
  return date.toLocaleDateString([lng], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
});

Vue.filter('formatTime', function(timeInSeconds) {
  timeInSeconds /= 1000;
  if (!timeInSeconds) return null;
  const pad = function(num, size) {
    return ('000' + num).slice(size * -1);
  };
  const time = parseFloat(timeInSeconds).toFixed(3);
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
});

// Axios Setup
Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json';

const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['AdminCookie'] = token;
}

// Router settings
router.beforeEach((to, from, next) => {
  store.commit('setLoading', true);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ name: 'login' });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  store.commit('setLoading', false);
});

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
