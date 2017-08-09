<template>
  <ul>
    <li>
      <input @click="botton()" type="checkbox" v-model="quan" />全选
      <span>ID</span>
      <span>姓名</span>
      <span>年龄</span>
      <span>性别</span>
      <span>操作</span>
    </li>
    <li v-for="(value,index) in titleshuju">
      <input type="checkbox" v-model="value.btn" />
      <span>{{value.id}}</span>
      <span>{{value.name}}</span>
      <span>{{value.age}}</span>
      <span>{{value.sex}}</span>
      <span @click="Top(index)">↑</span>
      <span @click="bot(index)">↓</span>
      <span @click="remove(index)">X</span>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['titleshuju'],
    data () {
      return {
        quan: false
      }
    },
    methods: {
      botton () {
        this.$emit('btn', this.quan)
      },
      Top (index) {
        this.$emit('shang', index)
      },
      bot (index) {
        this.$emit('bottom', index)
      },
      remove (index) {
        this.$emit('delete', index)
      }
    }
  }
</script>
<style>
  li {
    list-style: none;
    margin: 0 0 2px 0;
  }

  ul {
    width: 700px;
  }

  ul li:first-child {
    background: #4bbee4;
    color: #fff;
  }

  ul li:first-child>span {
    margin: 0 20px;
  }

  ul li:not(:first-child) {
    background: #fff;
  }

  ul li:not(:first-child) span {
    margin: 0 30px;
    color: #4bbee4;
    cursor: pointer;
  }
</style>
