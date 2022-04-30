import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    redirect: "/1",
    children: [
      {
        path: "/1",
        component: () => import("../views/1_iframe/index.vue")
      },
      {
        path: "/2",
        component: () => import("../views/2_template/index.vue")
      },
      {
        path: "/3",
        component: () => import("../views/3_sfc/index.vue")
      },
      {
        path: "/4",
        component: () => import("../views/4_sfc/index.vue")
      }
    ]
  },
  {
    path: "/1_inner",
    component: () => import("../views/1_iframe/iframe.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
