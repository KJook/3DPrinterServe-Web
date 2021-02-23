// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),
      // Pages
      route('Order', null, 'order', { requireLogin: true }),

      // Components
      route('Notifications', null, 'components/notifications', { requireLogin: false }),
      route('Icons', null, 'components/icons', { requireLogin: true }),
      route('Typography', null, 'components/typography', { requireLogin: true }),

      // Tables
      route('Profile', null, 'profile', { requireLogin: true }),

      // Maps
      route('Google Maps', null, 'maps/google'),
      // Login
      route('Login', null, 'login', { requireLogin: false }),
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    if (!localStorage.getItem('token')) {
      next({ path: '/login/' })
    }
  }
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
