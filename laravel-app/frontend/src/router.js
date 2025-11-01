import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";
import DefaultLayout from './components/DefaultLayout.vue';
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Products from "./pages/Products.vue";
import NotFound from "./pages/NotFound.vue";
import Create from "./pages/products/Create.vue";
import Edit from "./pages/products/Edit.vue";
import { useUserStore } from './store/user.js';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home, meta: { requiresAuth: true } },
      { path: 'products', name: 'Products', component: Products, meta: { requiresAuth: true } },
      { path: 'product/create', name: 'Create', component: Create, meta: { requiresAuth: true } },
      { path: 'product/edit/:id', name: 'Edit', component: Edit, props: true, meta: { requiresAuth: true }},
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const auth = useUserStore();

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.token) {
    // user not logged in
    return next({ name: 'Login' });
  }

  // prevent logged-in users from going back to login/register
  if ((to.name === 'Login' || to.name === 'Register') && auth.token) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
