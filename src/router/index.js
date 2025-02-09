import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SearchView from '../views/SearchView';
import SettingsView from '../views/SettingsView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
