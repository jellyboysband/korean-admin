<template>
  <div class="login">
    <h2>{{ $t('auth.welcome') }}</h2>
    <form @submit.prevent="loginAdmin" name="login">
      <div class="form-group">
        <div class="input-group">
          <input
            v-focus
            type="text"
            id="admin-login"
            v-model="login"
            required="required"
            data-qa="login"
          />
          <label class="control-label" for="admin-login">{{ $t('auth.login') }}</label>
          <i class="bar" />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input
            type="password"
            id="password"
            v-model="password"
            maxlength="25"
            required="required"
            data-qa="password"
          />
          <label class="control-label" for="password">{{ $t('auth.password') }}</label>
          <i class="bar" />
        </div>
      </div>
      <div class="d-flex align--center justify--space-between">
        <button class="btn btn-primary" type="submit">{{ $t('auth.logIn') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'admin__products' });
    }
  },
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    loginAdmin() {
      const username = this.login;
      const password = this.password;
      this.$store.dispatch('login', { username, password })
        .then(response => {
          this.$router.push({ name: 'admin__products' });
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      display: none;
    }
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
