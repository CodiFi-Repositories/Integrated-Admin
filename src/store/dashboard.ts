import { httpService } from "../services/httpservices";
import commonFunc from "../mixins/commonFunc.js";
import errHandle from "../handleError/errorHandling.ts";

const state = {
  userDets: ["A"],
  abc: "ghj",
  snackbar: {
    msg: "",
    show: false,
    color: "",
    timeout: 0,
  },
  userDetsWitoutWeekends: [],
  topViewedPages: [],
  visitorsPerDay: [],
  topviewsLoader: false,
  tab: [
    {
      type: "Unique Active Users",
      count: "0",
      active: true,
      source: "UniqueUser",
    },
    { type: "Web Login", count: "0", active: false, source: "web" },
    { type: "Mobile Login", count: "0", active: false, source: "mob" },
    { type: "API Login", count: "0", active: false, source: "api" },
    {
      type: "User / Order Count",
      count: "0",
      active: false,
      source: "orderCount",
    },
  ],
  totalCount: 0,
  userLoginDetails: [],
  last12hrActiveUsersCount: null,
  activeUserLoginCondition: false,
  userLoginDetailsWithoutWeekends: [],
  topVisitorsLoading: false,
  userChartLogs: false,
  // chart objects

  USERLOGSCHARTDATA: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#c7cfd9",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      data: ["Mobile", "Web", "API", "Total"],
      bottom: 10,
      textStyle: {
        color: "#6e6e6e",
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: 60,
      containLabel: true,
    },
    toolbox: {
      feature: {
        magicType: {
          show: true,
          title: "",
          type: ["line", "bar", "pie"],
        },
        restore: {
          show: false,
        },
        saveAsImage: {
          show: true,
          title: "Save",
        },
        right: "16px",
      },
    },
    xAxis: {
      type: "category",
      data: [],
      boundaryGap: false,
    },
    yAxis: [
      {
        type: "value",
        name: "Unique users",
        nameLocation: "middle",
        nameGap: 40,
      },
    ],
    series: [
      {
        name: "Mobile",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "Web",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "API",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "Total",
        data: [],
        type: "line",
        smooth: true,
      },
    ],
  },
  DASHBOARD_USERLOGS_CHARTDATA: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#c7cfd9",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      data: ["Mobile", "Web", "API", "Total"],
      bottom: 10,
      textStyle: {
        color: "#6e6e6e",
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: 60,
      containLabel: true,
    },
    toolbox: {
      feature: {
        magicType: {
          show: true,
          title: "",
          type: ["line", "bar", "pie"],
        },
        restore: {
          show: false,
        },
        saveAsImage: {
          show: true,
          title: "Save",
        },
        right: "16px",
      },
    },
    xAxis: {
      type: "category",
      data: [],
      boundaryGap: false,
    },
    yAxis: [
      {
        type: "value",
        name: "Unique users",
        nameLocation: "middle",
        nameGap: 40,
      },
    ],
    series: [
      {
        name: "Mobile",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "Web",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "API",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "Total",
        data: [],
        type: "line",
        smooth: true,
      },
    ],
  },
  TOTALUSERLOGSCHARTDATA: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#c7cfd9",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      data: ["Mobile", "Web", "API"],
      bottom: 10,
      textStyle: {
        color: "#6e6e6e",
      },
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: 60,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [],
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      name: "Total users",
      nameLocation: "middle",
      nameGap: 50,
    },
    series: [
      {
        name: "Mobile",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "Web",
        data: [],
        type: "line",
        smooth: true,
      },
      {
        name: "API",
        data: [],
        type: "line",
        smooth: true,
      },
    ],
  },
  //
  DEVICE_TYPE_CHARTDATA: {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "#c7cfd9",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      orient: "horizontal",
      left: "left",
      padding: [4, 20],
      data: ["Web", "Mobile", "API"],
    },
    series: [
      {
        name: "Active Users",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "57%"],
        data: [
          {
            value: 0,
            name: "Web",
          },
          {
            value: 0,
            name: "Mobile",
          },
          {
            value: 0,
            name: "API",
          },
        ],
      },
    ],
  },
  userRecordDetails: [],
  userLogCount: [],
  loader: false,
  activepagetab: "UniqueUser",
  orderLogs: "",
  orderLogsDetails: [],
};
const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setUserCountDetails(state: any, payload: any) {
    state.userCountDetails = payload;
  },
  setTopViewedPages(state: any, payload: any) {
    state.topViewedPages = payload;
  },

  setVisitorsPerDay(state: any, payload: any) {
    state.visitorsPerDay = payload;
  },
  setVisitorsPerDayLoader(state: any, payload: any) {
    state.VisitorsPerDayloader = payload;
  },
  setActiveTab(state: any, index: any) {
    for (let item = 0; item < state.tab.length; item++) {
      if (item != index) {
        state.tab[item].active = false;
      } else {
        state.tab[item].active = true;
        state.activepagetab = state.tab[item].source.toString();
      }
    }
  },

  setTopviewsLoader(state: any, payload: any) {
    state.topviewsLoader = payload;
  },
  setUserRecordData(state: any, payload: any) {
    state.userRecordDetails = payload;
  },
  activeUserLoginCondition(state: any, payload: any) {
    state.activeUserLoginCondition = payload;
  },

  setUserCount(state: any, payload: any) {
    state.totalCount = payload.totalCount;
    state.tab.forEach((el: any) => {
      if (el.type == "Unique Active Users") {
        el.count = payload.totalCount ? `${payload.totalCount}` : "0";
      }
      if (el.type == "Web Login") {
        el.count = payload.web ? `${payload.web}` : "0";
      }
      if (el.type == "Mobile Login") {
        el.count = payload.mob ? `${payload.mob}` : "0";
      }
      if (el.type == "API Login") {
        el.count = payload.api ? `${payload.api}` : "0";
      }
    });
  },
  SET_USER_COUNT(state: any, payload: any) {
    state.userLogCount = payload;
    if (payload) {
      state.DEVICE_TYPE_CHARTDATA.series[0].data[0].value = Number(
        payload[0].web
      );
      state.DEVICE_TYPE_CHARTDATA.series[0].data[1].value = Number(
        payload[0].mob
      );
      state.DEVICE_TYPE_CHARTDATA.series[0].data[2].value = Number(
        payload[0].api
      );
    }
  },
  SUM: (state: any) => {
    return state.web + state.mob + state.api;
  },
  SET_WEB_USER_COUNT(state: any, payload: any) {
    state.web = payload;
    state.DEVICE_TYPE_CHARTDATA.series[0].data[0].value = payload;
  },
  SET_MOBILE_USER_COUNT(state: any, payload: any) {
    state.mob = payload;
    state.DEVICE_TYPE_CHARTDATA.series[0].data[1].value = payload;
  },
  SET_API_USER_COUNT(state: any, payload: any) {
    state.api = payload;
    state.DEVICE_TYPE_CHARTDATA.series[0].data[2].value = payload;
  },
  SET_TOP_VISITORS_LOADING(state: any, payload: any) {
    state.topVisitorsLoading = payload;
  },

  setTotalUserCount(state: any, payload: any) {
    state.totalCount = payload;
  },

  // SET_SNAKBAR({ state }: any, payload: any) {
  //   state.snackbar.msg = payload.msg;
  //   state.snackbar.show = payload.show;
  //   state.snackbar.color = payload.color;
  //   state.snackbar.timeout = payload.timeout;
  // },

  //charts

  //   SET_LAST12HR_ACTIVE_USERS_COUNT({state,commit}: any, payload: any) {
  //     state.last12hrActiveUsersCount = payload
  //     if (payload.length === 0) {
  //         state.ACTIVE_USER_LOGS_CHARTDATA.title.show = true
  //         state.ACTIVE_USER_LOGS_CHARTDATA.legend.show = false
  //         state.ACTIVE_USER_LOGS_CHARTDATA.toolbox.show = false
  //     } else {
  //         state.ACTIVE_USER_LOGS_CHARTDATA.title.show = false
  //         state.ACTIVE_USER_LOGS_CHARTDATA.legend.show = true
  //         state.ACTIVE_USER_LOGS_CHARTDATA.toolbox.show = true
  //     }
  //     this.commit('logs/SET_ACTIVE_USERS_CHART_DATA', payload)
  // },
  setUserChartLogs(state: any, payload: any) {
    state.userChartLogs = payload;
  },

  SET_USERLOGINDETAILS({ state, commit }: any, payload: any) {
    state.userLoginDetails = payload;
    state.userLoginDetailsWithoutWeekends = [];

    var is_weekend = function (date1: any) {
      var dt = new Date(date1);
      if (dt.getDay() == 6 || dt.getDay() == 0) {
        return "weekend";
      } else {
        return "day";
      }
    };
    payload.forEach((el: any) => {
      if (is_weekend(el.date) == "day")
        state.userLoginDetailsWithoutWeekends.push(el);
    });

    commit("dash/SET_USERLOGSCHARTDATA", state.userLoginDetailsWithoutWeekends);
    commit("dash/SET_DASHBOARD_USERLOGS_CHARTDATA", state.userLoginDetails);
  },

  SET_USERLOGSCHARTDATA(state: any, payload: any) {
    // Unique users
    state.USERLOGSCHARTDATA.xAxis.data = [];
    state.USERLOGSCHARTDATA.series[0].data = [];
    state.USERLOGSCHARTDATA.series[1].data = [];
    state.USERLOGSCHARTDATA.series[2].data = [];
    state.USERLOGSCHARTDATA.series[3].data = [];
    // total users
    state.TOTALUSERLOGSCHARTDATA.xAxis.data = [];
    state.TOTALUSERLOGSCHARTDATA.series[0].data = [];
    state.TOTALUSERLOGSCHARTDATA.series[1].data = [];
    state.TOTALUSERLOGSCHARTDATA.series[2].data = [];

    payload.forEach((element: any) => {
      state.USERLOGSCHARTDATA.xAxis.data.push(element.date);

      state.USERLOGSCHARTDATA.series[0].data.push(
        element.uniqueMob ? element.uniqueMob : "0"
      );
      state.USERLOGSCHARTDATA.series[1].data.push(
        element.uniqueWeb ? element.uniqueWeb : "0"
      );
      state.USERLOGSCHARTDATA.series[2].data.push(
        element.uniqueApi ? element.uniqueApi : "0"
      );
      state.USERLOGSCHARTDATA.series[3].data.push(
        Number(element.uniqueMob) +
          Number(element.uniqueWeb) +
          Number(element.uniqueApi)
      );
      // total users
      state.TOTALUSERLOGSCHARTDATA.xAxis.data.push(element.date);

      state.TOTALUSERLOGSCHARTDATA.series[0].data.push(
        element.totalMobile ? element.totalMobile : "0"
      );
      state.TOTALUSERLOGSCHARTDATA.series[1].data.push(
        element.totalWeb ? element.totalWeb : "0"
      );
      state.TOTALUSERLOGSCHARTDATA.series[2].data.push(
        element.totalApi ? element.totalApi : "0"
      );
    });
    state.TOTALUSERLOGSCHARTDATA.xAxis.data.reverse();
    state.TOTALUSERLOGSCHARTDATA.series[0].data.reverse();
    state.TOTALUSERLOGSCHARTDATA.series[1].data.reverse();
    state.TOTALUSERLOGSCHARTDATA.series[2].data.reverse();
    state.USERLOGSCHARTDATA.xAxis.data.reverse();
    state.USERLOGSCHARTDATA.series[0].data.reverse();
    state.USERLOGSCHARTDATA.series[1].data.reverse();
    state.USERLOGSCHARTDATA.series[2].data.reverse();
    state.USERLOGSCHARTDATA.series[3].data.reverse();
  },

  SET_DASHBOARD_USERLOGS_CHARTDATA(state: any, payload: any) {
    state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data = [];
    state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data = [];
    state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data = [];
    state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data = [];
    state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data = [];

    payload.forEach((element: any) => {
      state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data.push(
        commonFunc.methods.getDateString(new Date(element.date), "d-M-y")
      );

      state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data.push(
        element.uniqueMobile
      );
      state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data.push(element.uniqueWeb);
      state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data.push(element.uniqueApi);
      state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data.push(
        element.totalMobile
      );
    });
    state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data.reverse();
    state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data.reverse();
    state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data.reverse();
    state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data.reverse();
    state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data.reverse();
  },
  setOrderLogs(state: any, payload: any) {
    state.orderLogs = payload;
    state.orderLogsDetails = payload.orderDetails;
    state.tab[4].count =
      payload && payload != ""
        ? `${payload.totalUserCount} / ${payload.totalOrderCount}`
        : "0 / 0";
  },
};

