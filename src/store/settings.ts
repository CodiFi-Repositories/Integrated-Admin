import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
import errHandle from "../handleError/errorHandling.js";
import router from "../router/index.js";
const { notify } = useNotification();

const state = {
  versionList: [],
  productlist: [],
  versionLoader: false,
  loader: false,
  confirmationdialogue: "",
  holidays: [],
  deleteHolidayDialog: false,
};
const mutations = {
  setVersionList(state: any, payload: any) {
    state.versionList = payload;
  },
  setHolidays(state: any, payload: any) {
    payload.forEach((element: any) => {
      element.date = element.date.split("-").reverse().join("-");
      element.sessions = "";
      let sessions = [];
      Number(element.morningSession) == 1 ? sessions.push("Morning") : "";
      Number(element.eveningSession) == 1 ? sessions.push("Evening") : "";

      sessions.length > 0
        ? (element.sessions = sessions.join(" / "))
        : (element.sessions = "NA");
      element.exchanges = "";
      let exchanges = [];
      Number(element.bcdHoliday) == 1 ? exchanges.push("BCD") : "";
      Number(element.bfoHoliday) == 1 ? exchanges.push("BFO") : "";
      Number(element.cdsHoliday) == 1 ? exchanges.push("CDS") : "";
      Number(element.mcxHoliday) == 1 ? exchanges.push("MCX") : "";
      Number(element.bseHoliday) == 1 ? exchanges.push("BSE") : "";
      Number(element.nseHoliday) == 1 ? exchanges.push("NSE") : "";
      Number(element.nfoHoliday) == 1 ? exchanges.push("NFO") : "";
      exchanges.length > 0
        ? (element.exchanges = exchanges.join(" / "))
        : (element.exchanges = "NA");
    });

    state.holidays = payload;
  },
  setVersionLoader(state: any, payload: any) {
    state.versionLoader = payload;
  },
  setproductlist(state: any, payload: any) {
    state.productlist = payload;
  },
  setloader(state: any, payload: any) {
    state.loader = payload;
  },

  setconfirmationdialogue(state: any, payload: any) {
    state.confirmationdialogue = payload;
  },
  setDeleteHolidayDialog(state: any, payload: any) {
    state.deleteHolidayDialog = payload;
  },
};

const actions = {
  async getVersionList({ commit }: any) {
    commit("setVersionLoader", true);
    await httpService
      .getVersionList()
      .then(
        (response) => {
          if (response.data) {
            commit("setVersionList", response.data);
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setVersionLoader", false);
      });
  },

  async getProductList({ commit }: any) {
    commit("setloader", true);
    await httpService
      .getproductlist()
      .then(
        (response) => {
          if (response.data.result && response.status == 200) {
            commit("setproductlist", response.data.result);
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setloader", false);
      });
  },

  async updateSettingsAction({ dispatch, commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .updateSettingsAction(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Updated Successfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${response.data.message}`,
            });
            dispatch("getProductList");
          }
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", true);
      });
  },
  async getHoliday({ commit }: any) {
    await httpService.getHoliday().then(
      (res: any) => {
        if (
          res.status == 200 &&
          res.data.status == "Ok" &&
          res.data.message == "Success" &&
          res.data.result &&
          res.data.result.length > 0
        ) {
          commit("setHolidays", res.data.result);
        }
      },
      (err: any) => {
        errHandle.methods.errorHandle(err);
      }
    );
  },
  async addHoliday({ }: any, payload: any) {
    httpService
      .addHoliday(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.result[0]}`,
            });
          }
        },
        (err: any) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        router.push({ path: "/settings", query: { key: "holiday" } });
      });
  },
  async deleteHoliday({ dispatch }: any, payload: any) {
    httpService.deleteHoliday(payload).then(
      (res: any) => {
        if (
          res.status == 200 &&
          res.data.status == "Ok" &&
          res.data.message == "Success" &&
          res.data.result &&
          res.data.result.length > 0
        ) {
          notify({
            group: "auth",
            type: "success",
            title: `${res.data.result[0]}`,
          });
        }
        dispatch("getHoliday");
      },
      (err: any) => {
        errHandle.methods.errorHandle(err);
      }
    );
  },
};

const getters = {
  getVersionList: (state: any) => state.versionList,
  getproductlist: (state: any) => state.productlist,
};

const settings = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default settings;
