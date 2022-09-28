import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/itemMusic',
    name: 'ItemMusic',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/itemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/login/Login.vue')
  },
  {
    path: '/loginByQrCode',
    name: 'LoginByQrCode',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/login/loginByQrCode.vue')
  },
  {
    path: '/login2',
    name: 'Login2',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/login/Login2.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login')
      }
    },
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/infoUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// to 要去往的页面 from 从哪跳转  遍历路由，发现是前往登录页面的则修改isFooterMusic
router.beforeEach((to, from) => {
  if (to.path === '/login' || to.path === '/login2' || to.path === '/loginByQrCode') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
