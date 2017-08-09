<template>
  <div class="list_cont">
    <dl class="clear"  v-for="(attr,index) in items">
      <dt>{{attr.name}}</dt>
      <dd v-on:click="append(index,err)" v-for="err in attr.children">{{err}}</dd>
    </dl>
  </div>
</template>
<script>
  var json = [{
    name: '品牌:',
    children: ['苹果', '小米', '荣耀', '魅族', '华为', '三星', 'OPPO', '苹果']
  }, {
    name: '尺寸:',
    children: ['3.0英寸以下', '3.0-3.9英寸', '4.0-4.5英寸', '4.6-4.9英寸', '5.0-5.5英寸', '6.0英寸']
  }, {
    name: '系统:',
    children: ['安卓（Android）', '苹果（IOS）', '微软（WindowsPhone）', '其他']
  }, {
    name: '网络:',
    children: ['联通3G', '联通2G', '联通1G', '联通4G', '联通5G']
  }]
  export default {
    data () {
      return {
        items: json
      }
    },
    methods: {
      append (index, err) {
        this.$emit('add', index, err)
      }
    }
  }
</script>
<style>

</style>
