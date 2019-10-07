import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login/index'
import Register from '@/components/register/index'
import asyncTest from '@/components/asyncTest'
import upload from '@/components/upload'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
			redirect:'/Login'
    },
		{
			path: '/home',
			name: 'Home',
			component: Home,
			meta: { requiresAuth: true }
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
		},
		{
			path: '/asyncTest',
			name: 'asyncTest',
			component: asyncTest,
		},
		{
			path: '/upload',
			name: 'upload',
			component: upload,
		},
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
		console.log("-----------------------")
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localstorage('get','loggedIn')) {
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router;