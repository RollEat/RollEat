import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import( /* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },
  {
    path: '/sandbox/firebase',
    name: 'Firebase-Sandbox',
    component: () => import(/* webpackChunkName: "firebase" */ '../views/sandbox/Firebase.vue')
  },
  {
    path: '/pay',
    name: 'Paiement',
    component: () => import(/* webpackChunkName: "firebase" */ '../views/Paiement.vue')
  },
  {
    path: '/history',
    name: 'Historique',
    component: () => import( /* webpackChunkName: "firebase" */ '../views/History.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
