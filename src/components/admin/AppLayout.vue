<template>
  <vuestic-layout v-layout>
    <app-navbar :isOpen="navbarOpened" @toggle-menu="toggleNavbar" />
    <app-sidebar :isOpen="sidebarOpened" @toggle-menu="toggleSidebar" />
    <main slot="content" id="content" class="content va-layout gutter--lg fluid" role="main">
      <!-- <app-breadcrumbs/> -->
      <router-view />
    </main>
    <span slot="footer">
      ©2019. Made by&nbsp;
      <a href="https://github.com/disheshub" target="_blank">Boys</a>
    </span>
  </vuestic-layout>
</template>

<script>
import VuesticLayout from 'vuestic-components/vuestic-layout/VuesticLayout';
import AppNavbar from './app-navbar/AppNavbar';
import AppSidebar from './app-sidebar/AppSidebar';
import AppBreadcrumbs from './app-breadcrumbs/AppBreadcrumbs';
import Layout from 'vuestic-directives/Layout';

export default {
  name: 'app-layout',
  components: {
    VuesticLayout,
    AppNavbar,
    AppSidebar,
    AppBreadcrumbs,
  },
  directives: {
    layout: Layout,
  },
  data() {
    return {
      // opened: true,
      navbarOpened: true,
      sidebarOpened: true,
      build: window.env.BUILD
    };
  },
  methods: {
    toggleSidebar(opened) {
      this.sidebarOpened = opened;
    },
    toggleNavbar(opened) {
      this.navbarOpened = opened;
    }
  },
  created() {
    this.$store.dispatch('profile');
  },
  mounted() {
    if (window.innerWidth < 991) {
      this.sidebarOpened = false;
    }
  }
};
</script>
