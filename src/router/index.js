import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Dashboard from "../views/Dashboard.vue";
import Main from "../views/Main.vue";
import Products from "../views/Products.vue";
import Contact from "../views/Contact.vue";
import Checkout from "../views/Checkout.vue";
import WatchMyBot from '../components/WatchMyBot.vue';
import PurchaseHistory from '../components/PurchaseHistory.vue';
import Notifications from '../components/Notifications.vue';
import Settings from '../components/Settings.vue';
import EmergencyShutdown from '../components/EmergencyShutdown.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: 'watchmybot',
          component: WatchMyBot,
        },
        {
          path: 'purchasehistory',
          component: PurchaseHistory,
        },
        {
          path: 'notifications',
          component: Notifications,
        },
        {
          path: 'settings',
          component: Settings,
        },
        {
          path: 'emergencyshutdown',
          component: EmergencyShutdown,
        },
      ],
    },
    {
      path: "/main",
      name: "Main",
      component: Main
    },
    {
      path: "/products",
      name: "Products",
      component: Products
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: Checkout
    },
  ]
});

export default router;
