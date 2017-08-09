<template>  <!--头部组件-->
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar"  width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports"class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right">></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideShow">X</div>
    </div>
  </div>
</template>
<script>
  import star from '@/components/star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideShow () {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      star
    }
  }
</script>
<style>
  .header{
    color:#fff;
    position: relative;
    overflow: hidden;
    background:rgba(7, 17, 27, 0.5);
  }
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    display: block;
    content: '.';
    hieght:0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .header .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .header .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .header .content-wrapper .avatar>img{
    border-radius: 2px;
  }
  .header .content-wrapper .content{
    display: inline-block;
    margin-left:16px;
    font-size: 14px;
  }
  .header .content-wrapper .content .title{
    margin:2px 0 8px 0;
  }
  .header .content-wrapper .content .title .brand{
    width:30px;
    height:18px;
    vertical-align: top;
    display: inline-block;
    background: url("brand@2x.png") no-repeat;
    background-size:30px 18px;
  }
  .header .content-wrapper .content .title .name{
    margin-left:6px;
    font-size: 16px;
    font-weight: bold;
    line-height:18px;
  }
  .header .content-wrapper .content .description{
    font-size: 12px;
    font-weight: 100;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .header .content-wrapper .content .support .icon{
    display: inline-block;
    margin-right:4px;
    width:12px;
    height:12px;
    background-size: 12px 12px;
    vertical-align: top;
  }
  .icon.decrease{
      background: url("decrease_1@2x.png") no-repeat;
  }
  .icon.discount{
    background: url("discount_1@2x.png") no-repeat;
  }
  .icon.guarantee{
    background: url("guarantee_1@2x.png") no-repeat;
  }
  .icon.invoice{
    background: url("invoice_1@2x.png") no-repeat;
  }
  .icon.special{
    background: url("special_1@2x.png") no-repeat;
  }
  .content-wrapper .content .support .text{
    font-size: 10px;
    font-weight: 100;
    line-height: 12px;
    vertical-align: top;
  }
  .support-count{
    position: absolute;
    right:12px;
    bottom: 18px;
    padding:0 8px;
    height:24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
  }
  .support-count .count{
    font-size: 10px;
    vertical-align: top;
  }
  .support-count .icon-keyboard_arrow_right{
    font-size: 14px;
    font-style: normal;
    font-family: '微软雅黑';
    margin-left:2px;
    line-height: 24px;
    font-weight: 200;
  }
  .bulletin-wrapper{
    height:28px;
    line-height: 28px;
    overflow: hidden;
    padding:0 22px 0 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -4px;
    position: relative;
  }
  .bulletin-wrapper .bulletin-title{
    display: inline-block;
    width:22px;
    height:12px;
    background: url("bulletin@2x.png") no-repeat;
    background-size: 22px 12px;
    letter-spacing: 0px;
    vertical-align: top;
    margin-top:7px;
  }
  .bulletin-wrapper .bulletin-text{
    font-size: 10px;
    font-weight: 100;
    margin:0 2px 0 2px;
    letter-spacing: 0px;
    vertical-align: top;
    right:12px;
    top: 8px;
  }
  .bulletin-wrapper>.icon-keyboard_arrow_right{
    position: absolute;
    font-size: 14px;
    top:0px;
    right:12px;
    font-weight: 200;
    font-style: normal;
  }
  .background{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .detail{
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    width:100%;
    height:100%;
    overflow: auto;
    transition:all 0.5s;
    background: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);
  }
  .detail.fade-transition{ /*最终*/
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
  }
  .detail.fade-enter,.detail.fade-leave{ /*进入移出*/
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  .detail-wrapper{
    width: 100%;
    min-height:100%;
  }
  .detail-wrapper .detail-main{
    margin-top:64px;
    padding-bottom: 64px;
  }
  .detail-main .name{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  }
  .detail-main .supports{
    width:80%;
    margin:0 auto;

  }
  .detail-main .supports .support-item{
    padding:0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .detail-main .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .detail-main .supports .support-item .icon{
    display: inline-block;
    width: 16px;
    height:16px;
    vertical-align: top;
    margin-right:6px;
    background-size:16px 16px !important;
    background-repeat: no-repeat;
  }
  .supports .support-item .icon.decrease{
    background: url("decrease_2@2x.png") no-repeat;
  }
  .supports .support-item .icon.discount{
    background: url("discount_2@2x.png") no-repeat;
  }
  .supports .support-item .icon.guarantee{
    background: url("guarantee_2@2x.png") no-repeat;
  }
  .supports .support-item .icon.invoice{
    background: url("invoice_2@2x.png") no-repeat;
  }
  .supports .support-item .icon.special{
    background: url("special_2@2x.png") no-repeat;
  }
  .supports .support-item .text{
    font-size: 12px;
    font-weight:200;
    line-height: 16px;
  }
  .detail-main .star-wrapper{
    margin-top:18px;
    padding:2px  0;
    text-align: center;
  }
  .detail-main .title{
    display: flex;
    width:80%;
    margin: 28px auto 24px auto;
  }
  .title .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .title .text{
    padding:0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .detail-main .bulletin{
    width:80%;
    margin:0 auto;
  }
  .detail-main .bulletin .content{
    padding:0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  .detail-close{
    position: relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

</style>
