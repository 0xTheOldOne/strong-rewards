import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Strong rewards calculator",
      component: Home,
    },
    {
      path: "/about",
      name: "About the app",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ "../views/About.vue");
      },
    },
    {
      path: "/author",
      name: "About the author",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ "../views/Author.vue");
      },
    },
  ],
});

export default router;
