import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home.vue";


const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import( "../components/signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import( "../components/login.vue"),
    },
    {
      path: "/mainPage",
      name: "mainPage",
      component: () =>
        import( "../components/mainPage.vue"),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/profil",
      name: "profil",
      component: () =>
        import( "../components/profil.vue"),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/commentCard/:id",
      name: "commentCard",
      component: () =>
        import("../components/commentCard.vue"),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;