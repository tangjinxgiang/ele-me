<template> <!--商品组件-->
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu-wrapper"> <!--侧边菜单栏目-->
        <ul>
          <li v-for="(item, index) in goods"
              class="menu-item"
              :class="{'current':currentIndex === index}"
              @click="selectMenu(index,$event)"
          >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods-wrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)"  v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img width="57" hieght="57" :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span><i>￥</i>{{food.price}}</span>
                    <span v-show="food.oldPrice"><i>￥</i>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>  <!--食品目录-->
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<script type="text/ecmascript-6">
 import BScroll from 'better-scroll' // 滑动效果
 import shopcart from './../shopcart/shopcart'
 import cartcontrol from './../cartcontrol/cartcontrol'
 import food from './../food/Food'
 import axios from 'axios'
  var ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
                foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      /* this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }) */
      axios.get('/api/goods')
        .then((response) => {
          response = response.data
          if (response.errno === ERR_OK) {
            this.goods = response.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs['foods-wrapper'], {probeType: 3, click: true})
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      selectFood(food, event) {
        if (!event._constructed) {
            return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return
        }
        console.log(index)
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      _calculateHeight() {
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
 }
</script>
<style>
  .goods{display:flex;position:absolute;top:174px;bottom:46px;overflow:hidden;width:100%;}
  .goods .menu-wrapper{flex: 0 0 80px;width:80px;background: #f3f5f7;}
  .menu-item{display: table;height:54px;width:56px;line-height: 14px;padding:0 12px;}

  .menu-item.current {
    position: relative;
    z-index: 10;
    background: #fff;
  }
  .menu-item.current .text{
    border-bottom:1px solid #fff;
    font-weight: 700;
  }
  .menu-item .icon{
    display: inline-block;
    margin-right:2px;
    width:12px;
    height:12px;
    background-size: 12px 12px !important;
    vertical-align: top;
  }
  .icon.decrease{
    background: url("decrease_3@2x.png") no-repeat;
  }
  .icon.discount{
    background: url("discount_3@2x.png") no-repeat;
  }
  .icon.guarantee{
    background: url("guarantee_3@2x.png") no-repeat;
  }
  .icon.invoice{
    background: url("invoice_3@2x.png") no-repeat;
  }
  .icon.special{
    background: url("special_3@2x.png") no-repeat;
  }
  .menu-item .text{
    font-size: 12px;
    display: table-cell;
    width:56px;
    vertical-align: middle;
    border-bottom:1px solid rgba(7, 17, 27, 0.1)
  }
  .goods .foods-wrapper{flex: 1}
  .food-list .title{padding-left:14px;height:26px;line-height: 26px;border-left:2px solid #d9dde1;font-size: 12px;color:rgb(147, 153, 159);background: #f3f5f7;}
  .food-list .food-item{display: flex;margin:18px;padding-bottom: 18px; border-bottom:1px solid rgba(7, 17, 27, 0.1);position: relative}
  .food-list .food-item:last-child{border: none;margin-bottom: 0;}
  .food-list .food-item .icon{flex: 0 0 57px;margin-right:10px;}
  .food-list .food-item .content{flex: 1;}
  .content .cartcontrol-wrapper{position: absolute;right:0;bottom:12px;}
  .food-list .food-item .content .name{margin:2px 0 8px 0;height:14px;line-height: 14px;font-size:14px;color:rgb(7, 17, 27);}
  .food-list .food-item .content .desc{margin-bottom:8px;font-size: 10px;color:rgb(147, 153, 159);line-height:10px;}
  .food-item .content .extra{font-size: 0}
  .food-list .food-item .content .extra span{margin-bottom:8px;font-size: 10px;color:rgb(147, 153, 159);line-height:10px;}
  .food-list .food-item .content .extra span:first-child{margin-right:12px;}
  .food-list .food-item .content .price{font-size: 0}
  .food-list .food-item .content .price span:first-child{color:#f01414;line-height: 24px;font-size:14px;font-weight: 700;margin-right: 8px;}
  .food-list .food-item .content .price span:first-child i{font-style: normal;font-size: 10px;font-weight: normal;}
  .food-list .food-item .content .price span:last-child{font-size: 10px;color:rgb(147, 153, 159);font-weight: 700;line-height: 48px;}
  .food-list .food-item .content .price span:last-child i{font-weight: normal}

</style>
