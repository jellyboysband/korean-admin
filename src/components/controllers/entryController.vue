<template>
  <div></div>
</template>

<script>

// import axios from 'axios';

export default {
  created() {
    if (window.localStorage.getItem('token')) {
      this.$router.push({ name: 'admin__products' });
    } else {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style>
</style>
