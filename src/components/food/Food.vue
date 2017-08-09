<template>  <!--食品详情页组件-->
  <div v-show="showFlag" class="food" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="iconfont icon-fanhui1"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="new">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice"><i>￥</i>{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
      <h1 class="title">商品介绍</h1>
      <p class="text">{{food.info}}</p>
    </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :initSelectType="selectType"
                      :only-content="onlyContent"
                      :desc="desc"
                      :ratings="food.ratings"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType , rating.text)" v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span class="iconfont" :class="{'icon-support':rating.rateType===0,'icon-iconfontpraise':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {formatDate} from './../../common/js/date'
  import BScroll from 'better-scroll'
  import cartcontrol from './../cartcontrol/cartcontrol'
  import split from './../split/Split'
  import ratingselect from './../ratingselect/Ratingselect'

  // const POSITIVE = 0
  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'

        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      needShow(type, text) { // 111
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    /* events: { // ！！！！
      'ratingtype.select'(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }, */
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>
<style>
  @import '../../common/foot/iconfont.css';
  .food{
    position: fixed;
    left:0;
    top:0;
    bottom: 48px;
    z-index: 30;
    width:100%;
    background: #fff;
  }
  i{font-style: normal;}
  .image-header{
    position: relative;
    width:100%;
    height: 0;
    padding-top:100%;
  }
  .image-header img{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
  .image-header .back{
    position: absolute;
    top:10px;
    left:0;
  }
  .image-header .back .icon-fanhui1{
    display: block;
    padding:10px;
    font-size: 20px;
    color:#fff
  }
  .food-content .content{
    padding:18px;
    position: relative;
  }
  .food-content .content .title{
    font-weight: 700;
    line-height: 14px;
    font-size:14px;
    color:rgb(7,17,27);
   margin-bottom: 8px;
  }
  .food-content .content .detail{
    letter-spacing: -4px;
    margin-bottom: 18px;
    height:10px;
  }
  .food-content .content .detail .sell-count{
    margin-right:12px;
  }
  .food-content .content .detail .sell-count, .content .detail .rating{
    letter-spacing: 0;
    display: inline-block;
    font-size: 10px;
    color:rgb(147,153,159);
    line-height:10px;
  }
  .food-content .content .price{font-size: 0;margin-bottom: 18px;}
  .food-content .content .price span:first-child{color:#f01414;line-height: 24px;font-size:14px;font-weight: 700;margin-right: 8px;}
  .food-content .content .price span:first-child i{font-style: normal;font-size: 10px;font-weight: normal;}
  .food-content .content .price span:last-child{font-size: 10px;color:rgb(147, 153, 159);font-weight: 700;line-height: 48px;text-decoration: line-through;}
  .food-content .content .price span:last-child i{font-weight: normal;}

  .content .cartcontrol-wrapper{
    position: absolute;
    right:12px;
    bottom: 12px;
  }
  .content .buy{
    position: absolute;
    right:18px;
    bottom: 18px;
    z-index: 10;
    height:24px;
    line-height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color:#fff;
    background: rgb(0,160,220);
  }
  .food .info{
    padding:18px;
  }
  .info .title{
    line-height: 14px;
    font-size: 14px;
    color:rgb(7,17,27);
    margin-bottom: 6px;
  }
  .info .text{
    font-size: 12px;
    font-weight: 200;
    color:rgb(77,85,93);
    line-height: 24px;

  }

  .food-content .rating{
    padding-top:18px;
  }
  .rating .title{
    line-height: 14px;
    font-size: 14px;
    color:rgb(7,17,27);
    margin-left: 18px;
  }
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-item{
    position: relative;
    padding:16px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .rating-item .user{
    position: absolute;
    right:0;
    top:16px;
    font-size: 0;
    line-height: 12px;
  }
  .rating-item .user .name{
    display: inline-block;
    vertical-align: top;
    margin-right:6px;
    font-size: 10px;
    color:rgb(147,153,159)
  }
  .rating-item .user .avatar{
    border-radius: 50%;
  }
  .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .rating-item .text{
    line-height: 16px;
    font-size:12px;
    color:rgb(7,17,27);
  }
  .rating-item .text .iconfont{
    line-height: 16px;
    margin-right:4px;
    font-size:12px;
  }
  .rating-item .text .iconfont.icon-support{
    color:rgb(0,160,220)
  }
  .rating-item .text .iconfont.icon-iconfontpraise{
    color:rgb(147,153,159)
  }
  .no-rating{
    padding:16px 0;
    font-size: 12px;
    color:rgb(147,153,159)
  }
</style>
