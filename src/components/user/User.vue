<template>
  <div class="user">
    <h2>User {{ $route.params.id }}{{ $route.params.name }}</h2>
    <router-view></router-view>
    <router-link to="/user/:id/profile">profile</router-link>
    <router-link to="/user/:id/posts">posts</router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style>

</style>
