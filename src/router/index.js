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
        component: () => import('../views/About')
      },
      {
        path: "guestbook",
        name: "guestbook",
        component: () => import("../views/guestbook")
      },
      {
        path: "blog_detail",
        name: "blog_detail",
        component: () => import('../views/BlogDetail')
      },
      {
        path: "/sitemap",
        name: "map",
        component: () => import("../views/SiteMap")
      },
      {
        path: "index",
        name: "index",
        component: () => import("../views/index")
      }
    ]
  },

  {
    path: "/edit_every_day",
    name: "edit_every_day",
    component: () => import('../views/EditEveryDay')
  },
  {
    path: "/edit_blog",
    name: "edit_blog",
    component: () => import('../views/EditBlog')
  },
  {
    path : "*",
    name : "error",
    component : ()=>import('../views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
