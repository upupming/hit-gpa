import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// global before guards, see
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const user = localStorage.getItem('user')
  console.log(`user from local storage: ${user}`)

  // console.log(`to: ${JSON.stringify(to)}`)

  if (!user && to.name !== 'login') {
    console.log(`redirecting to login page`)
    return next('/login')
  }

  next()
})
