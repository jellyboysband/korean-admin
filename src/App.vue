<template>
  <div id="app" class="app" v-cloak>
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$http.interceptors.request.use(
      config => {
        this.$store.dispatch('AJAX_REQUEST_START');
        this.$Progress.start();
        return config;
      },
      err => {
        this.$toasted.error(err.response.data.error, { duration: 3000 });
      }
    );

    this.$http.interceptors.response.use(
      config => {
        this.$store.dispatch('AJAX_REQUEST_END');
        this.$Progress.finish();
        return config;
      },
      err => {
        return new Promise((resolve, reject) => {
          const isNotAuthorized = err.response.status === 401 && err.config && !err.config.__isRetryRequest;
          const isAccessDenied = err.response.status === 403 && err.config && !err.config.__isRetryRequest;

          if (isNotAuthorized) {
            this.$store.commit('logout');
            this.$router.push({ name: 'login' });
          }
          if (isAccessDenied) {
            // TODO: кидать на операторcкий\админский
            // this.$router.replace({ name: 'admin__products' });
          }
          this.$toasted.error(err.response.data.error, { duration: 3000 });

          this.$store.dispatch('AJAX_REQUEST_END');
          this.$Progress.fail();

          throw err;
        });
      }
    );
  }
};
</script>

<style lang="scss">
@import "sass/main";

body {
  height: 100%;
  #app {
    height: 100%;
  }
}
.btn {
  border-radius: 0px !important;
}
.v-select {
  margin-bottom: 1rem;
  &::before {
    content: attr(data-label);
    position: absolute;
    top: 25%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
    padding-left: 0.125rem;
    z-index: 1;
    color: #b3b3b3;
    font-size: 1rem;
    font-weight: normal;
    -webkit-transition: all 0.28s ease;
    transition: all 0.28s ease;
  }
  &.open::before,
  &.selected::before {
    font-size: 0.6rem;
    color: #39c;
    font-weight: 600;
    text-transform: uppercase;
    top: -0.6rem;
  }
  .dropdown-toggle {
    border: none !important;
    border-bottom: 1px solid !important;
    border-radius: 0 !important;
    &::after {
      content: none;
    }
  }
  ul.dropdown-menu {
    background: #333333 !important;
    overflow-y: auto;
    & > .higlight > a {
      background: #161616;
    }
    .active > a {
      color: white;
      background: #161616;
    }
  }
}
</style>
