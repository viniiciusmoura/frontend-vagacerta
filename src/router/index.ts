// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: Home,
      },
    ],
  },
  {
    path: '/register',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Register.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Login.vue'),
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'vagas',
        name: 'Vagas',
        component: () => import('@/views/Vagas.vue'),
      },
      {
        path: 'empresas',
        name: 'Empresas',
        component: () => import('@/views/Empresas.vue'),
      },
      {
        path: 'candidato',
        name: 'Candidato',
        component: () => import('@/views/Candidato.vue'),
      },
      {
        path: 'configuracao-empresa',
        name: 'configuracao-empresa',
        component: () => import('@/views/Configuracao-empresa.vue'),
      },
      {
        path: 'configuracao-candidato',
        name: 'configuracao-candidato',
        component: () => import('@/views/Configuracao-candidato.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
