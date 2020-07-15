<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Ninja smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div.navbar {
  .nav-content {
    margin-left: 60px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
