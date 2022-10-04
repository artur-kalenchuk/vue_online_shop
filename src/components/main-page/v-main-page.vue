<template>
  <div class='v-main-page'>
    <h1>Online-shop</h1>
    <p class="v-main-page_links">
      <router-link :to="{name: 'products'}">
        Open Products
      </router-link>
      <router-link :to="{name: 'statistics'}">
        Open Statistics
      </router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: "v-main-page",
    props: {},
    data() {
      return {}
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .v-main-page {
    &_links {
      display: flex;
      justify-content: center;
      a {
        margin-right: 20px;
      }
    }
  }
  a {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    padding: 10px 25px;
    border: 1px solid;
    text-transform: uppercase;
    background: #8d3e8d;
    color: white;
    text-decoration: none;
    display: inline-block;
    border: none;
    transition: 0.4s;
  }
  a:hover {
    transform: scale(1);
    transition: 0.4s;
  }
</style>
