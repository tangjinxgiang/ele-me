import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from '@/App'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
import A from '@/components/aa/A'
import One from '@/components/bb/One'
import Pe from '@/components/cellphone/Pe'
import User from '@/components/user/User'
import UserProfile from '@/components/user/UserProfile'
import UserPosts from '@/components/user/UserPosts'
import Ch from '@/components/children/Ch'
import Index1 from '@/components/chesi/Index1'
import Count from '@/components/vuex/Count'
// @在webpack.base.conf.js 25行中是设置为src这个文件名字
// from 后面就是路径Hello = '@/components/Hello'
// import Hello from '@/components/Hello.vue'
// .vue可以省略他会自动添加 在webpack.base.conf.js 22行 .js .json都可以不写或者写
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/', // #号后面的路径,路径父组件前面必须加/子组件不需要加
      name: 'App', // 组件名 与变量相同
      component: App, // 变量
      children: [
        {
          path: 'app/:id',
          name: 'Ch',
          component: Ch,
          children: [
            {
              path: 'goods',
              name: 'Goods',
              component: Goods
            },
            {
              path: 'ratings',
              name: 'Ratings',
              component: Ratings
            },
            {
              path: 'seller',
              name: 'Seller',
              component: Seller
            }
          ]
        },
        {
          path: '/a', // #号后面的路径
          name: 'A', // 组件名 与变量相同
          component: A
        },
        {
          path: '/b', // #号后面的路径
          name: 'One', // 组件名 与变量相同
          component: One
        },
        {
          path: '/c', // #号后面的路径
          name: 'Pe', // 组件名 与变量相同
          component: Pe
        },
        {
          path: 'user/:id',
          name: 'User',
          component: User,
          children: [
            {
              path: 'profile',
              component: UserProfile
            }, {
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    },
    {
      path: '/z',
      name: 'Index1',
      component: Index1
    },
    {
      path: '/count',
      name: 'Count',
      component: Count
    }
  ]
})
