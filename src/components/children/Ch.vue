<template> <!--首页的大组件-->
  <div>
    <v-Header :seller="seller"></v-Header>
    <div>
      <div class="tab">
        <div class="tab-item">
          <router-link :to="{name:'Goods', params: {id : 123}}">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link :to="{name:'Ratings', params: {id : 456}}">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link :to="{name:'Seller', params: {id : 789}}">商家</router-link>
        </div>
      </div>
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>



</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import {urlParse} from '@/common/js/util'
  import Header from '@/components/header/Header'
  // import axios from 'axios'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created() {
      /* this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
            this.seller = response.data
        }
      }) */
      axios.get('/api/seller?id=' + this.seller.id)
        .then((response) => {
          response = response.data
          if (response.errno === ERR_OK) {
            this.seller = response.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    components: {
      'v-Header': Header
    }
  }
</script>
<style>
  .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .tab-item{
    flex:1;
    text-align:center;
  }
  .tab-item>a{
    display: block;
    font-size: 14px;
    color:rgb(77, 85, 93)
  }
  .tab-item>a.active{
    color:rgb(240, 20, 20);
  }
</style>
