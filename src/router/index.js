import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SearchView from '../views/SearchView';
import SettingsView from '../views/SettingsView';
import PatientDetail from "@/views/PatientDetail.vue";

const routes = [
  {
    path: '/patient/:patientName', // 动态路由
    name: 'PatientDetail',
    component: PatientDetail,
    props: true, // 将路由参数传递给组件
  },
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
