<template><!--评论大组件-->
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间11<i>{{seller.deliveryTime}}分钟</i></span>
            </div>
          </div>
        </div>
        <split></split>
      <ratingselect :initSelectType="selectType"
                    :only-content="onlyContent"
                    :ratings="ratings"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}分钟送达
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                <span class="iconfont icon-support"></span>
                <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from './../star/star'
  import BScroll from 'better-scroll'
  import {formatDate} from './../../common/js/date'
  import split from './../split/Split'
  import ratingselect from './../ratingselect/Ratingselect'
  import axios from 'axios'
  const ALL = 2
  const ERR_OK = 0

    export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      }
    },
    created() {
      /* this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      }) */
      axios.get('/api/ratings')
        .then((response) => {
          response = response.data
          if (response.errno === ERR_OK) {
            this.ratings = response.data
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
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
    events: { // ！！！！
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
     },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>
<style>
  @import '../../common/foot/iconfont.css';
  .ratings{
    position: absolute;
    top:174px;
    bottom: 0;
    width:100%;
    left: 0;
    overflow: hidden;
  }
  .ratings .ratings-content .overview{
    display: flex;
    padding:18px 0;
  }
  .ratings .ratings-content .overview .overview-left{
    flex: 0 0 137px;
    padding: 6px;
    border-right:1px solid rgba(7,17,27,0.2);
    text-align: center;

  }
   @media only screen and (max-width: 320px){
     .overview-left {
       flex: 0 0 120px !important;
       width: 120px;
       padding:0 !important;
     }
     .overview-right {
        padding-left:6px !important;
     }
  }
  .overview-left .score{
    font-size: 24px;
    line-height: 28px;
    color:rgb(255,153,0);
    margin-bottom: 6px;
  }
  .overview-left .title{
    font-size: 12px;
    color:rgb(7,17,27);
    line-height: 12px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .overview-left .rank{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height: 10px;
  }
  .ratings .ratings-content .overview .overview-right{
    flex: 1;
    padding-left: 24px;
  }
  .overview-right{
    flex: 1;
    padding:6px 0  6px 24px;
  }
  .overview-right .score-wrapper{
    margin-bottom: 8px;
    font-size: 0;
  }
  .overview-right .score-wrapper .title{
    font-size: 12px;
    color:rgb(7,17,27);
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
  }
  .overview-right .score-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin:0 12px;
  }
  .overview-right .score-wrapper .score{
    font-size: 12px;
    line-height: 18px;
    display: inline-block;
    vertical-align: top;
    color:rgb(255,153,0);
  }
  .delivery-wrapper .title{
    font-size: 12px;
    color:rgb(7,17,27);
    line-height: 18px;
  }
  .delivery-wrapper .title i{
    font-style: normal;
    margin-left:13px;
    color:rgb(147,153,159)
  }

  .rating-wrapper{
    padding:0 18px;
  }
  .rating-wrapper .rating-item{
    display: flex;
    padding:18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .rating-wrapper .rating-item .avatar{
    flex:0 0 28px;
    width:28px;
    margin-right: 12px;
  }
  .rating-wrapper .rating-item .avatar img{
    border-radius:50%;
  }
  .rating-wrapper .rating-item .content{
    position: relative;
    flex: 1;
  }
  .rating-wrapper .rating-item .content .name{
    line-height: 12px;
    color:rgb(7, 17, 27);
    font-size: 10px;
    margin-bottom: 4px;
  }
  .rating-wrapper .rating-item .content .star-wrapper{
   font-size: 0;
  }
  .rating-wrapper .rating-item .content .star-wrapper .star{
    display: inline-block;
    margin-bottom: 6px;
  }
  .rating-wrapper .rating-item .content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: bottom;
    margin:0 0 6px 6px;
    font-size: 10px;
    font-weight: 200;
    color:rgb(147,153,159);
    line-height:12px;
  }
  .rating-wrapper .rating-item .content .text{
    font-size: 12px;
    color:rgb(7,17,27);
    line-height: 18px;
  }
  .rating-wrapper .rating-item .content .recommend{
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
  }
  .rating-wrapper .rating-item .content .recommend .icon-support{
    font-size: 12px;
    color:rgb(0,160,220);
    line-height: 18px;
    display: inline-block;
  }
  .rating-wrapper .rating-item .content .recommend .item{
    font-size: 9px;
    color:rgb(147,153,159);
    line-height: 18px;
    margin-left:8px;
    padding:0px 12px;
    border:1px solid rgba(7,17,27,0.1);
    background-color: #fff;
    margin-bottom: 4px;
  }
  .rating-wrapper .rating-item .content .time{
    position: absolute;
    right:18px;
    top:0;
    font-size: 10px;
    font-weight: 200;
    color:rgb(147,153,159);
    line-height: 12px;
  }
</style>
