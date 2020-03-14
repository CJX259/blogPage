import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "about",
        name: "about",
        component: _ => import('../views/About')
      },
      {
        path: "guestbook",
        name: "guestbook",
        component: _ => import("../views/guestbook")
      },
      {
        path: "index",
        name: "index",
        component: _ => import("../views/index")
      },
      {
        path: "blog_detail",
        name: "blog_detail",
        component: _ => import('../views/BlogDetail')
      },
      {
        path: "/sitemap",
        name: "map",
        component: _ => import("../views/SiteMap")
      }
    ]
  },

  {
    path: "/edit_every_day",
    name: "edit_every_day",
    component: _ => import('../views/EditEveryDay')
  },
  {
    path: "/edit_blog",
    name: "edit_blog",
    component: _ => import('../views/EditBlog')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
