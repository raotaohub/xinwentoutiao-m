import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from "@/store/"
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    /*
    import Login from '@/views/login' 传统写法👇懒加载写法
    const Login = () => import('@/views/login')
    升级路由懒加载 👇 的写法
    */
    component: () => import('@/views/login'),
    // https://router.vuejs.org/zh/guide/advanced/meta.html   requiresAuth 自定义的名字
    meta: { requiresAuth: false }

  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 空着表示默认子路由
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa', // 空着表示默认子路由
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video', // 空着表示默认子路由
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my', // 空着表示默认子路由
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: '/search',
    component: () => import('@/views/search'),

    meta: { requiresAuth: false }
  },
  {
    // 动态路由 : 冒号
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将动态路由的参数 映射到组件的props中
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import("@/views/user-profile"),
    meta: { requiresAuth: false }
  }, {
    path: '/user/chat',
    name: 'userChat',
    component: () => import("@/views/user-chat"),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫 to:要访问的页面路由信息 from:来自哪个页面的路由信息 next:放行的标记

router.beforeEach((to, from, next) => {
  // 如果 路由元信息中 值为true 是我们自己设定的，用来区分不同路由地址是否需要进行某种操作的一种 标识
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }
    // 调用一个 vant 组件的弹出框提示
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录后才可以访问，请问登录吗？'
    }).then(() => {
      // 确认直接过去
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 取消执行 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
      next(false)
    });
  } else {
    // 不需要登录状态的页面 直接过去
    next()
  }
})

export default router
