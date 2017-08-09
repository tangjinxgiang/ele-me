<template> <!--商品数量加减组件-->
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count> 0" @click.stop.prevent="decreaseCart" transition="move">
      <i class=" inner iconfont icon-wuuiconsuoxiao"></i>
    </div>
    <div class="cart-count"  v-show="food.count> 0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <i class="iconfont icon-combinedshape"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
            return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style>
  @import '../../common/foot/iconfont.css';
  .cartcontrol{font-size: 0;}
  .cartcontrol .cart-decrease,.cartcontrol .cart-add{display: inline-block;padding:6px;line-height: 24px;font-size: 24px;color:rgb(0,160,220)}
  .cartcontrol .cart-count{display: inline-block;vertical-align: top;width:12px;padding-top:6px;line-height: 24px;text-align: center;font-size: 10px;color:rgb(147,153,139);}
  .cartcontrol .cart-add{display:inline-block;padding:6px;font-size: 24px;line-height: 24px;color:#00a0dc;transition: all 0.5s;}


</style>
