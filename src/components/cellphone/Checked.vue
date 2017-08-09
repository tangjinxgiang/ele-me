<template>
  <ul class="ul1 clear">
    <li><span>你的选择 :</span></li>
    <li v-for="(avv,i) in array" v-show="avv != ''" @click="none(i)">{{avv}}X</li>
  </ul>
</template>
<script>
  export default {
    props: ['array'],
    methods: {
      none (index) {
        this.$emit('remove', index)
      }
    }
  }
</script>
<style>

</style>
