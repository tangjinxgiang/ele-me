<template>
  <label for="">
    姓名:<input type="text" v-model="name"/>
    年龄:<input type="text" v-model="age"/>
    性别 :<select v-model="sex">
    <option disabled value="">请选择</option>
    <option>男</option>
    <option>女</option>
  </select>
    <input type="button" v-on:click="add()" value="添加"/>
  </label>
</template>
<script>
  export default {
    data () {
      return {
        name: '',
        age: '',
        sex: ''
      }
    },
    methods: {
      add () {
        this.$emit('append', this.name, this.age, this.sex)
      }
    }
  }
</script>
<style>

</style>