const actions = {
  async getUserCountDetails({ commit }: any) {
    commit("SET_TOP_VISITORS_LOADING", true);
    commit("setLoader", true);

    httpService
      .getUserCountDetails()
      .then(
        async (response) => {
          if (
            response.status == 200 &&
            response.data.status.toString().trim() == "Ok" &&
            response.data.message.toString().trim() != "No Records Found"
          ) {
            commit("setUserCountDetails", response.data.result.reverse());
            if (response.data.result[0] != "No Records Found") {
              commit("SET_USER_COUNT", response.data.result);
            } else {
              commit("SET_USER_COUNT", []);
            }
          } else {
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("SET_TOP_VISITORS_LOADING", false);
        commit("setLoader", false);
      });
  },

  async getTopViewedPages({ commit }: any) {
    commit("setTopviewsLoader", true);
    await httpService
      .getTopViewedPage()
      .then(
        (response) => {
          if (response.data.result?.length > 0) {
            if (response.data.message.toString().trim() != "No Records Found") {
              commit("setTopViewedPages", response.data.result);
            } else {
              commit("setTopViewedPages", []);
            }
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setTopviewsLoader", false);
      });
  },
  //
  //
  async getUserRecordData({ commit }: any, payload: any) {
    commit("setLoader", true);
    commit("setUserRecordData", []);
    await httpService
      .getUserRecordData(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.status == "Ok" &&
            response.data.result
          ) {
            if (response.data.result.toString().trim() == "No Records Found") {
            } else {
              response.data.result.forEach(function (item: any) {
                if (payload == "UniqueUser") {
                  delete item.createdOn;
                  delete item.deviceType;
                  item.source = "Unique";
                }
                if (payload == "web" || payload == "api") {
                  item["Time"] = item["createdOn"];
                  delete item.createdOn;
                  delete item.deviceType;
                }
                if (payload == "mob") {
                  item["Time"] = item["createdOn"];
                  delete item.createdOn;
                }
              });
              commit("setUserRecordData", response.data.result);
            }
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
        // commit("setTopviewsLoader", false);
      });
  },

  async getVisitorsPerDay({ commit }: any) {
    commit("setLoader", true);
    // commit("setVisitorsPerDayLoader", true);
    await httpService
      .getVisitorsPerDay()
      .then(
        (response) => {
          if (response.data) {
            commit("setVisitorsPerDay", response.data.result);
            // commit('setUserChartLogs', true);
            if (
              response.data.result[0].toString().trim() != "No Records Found"
            ) {
              commit("SET_USERLOGSCHARTDATA", response.data.result);
              commit("setUserChartLogs", true);
            } else {
              commit("SET_USERLOGSCHARTDATA", []);
            }
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        // commit("setVisitorsPerDayLoader", false);
        commit("setLoader", false);
      });
  },

  async getSeperateUserCount({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getUserCount()
      .then(
        (response) => {
          if (
            response.data?.message.toString().trim() == "Success" &&
            response.data?.result.length &&
            response.status == 200
          ) {
            commit("setUserCount", response.data?.result[0]);
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getOrderLogs({ commit }: any) {
    commit("setLoader", true);
    let orderLogs: any = "";
    await httpService
      .getOrderLogs()
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            orderLogs = res.data.result[0];
          } else {
            orderLogs = "";
          }
          commit("setOrderLogs", orderLogs);
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
  getLoader: (state: any) => state.loader,
  getUserChartLogs: (state: any) => state.userChartLogs,
  getTopViewedPagess: (state: any) => state.topViewedPages,
  getTopviewsLoader: (state: any) => state.topviewsLoader,
  getVisitorsPerDay: (state: any) => state.visitorsPerDay,
  getUserTabs: (state: any) => state.tab,
  getTotalCount: (state: any) => state.totalCount,
  //charts
  getUserLogCount: (state: any) => state.userLogCount,
  GETUSERLOGSCHARTDATA: (state: any) => {
    return state.USERLOGSCHARTDATA;
  },
  getDeviceTypeChartData: (state: any) => {
    return state.DEVICE_TYPE_CHARTDATA;
  },
  GET_DASHBOARD_USERLOGS_CHARTDATA: (state: any) => {
    return state.DASHBOARD_USERLOGS_CHARTDATA;
  },
  GETTOTALUSERLOGSCHARTDATA: (state: any) => {
    return state.TOTALUSERLOGSCHARTDATA;
  },
  getUserLoginDetailsWithoutWeekends: (state: any) => {
    return state.userLoginDetailsWithoutWeekends;
  },
  getUserLogDetails: (state: any) => {
    return state.userLoginDetails;
  },
  getLast12hrActiveUsersCount: (state: any) => {
    return state.last12hrActiveUsersCount;
  },
  getUserRecordData: (state: any) => {
    return state.userRecordDetails;
  },
  activeUserLoginCondition: (state: any) => {
    return state.activeUserLoginCondition;
  },
  getUserCountDetails: (state: any) => {
    return state.userCountDetails;
  },
  getTopVisitorsLoading: (state: any) => {
    return state.topVisitorsLoading;
  },
};
const dash = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default dash;
