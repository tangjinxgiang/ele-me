<template>
  <div id="app">
    <commodity :record="items" @add="dianji">

    </commodity>
    <div>
      <letter :piece="res"></letter>
      <expenditure :ed="yg"></expenditure>
      <expensive :es="zg"></expensive>
    </div>
  </div>


</template>
<script>
  import Two from './Two'
  import letter from './Three'
  import Four from './Four'
  import Five from './Five'

  var arr = [{
    dj: 15,
    sl: 0
  }, {
    dj: 10,
    sl: 0
  }, {
    dj: 5,
    sl: 0
  }, {
    dj: 2,
    sl: 0
  }, {
    dj: 1,
    sl: 0
  }]

  export default {
    components: {
      'commodity': Two,
      'letter': letter,
      'expenditure': Four,
      'expensive': Five
    },
    data () {
      return {
        items: arr
      }
    },
    computed: {
      res: function () {
        var num = 0
        for (var i = 0; i < this.items.length; i++) {
          num = num + this.items[i].sl
        }
        return num
      },
      yg: function () {
        var num = 0
        for (var i = 0; i < this.items.length; i++) {
          num += this.items[i].sl * this.items[i].dj
        }
        return num
      },
      zg: function () {
        var dx = 0
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].sl > 0 && this.items[i].dj > dx) {
            dx = this.items[i].dj
          }
        }
        return dx
      }
    },
    methods: {
      dianji: function (index, num) {
        var re = this.items[index].sl + num
        this.items[index].sl = re > 0 ? re : 0
      }
    }
  }
</script>
<style>

</style>
