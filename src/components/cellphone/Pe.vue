<template>
  <div class="box_list">
    <Checked :array="arr" @remove="none"></Checked>
    <catalogue @add="dianji"></catalogue>
  </div>
</template>
<script>
  import Vue from 'vue'
  import St from './St'
  import Checked from './Checked'

  export default {
    components: {
      'catalogue': St,
      'Checked': Checked
    },
    data () {
      return {
        arr: ['', '', '', '']
      }
    },
    methods: {
      dianji: function (index, value) {
        // this.arr[index] = value;写法没用的需要下面方法
        Vue.set(this.arr, index, value)
      },
      none: function (index) {
        var dx = []
        for (var i = 0; i < this.arr.length; i++) {
          if (i !== index) {
            dx.push(this.arr[i])
          }
        }
        this.arr = dx
      }
    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  i {
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: #666;
  }

  .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  .clear {
    zoom: 1;
  }

  #box {
    width: 1000px;
    height: 500px;
    padding-top: 145px;
    margin: 50px auto 0;
  }

  .box_list {
    width: 760px;
    height: 260px;
    margin: 0 auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .ul1 {
    height: 50px;
    background: rgba(239, 247, 246, 0.8);
  }

  .ul1 li:first-child {
    text-indent: 21px;
    font-size: 14px;
    color: #000000;
    line-height: 50px;
  }

  .ul1 li {
    float: left;
  }

  .ul1 li:not(:first-child) {
    margin: 13px 0 11px 10px;
    border: 1px solid #28a5c4;
    height: 24px;
  }

  .ul1 li:not(:first-child)>a {
    padding: 6px 12px 5px 6px;
    font-size: 12px;
    color: #28a5c4;
  }

  .ul1 li:not(:first-child)>i {
    background: #28a5c4;
    color: #fff;
    width: 18px;
    height: 18px;
    display: inline-block;
    margin: 3px 2px 3px 0;
    text-align: center;
    line-height: 18px;
  }

  .list_cont {
    height: 172px;
    background: #f1f7f7;
    padding: 20px 0 18px 0;
  }

  .list_cont dl {
    margin-left: 29px;
    width: 700px;
    height: 42px;
    font-size: 14px;
    line-height: 42px;
    border-bottom: 1px dashed #d4edf3;
  }

  .list_cont dl dt {
    float: left;
    width: 43px;
    color: #8a8a8a;
  }

  .list_cont dl dd {
    float: left;
    margin: 0 11px 0 12px;
    color: #000;
    cursor: pointer;
  }

  .active {
    color: #40afca !important;
  }
</style>
