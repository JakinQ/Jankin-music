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
    path: '/concernList',
    name: 'concernList',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/concernList/concernList.vue')
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
    path: '/list',
    name: 'list',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/list/list.vue')
  },
  {
    path: '/singer',
    name: 'singer',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/singer/singer.vue')
  },
  {
    path: '/userDetail',
    name: 'userDetail',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/userDetail/userDetail.vue'),
    childeren: [{
      path: '/video',
      name: 'video',

      component: () => import(/* webpackChunkName: "itemMusic" */ '../views/userDetail/video.vue')
    }]
  },
  {
    path: '/generalUserDetail',
    name: 'generalUserDetail',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/generalUserDetail/generalUserDetail.vue')
  },
  {
    path: '/userAllListenSongs',
    name: 'userAllListenSongs',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/generalUserDetail/userAllListenSongs.vue')
  },
  {
    path: '/videoDetail',
    name: 'videoDetail',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/userDetail/videoDetail.vue')
  },
  {
    path: '/RecommendedDaily',
    name: 'RecommendedDaily',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login')
      }
    },
    component: () => import(/* webpackChunkName: "itemMusic" */ '../components/home/RecommendedDaily/RecommendedDaily.vue')
  },
  {
    path: '/comment',
    name: 'comment',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/Comment/comment.vue')
  },
  {
    path: '/albumDetail',
    name: 'albumDetail',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/userDetail/albumDetail.vue')
  },
  {
    path: '/perFm',
    name: 'perFm',
    // beforeEnter: (to, from, next) => {
    //   if (store.state.isLogin) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // },
    component: () => import(/* webpackChunkName: "itemMusic" */ '../components/home/perFm/perFm.vue')
  },
  {
    path: '/morePlayList',
    name: 'morePlayList',

    component: () => import(/* webpackChunkName: "itemMusic" */ '../components/home/morePlayList/morePlayList.vue')
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
  if (to.path === '/login' || to.path === '/comment' || to.path === '/login2' || to.path === '/loginByQrCode' || to.path === '/perFm') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
