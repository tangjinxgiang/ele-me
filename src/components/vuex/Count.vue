<template>
  <div>
    <page-a></page-a>
    <page-b :ageb="age"></page-b>
  </div>
</template>
<script type="text/ecmascript-6">
 import A from './../A/A'
 import B from './../A/B'
 export default {
   computed: {
     age () {
       return this.$store.state.age
     }
   },
   components: {
      'page-a': A,
      'page-b': B
   }
  }
</script>
<style>
  div{
    width:500px;
    height:500px;
    border:1px solid red;
    display: flex;
  }
  form{
    width:250px;
    height:500px;
    border:1px solid palegoldenrod;
    flex: 1;
  }
  form input:first-child{
    border:1px solid black;
    outline: none;
  }
  form input:last-child{
    background: peru;
    outline: none;
  }
  ul{
    width:250px;
    height:500px;
    border:1px solid blueviolet;
    flex: 1;
  }
</style>
