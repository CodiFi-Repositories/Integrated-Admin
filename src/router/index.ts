import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store"
//   components

const login = () =>
  import(/* webpackChunkName: "login" */ "../views/login/login.vue");

const logs = () => import(/* webpackChunkName: "logs" */ "../views/logs.vue");

const main = () => import(/* webpackChunkName: "main" */ "../views/main.vue");

const reports = () =>
  import(/* webpackChunkName: "logs" */ "../views/Reports/reports.vue");

const userInfo = () =>
  import(/* webpackChunkName: "userInfo" */ "../views/user-info/userInfo.vue");

const vendors = () =>
  import(/* webpackChunkName: "vendors" */ "../views/vendor/vendor.vue");

const contracts = () =>
  import(/* webpackChunkName: "vendors" */ "../views/contracts/contracts.vue");

const settings = () =>
  import(/* webpackChunkName: "vendors" */ "../views/settings/settings.vue");

const fileUpload = () =>
  import(
    /* webpackChunkName: "fileUpload" */ "../views/files_upload/file_upload.vue"
  );

const dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "../views/dashboard/dashboard.vue"
  );

const notify = () =>
  import(/* webpackChunkName: "dashboard" */ "../views/notify/notify.vue");

const addOrEditUser = () =>
  import(
    /* webpackChunkName: "addOrEditUser" */ "../views/user-info/addOrEditUser.vue"
  );
  const research = () =>
    import(/* webpackChunkName: "vendors" */ "../views/Research/researchcall.vue");
  
const addHolidays = () => import("../views/settings/add-holidays.vue");

const content = () => import("../views/content/content.vue");
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "", name: "login", component: login },
    {
      path: "/layout",
      name: "main",
      component: main,
      children: [
        { path: "/dashboard", name: "dashboard", component: dashboard },
        { path: "/logs", name: "logs", component: logs },
        { path: "/report", name: "report", component: reports },
        { path: "/userInfo", name: "user Info", component: userInfo },
        { path: "/research", name: "research", component: research },
        { path: "/vendors", name: "vendors", component: vendors },
        { path: "/contracts", name: "contracts", component: contracts },
        { path: "/settings", name: "settings", component: settings },
        { path: "/fileupload", name: "fileupload", component: fileUpload },
        { path: "/notify", name: "notify", component: notify },
        {
          path: "/addOrEditUser",
          name: "addOrEditUser",
          component: addOrEditUser,
        },
        { path: "/addholiday", name: "addholiday", component: addHolidays },
        { path: "/content", name: "content", component: content },
      ],
    },
  ],
});
export default router;
router.beforeEach(async (to, from, next) => {
  let quries =
    localStorage.getItem("IntegratedAdminTabQuries") &&
      localStorage.getItem("IntegratedAdminTabQuries") != "undefined"
      ? JSON.parse(localStorage.getItem("IntegratedAdminTabQuries")!)
      : store.state.defaultQueries;
  store.commit("setQuries", { data: quries, action: "intial" });
  let isTradeCallModify = localStorage.getItem("isTradeCallModify")
  if(isTradeCallModify) {
    store.commit("tradecall/seteditaddtrade", isTradeCallModify)
  }
  let isValidSession =
    localStorage.getItem("IntegratedClientId") &&
      localStorage.getItem("IntegratedClientId") != "undefined"
      ? true
      : false;
 isValidSession ? store.commit("setUserId", "admin") : ''
  if (
    isValidSession &&
    from.path == "/" &&
    to.path == "/" &&
    to.query.logout != "true"
  ) {
    next({ path: "research" });
  }
   else if (!isValidSession && to.path != "/") {
    next({ path: "" });
  } 
  else {
    next();
  }
});
