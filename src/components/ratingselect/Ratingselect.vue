<template><!--商品评价组件-->
 <div class="ratingselect">
   <div class="rating-type">
     <span @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
     <span @click="select(0, $event)"  class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
     <span @click="select(1, $event)"  class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negetives.length}}</span></span>
   </div>
   <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
     <i class="iconfont icon-gou1"></i>
     <span class="text">只看有内容的评价</span>
   </div>
 </div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 0

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      initSelectType: {
        type: Number,
        default: ALL
      },
      initOnlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        selectType: this.initSelectType,
        onlyContent: this.initOnlyContent
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negetives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
         this.selectType = type

         this.$emit('ratingtype.select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
        this.$emit('content.toggle', this.onlyContent)
      }
    }
  }
</script>
<style>
  .ratingselect .rating-type{
    padding:18px 0;
    margin:0 18px;
    border-bottom: 1px solid #e6e7e8;
    font-size: 0;
  }
  .ratingselect .rating-type .block,.ratingselect .rating-type .block.positive{
    display: inline-block;
    padding:8px 12px;
    margin-right:8px;
    border-radius: 1px;
    line-height: 16px;
    font-size: 12px;
    colro:rgb(77,85,93);
  }
  .ratingselect .rating-type .block.active{
    color:#fff;
  }
  .ratingselect .rating-type .block .count{
    font-size: 8px;
    margin-left: 2px;

  }
  .ratingselect .rating-type .block.positive{
    background: rgba(0,160,220,0.2);
  }
  .ratingselect .rating-type .block.positive.active{
    background: rgb(0,160,220);
  }
  .ratingselect .rating-type .block.negative{
    background: rgba(77,85,93,0.2);
  }
  .ratingselect .rating-type .block.negative.active{
    background: rgb(77,85,93);
  }
  .switch{
    padding:12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color:rgb(147,153,159);
    font-size: 0;
  }
  .switch.on .icon-gou1{
    color:#00c850;
  }
  .switch .icon-gou1{
    font-size: 24px;
    margin-right:4px;
    display: inline-block;
    vertical-align: top;
  }
  .switch .text{
    font-size: 12px;
  }
</style>
