<template>
  <div id="list">
    <addition @append="add">

    </addition>
    <cont :titleshuju="data" @btn="qx" @shang="top" @bottom="bot" @delete="remove">

    </cont>
  </div>
</template>
<script>
  import Vue from 'vue'
  import B from './B'
  import C from './C'

  var data = [{
    btn: false,
    id: 1,
    name: '天天',
    age: 20,
    sex: '女'
  }, {
    btn: false,
    id: 2,
    name: '存储',
    age: 28,
    sex: '男'
  }, {
    btn: false,
    id: 3,
    name: '变白',
    age: 22,
    sex: '女'
  }, {
    btn: false,
    id: 4,
    name: '哦哦',
    age: 30,
    sex: '男'
  }]
  export default {
    components: {
      'addition': B,
      'cont': C
    },
    data () {
      return {
        data: data
      }
    },
    methods: {
      add: function (name, age, sex) {
        if (name !== '' && age !== '' && sex !== '') {
          this.data.push({
            btn: false,
            id: this.data.length + 1,
            name: name,
            age: age,
            sex: sex
          })
          name = ''
          age = ''
          sex = ''
        } else {
          alert(1)
        }
      },
      remove: function (index) {
        var dt = []
        for (var i = 0; i < this.data.length; i++) {
          if (i !== index) {
            dt.push(this.data[i])
          }
        }
        for (var j = 0; j < dt.length; j++) {
          dt[j].id = j + 1
        }
        this.data = dt
      },
      top: function (index) {
        // this.data[index] = old;
        // this.data[index-1] = dq;
        if (index === 0) {
          return
        }
        var dq = this.data[index]
        var old = this.data[index - 1]
        Vue.set(this.data, index, old)
        Vue.set(this.data, index - 1, dq)
      },
      bot: function (index) {
        if (index === this.data.length - 1) {
          return
        }
        var dq = this.data[index]
        var old = this.data[index + 1]
        Vue.set(this.data, index, old)
        Vue.set(this.data, index + 1, dq)
      },
      qx: function (a) {
        for (var i = 0; i < this.data.length; i++) {
          var tempItem = this.data[i]
          tempItem.btn = a
          Vue.set(this.data, i, tempItem)
        }
      }
    }

  }
</script>
<style>
  body {
    background: #63c9f1;
  }
  label {
    margin-left: 40px;
  }
</style>
