<template>
  <ul>
    <li v-for="(value,index) in record">
      <input v-on:click="dianji(index, -1)"  type="button" value="-" />
      <span>{{value.sl}}</span>
      <input v-on:click="dianji(index, 1)" type="button" value="+" /> 单价：
      <span>{{value.dj}}</span>元； 小计：
      <em>{{value.sl * value.dj}}</em>元；
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['record'],
    methods: {
      dianji (index, num) {
        this.$emit('add', index, num)
      }
    }
  }
</script>
<style>

</style>
