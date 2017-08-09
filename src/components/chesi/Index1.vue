<template>
  <div id="demo">
    <button v-on:click="show = !show">
    </button>
    Toggle
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        show: true
      }
    }
  }
</script>
<style>
  .fade-enter-active {
    transition: opacity 1.5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }

</style>
