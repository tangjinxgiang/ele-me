<template><!--商家大组件-->
<div class="seller" ref="seller">
  <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h1>起送价</h1>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>商家配送</h1>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>平均配送时间</h1>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite($event)">
        <i class="iconfont icon-aixin" :class="{'active':favorite}"></i>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h1 class="title">公告与活动</h1>
      <div class="content-wrapper">
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item,index) in seller.supports">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="text">{{seller.supports[index].description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <h1 class="title">商家实景</h1>
      <div class="pic-wrapper" ref="pic-wrapper">
        <ul class="pic-list" ref="pic-list">
          <li class="pic-item"v-for="pic in seller.pics">
            <img :src="pic" width="120" height="90">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="info">
      <h1 class="title">商家信息</h1>
      <ul>
        <li class="info-item" v-for="info in seller.infos">{{info}}</li>
      </ul>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {savaToLocal, loadFromlLocal} from './../../common/js/stoce'
  import star from './../star/star'
  import split from './../split/Split'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromlLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    watch: {
      'seller'() {
        this._initScroll()
      }
    },
    mounted () {
      this.$nextTick(function() {
        this._initScroll()
      })
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs['pic-list'].style.width = width + 'px'
        this.$nextTick(() => {
          this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
      }
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        savaToLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this._initScroll()
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>
<style>
  @import '../../common/foot/iconfont.css';
  .seller{
    position: absolute;
    top:174px;
    bottom: 0;
    width:100%;
    left: 0;
    overflow: hidden;
  }
  .seller .seller-content .overview{
    padding:18px;
  }
  .seller .seller-content .overview .title{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .seller .seller-content .overview .desc{
    padding-bottom: 18px;
    display: flex;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .seller-content .overview .desc .star{
    margin-right: 8px;
  }
  .seller .seller-content .overview .desc .text{
    display: inline-block;
    line-height: 18px;
    margin-right: 12px;
    font-size: 10px;
    color:rgb(77,85,93);
  }
  .seller .seller-content .overview .remark{
    margin-top:18px;
    display: flex;
  }
  .seller .seller-content .overview .remark .block{
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
    flex: 1;
  }
  .seller .seller-content .overview .remark .block:last-child{
    border-right: none;
  }
  .seller .seller-content .overview .remark .block h1{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 4px;
  }
  .seller .seller-content .overview .remark .block .content{
    font-size: 10px;
    font-weight: 200;
    color:rgb(7,17,27);

  }
  .seller .seller-content .overview .remark .block .content .stress{
    font-size: 24px;
    line-height: 24px;
  }
  .seller .seller-content .overview .favorite{
    position: absolute;
    right:18px;
    top:18px;
    width:36px;
    text-align: center;
  }
  .seller .seller-content .overview .favorite .icon-aixin{
    font-size: 24px;
    color:#d4d6d9;
    line-height: 24px;
    margin-bottom: 4px;
    display: block;
  }
  .seller .seller-content .overview .favorite .icon-aixin.active{
    color:rgb(240,20,20);
  }
  .seller .seller-content .overview .favorite .text{
    font-size: 10px;
    color:rgb(77,85,93);
    line-height:10px;
  }
  .seller .seller-content .bulletin{
    padding:18px 18px 16px 18px;
  }
  .seller .seller-content .bulletin .title{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .seller .seller-content .bulletin .content-wrapper{
    padding:0 12px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .seller-content .bulletin .content-wrapper .content{
    font-size: 12px;
    color:rgb(240,20,20);
    padding-bottom: 16px;
  }
  .seller .seller-content .bulletin .supports{

  }
  .seller .seller-content .bulletin .supports .support-item{
    padding:16px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0;
  }
  .seller .seller-content .bulletin .supports .support-item:last-child{
    border-bottom: 0;
  }
  .seller .seller-content .bulletin .supports .support-item .icon{
    display:inline-block;
    width: 16px;
    height:16px;
    vertical-align: top;
    margin-right:6px;
    background-size:16px 16px !important;
    background-repeat: no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .icon.decrease{
    background: url("decrease_2@2x.png") no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .icon.discount{
    background: url("discount_2@2x.png") no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .icon.guarantee{
    background: url("guarantee_2@2x.png") no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .icon.invoice{
    background: url("invoice_2@2x.png") no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .icon.special{
    background: url("special_2@2x.png") no-repeat;
  }
  .seller .seller-content .bulletin .supports .support-item .text{
    font-size: 12px;
    font-weight:200;
    line-height: 16px;
    display:inline-block;
  }
  .seller .seller-content .pics{
    padding:18px;
  }
  .seller .seller-content .pics .title{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 12px;
  }
  .seller .seller-content .pics .pic-wrapper{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .seller .seller-content .pics .pic-wrapper .pic-list{
    font-size: 0;
  }
  .seller .seller-content .pics .pic-wrapper .pic-list .pic-item{
    display: inline-block;
    margin-right: 6px;
    width:120px;
    height:90px;
  }
  .seller .seller-content .pics .pic-wrapper .pic-list .pic-item:last-child{
    margin-right: 0;
  }
  .seller .seller-content .info{
    padding:18px;
  }
  .seller .seller-content .info .title{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 12px;
  }
  .seller .seller-content .info ul{
    padding:0 12px;
  }
  .seller .seller-content .info ul .info-item{
    border-top:1px solid rgba(7,17,27, 0.1);
    padding:16px 0;
    font-size: 12px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 16px;
  }
</style>
