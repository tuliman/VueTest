<template>
  <div class="navbar">
    <div class="nav-item" @click="$router.push('/')">
      Стартовая
    </div>
    <div @click="$router.push('/pages')" class="nav-item">
      Посты
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar"
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
}

.nav-item {
  margin: auto;

}
</style>
