<template>
  <div class="profile-dropdown flex-center">
    <span class="profile-dropdown__profile-name">
      <slot name="profile-name-text"/>
    </span>
    <span class="profile-dropdown__avatar-container">
      <slot name="avatar-img"/>
    </span>
    <vuestic-dropdown v-model="isShown" position="bottom">
      <div class="dropdown-item plain-link-item">
        <router-link
          :to="{name : 'admin__personal-settings'}"
          class="plain-link"
        > Settings</router-link>
      </div>
      <div class="dropdown-item plain-link-item">
        <a @click="logoutHandler" class="plain-link">{{ $t(`user.logout`) }}</a>
      </div>
    </vuestic-dropdown>
  </div>
</template>

<script>
export default {
  name: 'profile-section',
  methods: {
    logoutHandler() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'login' });
      });
    }
  },
  data() {
    return {
      isShown: false
    };
  }
};
</script>

<style lang="scss">
@import "../../../../../vuestic-theme/vuestic-sass/resources/resources";

.profile-dropdown {
  cursor: pointer;

  &__avatar-container {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid $lighter-gray;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &__profile-name {
    color: white;
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
}
</style>
