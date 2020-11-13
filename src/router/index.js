import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 空着表示默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa', // 空着表示默认子路由
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video', // 空着表示默认子路由
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my', // 空着表示默认子路由
        name: 'my',
        component: () => import('@/views/my')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
