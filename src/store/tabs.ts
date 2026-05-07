const state = {
  logsTabs: [
    { name: "Accesslog", id: 0, active: true },
    // { name: "Mail Logs", id: 1, active: true },
    // { name: "Sms Logs", id: 2, active: true },
    // { name: "MF Logs", id: 3, active: true },
    // { name: "IPO Logs", id: 4, active: true },
  ],
  reportTabs: [
    // { name: "Payout", id: 0, active: false },
    { name: "Market watch", id: 0, active: false },
    // { name: "Bank Details", id: 1, active: false },
    // { name: "User Feedback", id: 3, active: false },
    { name: "SIP", id: 2, active: false },
    // { name: "Loan Details", id: 5, active: false },
    { name: "Order Count", id: 3, active: false },
    //  { name: "SIP Dashboard", id: 2, active: false },
    // { name: "File Upload Details", id: 4, active: false },
    // { name: "Position Average Details", id: 5, active: false },
    // { name: "Payment Logs", id: 6, active: false },
  ],
  vendorTabs: [{ name: "Vendor Authorization", id: 0, active: true }],
  contractTabs: [
    { name: "Contract Master", id: 0, active: true },
    { name: "Add New Scrip", id: 1, active: false },
    { name: "Newly Added Symbols", id: 2, active: false },
    { name: "Deactivated Symbols", id: 3, active: false },
    { name: "Duplicate Symbols", id: 4, active: false },
  ],
  settingsTabs: [
    {name: 'AMO Controls', id: 0, active: true}
    // { name: "Version", id: 0, active: true },
    // { name: "Cache", id: 1, active: false },
    // { name: "Product", id: 2, active: false },
    // {name: 'Holding Controls', id: 3, active: false},
    // { name: "Trading Session", id: 3, active: false }
  ],
  dashboardTabs: [
    { name: "User Status", id: 0, active: true },
    { name: "Active User Details", id: 1, active: false },
  ],
  notifyTabs: [
    { name: "Admin Message", id: 0, active: true },
    // { name: "Trade Calls", id: 1, active: true }
  ],
  fileUploadTabs: [
    { name: "Positions Upload", id: 0, active: true },
    // { name: "Holdings Upload", id: 1, active: false },
  ],
  userInfoTabs: [
    { name: "User Details", id: 0, active: true },
    // { name: "Block Users", id: 1, active: false },
    // { name: "Unblock Users", id: 2, active: false }
  ],
  marketWatchDataTabs: [
    { name: "Tab 1", id: 0, active: true },
    { name: "Tab 2", id: 1, active: false },
    { name: "Tab 3", id: 2, active: false },
    { name: "Tab 4", id: 3, active: false },
  ],
  ResearchcallTabs: [{ name: "Trade calls", id: 0, active: true }, {name: 'Theme Basket', id:1, active: false}],
};
const mutations = {};
const actions = {
  async setActiveTab({ state }: any, payload: any) {
    let data = [];
    if (payload.path == "/logs") {
      data = state.logsTabs;
    } else if (payload.path == "/report") {
      data = state.reportTabs;
    } else if (payload.path == "/vendors") {
      data = state.vendorTabs;
    } else if (payload.path == "/contracts") {
      data = state.contractTabs;
    } else if (payload.path == "/settings") {
      data = state.settingsTabs;
    } else if (payload.path == "/research") {
      data = state.ResearchcallTabs;
    } else if (payload.path == "/dashboard") {
      data = state.dashboardTabs;
    } else if (payload.path == "/notify") {
      data = state.notifyTabs;
    } else if (payload.path == "/fileupload") {
      data = state.fileUploadTabs;
    } else if (payload.path == "/userInfo") {
      data = state.userInfoTabs;
    } else if (payload.path == "/userInfo") {
      data = state.userInfoTabs;
    }

    if (data) {
      data.forEach((el: any) => {
        if (el.id == payload.id) {
          el.active = true;
        } else {
          el.active = false;
        }
      });
    }

    if (payload.path == "/logs") {
      state.logsTabs = data;
    } else if (payload.path == "/report") {
      state.reportTabs = data;
    } else if (payload.path == "/vendors") {
      state.vendorTabs = data;
    } else if (payload.path == "/contracts") {
      state.contractTabs = data;
    } else if (payload.path == "/settings") {
      state.settingsTabs = data;
    } else if (payload.path == "/research") {
      state.ResearchcallTabs;
    } else if (payload.path == "/dashboard") {
      state.dashboardTabs = data;
    } else if (payload.path == "/notify") {
      state.notifyTabs = data;
    } else if (payload.path == "/fileUpload") {
      state.fileUploadTabs = data;
    } else if (payload.path == "/userInfo") {
      state.userInfoTabs = data;
    }
  },
};

const getters = {
  getLogsTabs: (state: any) => state.logsTabs,
  getReportTabs: (state: any) => state.reportTabs,
  getVendorTabs: (state: any) => state.vendorTabs,
  getContractTabs: (state: any) => state.contractTabs,
  getSettingsTabs: (state: any) => state.settingsTabs,
  getDashboardTabs: (state: any) => state.dashboardTabs,
  getNotifyTabs: (state: any) => state.notifyTabs,
  getFileUploadTabs: (state: any) => state.fileUploadTabs,
  getUserInfoTabs: (state: any) => state.userInfoTabs,
  getMarketWatchDataTabs: (state: any) => state.marketWatchDataTabs,
  getResearchcallTabs: (state: any) => state.ResearchcallTabs,
};

const tabs = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default tabs;
