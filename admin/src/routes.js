import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import AdminEdit from './components/AdminEdit.vue'
import AdminList from './components/AdminList.vue'
import AdsEdit from './components/AdsEdit.vue'
import AdsList from './components/AdsList.vue'
import CategoryEdit from './components/CategoryEdit.vue'
import CategoryList from './components/CategoryList.vue'
import HeroEdit from './components/HeroEdit.vue'
import HeroList from './components/HeroList.vue'
import ItemEdit from './components/ItemEdit.vue'
import ItemList from './components/ItemList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'maim',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/list', component: HeroList },
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true },
      { path: '/ads/list', component: AdsList },
      { path: '/admin/create', component: AdminEdit },
      { path: '/admin/list', component: AdminList }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
