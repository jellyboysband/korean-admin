<template>
  <vuestic-navbar>
    <header-selector slot="selector" :isOpen.sync="valueProxy"/>
    <span slot="logo">
      <vuestic-icon-vuestic/>
    </span>
    <span slot="center">

    </span>

    <profile-dropdown class="col nav-item">
      <span slot="profile-name-text">
        {{this.$store.getters.adminName}}
      </span>
      <img slot="avatar-img" src="../../../assets/images/admin.png"/>
    </profile-dropdown>
  </vuestic-navbar>

</template>

<script>

import VuesticIconVuestic
  from 'vuestic-components/vuestic-icon/VuesticIconVuestic';
import VuesticNavbar
  from 'vuestic-components/vuestic-navbar/VuesticNavbar';
import HeaderSelector from './components/HeaderSelector';
import ProfileDropdown from './components/dropdowns/ProfileDropdown';

export default {
  name: 'app-navbar',

  components: {
    VuesticIconVuestic,
    VuesticNavbar,
    HeaderSelector,
    ProfileDropdown,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    valueProxy: {
      get() {
        return this.isOpen;
      },
      set(opened) {
        this.$emit('toggle-menu', opened);
      },
    },
  },
};
</script>
