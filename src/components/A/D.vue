<template>
  <input @click="con" type="button" value="点击">
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      con () {
        this.$store.commit('updateAge', 20)
      }
    }
  }
</script>
<style>

</style>
