import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import AdminEdit from './components/AdminEdit.vue'
import AdminList from './components/AdminList.vue'
import AdsEdit from './components/AdsEdit.vue'
import AdsList from './components/AdsList.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import ArticleList from './components/ArticleList.vue'
import CategoryEdit from './components/CategoryEdit.vue'
import CategoryList from './components/CategoryList.vue'
import HeroEdit from './components/HeroEdit.vue'
import HeroList from './components/HeroList.vue'
import ItemEdit from './components/ItemEdit.vue'
import ItemList from './components/ItemList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },
        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },
        { path: '/heroes/list', component: HeroList },
        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },
        { path: '/ads/create', component: AdsEdit },
        { path: '/ads/edit/:id', component: AdsEdit, props: true },
        { path: '/ads/list', component: AdsList },
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },
        { path: '/adminUsers/create', component: AdminEdit },
        { path: '/adminUsers/edit/:id', component: AdminEdit, props: true },
        { path: '/adminUsers/list', component: AdminList }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
