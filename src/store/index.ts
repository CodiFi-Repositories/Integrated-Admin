import { createStore } from "vuex";
import accessLog from "./accesslog";
import tabs from "./tabs";
import dash from "./dashboard";
import settings from "./settings";
import cMaster from "./contractMaster";
import notify from "./pushNotification";
import user from "./userDetails";
import vendor from "./vendors";
import version from "./version";
import auth from "./ssoLogin";
import reports from "./reports";
import tradecall from "./tradecalls.js";
import fileupload from "./fileUpload.ts";
import holdingControls from "./holdingControls.ts";
import { NullUndefined } from "../_helpers/nullUndefinedCheck.js";
import router from "../router/index.js";
import thematicBasket from "./thematicBasket.ts";
import amoControls from "./amoControls";
const store = createStore({
  state: {
    buildDate: "11_02_2025_13_40",
    activePageTab: 0,
    vendor_code: "bFjXyEeYdIiihXY",
    userId: "",
    sessionId: "",
    counter: 0,
    logoutCondition: false,
    notification: [],
    isNotify: false,
    defaultQueries: {
      dashboard: {
        query: { tab: 0 },
      },
      userInfo: {
        query: { tab: 0 },
      },
      logs: {
        query: { tab: 0 },
      },
      notify: {
        query: { tab: 0 },
      },
      contracts: {
        query: { tab: 0 },
      },
      report: {
        query: { tab: 0, sTab1: 0 },
      },
      vendors: {
        query: { tab: 0 },
      },
      settings: {
        query: { tab: 0 },
      },
    },
    queries: {
      dashboard: {
        query: { tab: 0 },
      },
      userInfo: {
        query: { tab: 0 },
      },
      logs: {
        query: { tab: 0 },
      },
      notify: {
        query: { tab: 0 },
      },
      contracts: {
        query: { tab: 0 },
      },
      report: {
        query: { tab: 0, sTab1: 0 },
      },
      vendors: {
        query: { tab: 0 },
      },
      settings: {
        query: { tab: 0 },
      },
    },
    localItems: [
      "IntegratedAdminTabQuries",
      "IntegratedClientId",
      "IntegratedSessionId",
      "currentEditData",
      "researchcallEditData",
      "tradeCallJson",
    ],
    openMenu: false,
    snackbar: {
      show: false,
      msg: "",
      color: "",
      timeout: 2000,
    },
  },
  modules: {
    reports,
    accessLog,
    tabs,
    dash,
    settings,
    cMaster,
    notify,
    user,
    vendor,
    version,
    auth,
    tradecall,
    fileupload,
    holdingControls,
    thematicBasket,
    amoControls
  },

  mutations: {
    SET_SNAKBAR(state, payload) {
      state.snackbar.msg = payload.msg;
      state.snackbar.show = payload.show;
      state.snackbar.color = payload.color;
      state.snackbar.timeout = payload.timeout;
    },
    setActivePageTab(state: any, payload: any) {
      state.activePageTab = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setLogoutCondition(state: any, payload: any) {
      state.logoutCondition = payload;
    },
    setSessionId(state, payload) {
      state.sessionId = payload;
    },
    setCounter(state: any, payload: any) {
      state.counter = payload;
    },
    setNotification(state: any, payload: any) {
      if (NullUndefined(payload)) {
        state.notification.push(payload);
        state.isNotify = true;
      } else {
        state.notification = [];
      }
    },
    setIsNotify(state: any, payload: any) {
      state.isNotify = payload;
    },
    setQuries(state: any, payload: any) {
      let tempQuries: any = state.queries;
      let path = router.currentRoute.value.path.toString().replace("/", "");

      if (payload.action == "intial") {
        tempQuries = payload.data;
      } else {
        if (path && tempQuries[path]) {
          payload.data.hasOwnProperty("tab")
            ? (tempQuries[path].query.tab = payload.data.tab)
            : "";
          payload.data.hasOwnProperty("sTab1")
            ? (tempQuries[path].query.sTab1 = payload.data.sTab1)
            : "";
        }
      }
      state.queries = tempQuries;
      localStorage.setItem("IntegratedAdminTabQuries", JSON.stringify(tempQuries));
    },
    setOpenMenu(state: any, payload: any) {
      state.openMenu = payload;
    },
  },
  getters: {
    getUserId: (state) => state.userId,
    getSessionId: (state) => state.sessionId,
    getNotification: (state) => state.notification,
    getDefaultQuries: (state: any) => state.defaultQueries,
    getSnackbar: (state) => {
      return state.snackbar;
    },
  },
});
export default store;
