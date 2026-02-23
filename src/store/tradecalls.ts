import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
import errHandle from "../handleError/errorHandling.ts";
useNotification();
const state = {
  searchList: [],
  scripsArray: [],
  contractInfo: "",
  selectedScrip: "",
  showorderwindow: false,
  basketdetails: "",
  statusList: [],
  rejectionLoader: false,
  loader: false,
  isPreview: false,
  apiLoader: false,
  previewData: "",
  editaddtrade: false,
  validTab: 0,
  isRange: false,
  currentExch: "",
  contractInfoFull: "",
  deleteLoader: false,
  isResearchDel: false,
};

const mutations = {
  seteditaddtrade(state: any, payload: any) {
    state.editaddtrade = payload;
    localStorage.setItem("isTradeCallModify", "true");
  },
  setLoader(state: any, payload: boolean) {
    state.loader = payload;
  },
  setSearchList(state: { searchList: any }, payload: any) {
    state.searchList = payload;
  },
  setScripsArray(state: any, payload: any) {
    state.scripsArray = payload;
  },

  // setContractInfo(state: { contractInfo: any; }, payload: any) {
  //     state.contractInfo = payload;
  // },

  setselectedScrip(state: { selectedScrip: any }, payload: any) {
    state.selectedScrip = payload;
  },

  setshowdialog(state: { showorderwindow: any }, payload: any) {
    state.showorderwindow = payload;
  },
  setbasketdetails(state: { basketdetails: any }, payload: any) {
    state.basketdetails = payload;
  },
  setStatusList(state: any, payload: any) {
    state.statusList = payload;
  },
  setRejectionLoader(state: any, payload: any) {
    state.rejectionLoader = payload;
  },
  setIsPreview(state: any, payload: boolean) {
    state.isPreview = payload;
  },
  setApiLoader(state: any, payload: boolean) {
    state.apiLoader = payload;
  },
  setPreviewData(state: any, payload: any) {
    state.previewData = payload;
  },
  setValidTab(state: any, payload: any) {
    state.validTab = payload;
  },
  setIsRange(state: any, payload: any) {
    state.isRange = payload;
  },
  setCurrentExch(state: any, payload: string) {
    state.currentExch = payload;
  },
  setContractInfoFull(state: any, payload: any) {
    state.contractInfoFull = payload;
  },
  setDeleteLoader(state: any, payload: any) {
    state.deleteLoader = payload;
  },
  setIsResearchDel(state: any, payload: any) {
    state.isResearchDel = payload;
  },
};

const actions = {
  async getSearchList({ commit }: any, payload: any) {
    commit("setSearchList", []);

    let json = {
      exchange: ["All"],
      symbol: payload.value,
    };

    await httpService.getSearchList(json).then(
      (response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message == "Success" &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          let searchArr = response.data.result.filter(
            (el: { segment: string }) => {
              return el.segment != "INDEX";
            }
          );
          commit("setSearchList", searchArr);
        } else {
          commit("setSearchList", []);
        }
      },
      (err) => {
        errHandle.methods.errorHandle(err);
      }
    );
  },

  async createBasketNotification({ commit }: any, payload: any) {
    await httpService.createBasketNotification(payload).then(
      (res) => {
        if (
          res.status == 200 &&
          res.data.status == "Ok" &&
          res.data.message == "Success"
        ) {
          commit(
            "setNotification",
            {
              title: "",
              message: res.data.message,
              status: "",
              comment: "",
              type: "success",
              show: true,
              key: new Date().getTime(),
            },
            { root: true }
          );
        } else {
          commit(
            "setNotification",
            {
              title: "",
              message: res.data.message,
              status: "",
              comment: "",
              type: "danger",
              show: true,
              key: new Date().getTime(),
            },
            { root: true }
          );
        }
      },
      (err) => {
        errHandle.methods.errorHandle(err);
      }
    );
  },

  async getContract({ commit, dispatch }: any, payload: any) {
    let json = {
      token: payload.data.token,
      exch: payload.data.exchange ? payload.data.exchange : payload.data.exch,
    };
    commit("setselectedScrip", payload);
    await httpService
      .getContractInfo(json)
      .then(
        async (res) => {
          if (
            res.status == 200 &&
            res.data.message == "Success" &&
            Array.isArray(res.data.result)
          ) {
            await dispatch("setContractData", res.data.result[0]);
            dispatch("setCurrentExch", json.exch);
          } else {
            let json = {
              data: {
                title: "",
                type: "danger",
                message: res.data.message,
                duration: 4500,
              },
              position: "",
            };
            dispatch("errorHandle/toaster", json, { root: true });
            dispatch("setContractData", []);
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        if (payload && payload.data.from == "thematicBasket") {
          commit("thematicBasket/setshowdialog", true, { root: true });
        } else {
          commit("setshowdialog", true);
        }
      });
  },

  async getbasketdetails({ commit }: any, payload: any) {
    commit("setLoader", true);

    await httpService
      .getResearch(payload)
      .then(
        async (resp) => {
          if (
            resp.status == 200 &&
            Array.isArray(resp.data.result) &&
            resp.data.result.length > 0
          ) {
            commit("setbasketdetails", resp.data.result);
          } else {
            commit("setbasketdetails", []);
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getBasketStatus({ commit }: any) {
    httpService
      .getStatusList()
      .then(
        (resp) => {
          let statusList: any = [];
          if (
            resp.status == 200 &&
            resp.data.status == "Ok" &&
            resp.data.message == "Success" &&
            resp.data.result &&
            resp.data.result.length > 0
          ) {
            for (let item of resp.data.result) {
              item ? statusList.push(item) : "";
            }
          }
          commit("setStatusList", statusList);
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {});
  },
  async updateStatus({ commit }: any, payload: any) {
    commit("setRejectionLoader", true);
    httpService
      .updateBoStatus(payload)
      .then(
        (resp) => {
          if (
            resp.status == 200 &&
            resp.data.status == "Ok" &&
            resp.data.message == "Success"
          ) {
          } else {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "danger",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setRejectionLoader", false);
      });
  },

  async tradeCallPreview({ commit }: any, payload: any) {
    commit("setApiLoader", true);
    await httpService
      .tradeCallPreview(payload)
      .then(
        (resp) => {
          if (resp.status == 200 && resp.data.status == "Ok") {
            commit("setPreviewData", resp.data.result[0].shortDescription[0]);
            // commit("seteditaddtrade", false);
            commit("setIsPreview", true);
          } else if (resp.data.status != "Ok") {
            commit("setIsPreview", false);
            commit("setPreviewData", "");
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "danger",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setApiLoader", false);
      });
  },

  async tradeCallCreate({ commit }: any, payload: any) {
    commit("setApiLoader", true);
    await httpService
      .tradeCallCreate(payload)
      .then(
        (resp) => {
          if (resp.status == 200 && resp.data.status == "Ok") {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.result[0],
                status: "",
                comment: "",
                type: "success",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          } else {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "danger",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setApiLoader", false);
      });
  },

  async tradeCallModify({ commit }: any, payload: any) {
    commit("setApiLoader", true);
    await httpService
      .tradeCallModify(payload)
      .then(
        (resp) => {
          if (resp.status == 200 && resp.data.status == "Ok") {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "success",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          } else {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "danger",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setApiLoader", false);
      });
  },
  async setContractData({ commit }: any, payload: any) {
    await commit("setContractInfoFull", payload);
  },
  async setCurrentExch({ state }: any, payload: any) {
    state.currentExch = payload;
    let scrips = state.contractInfoFull.scrips;
    let currentScrip;
    if (Array.isArray(scrips) && scrips.length != 0) {
      currentScrip = scrips.find(
        (obj: any) => obj.exchange === state.currentExch
      );
    }
    state.contractInfo = currentScrip;
    // await commit("setContractInfo", currentScrip);
  },
  async deleteResearchCall({ commit }: any, payload: any) {
    commit("setDeleteLoader", true);
    await httpService
      .deleteResearcall(payload)
      .then(
        (resp: any) => {
          if (
            resp.status == 200 &&
            resp.data.status == "Ok" &&
            resp.data.message == "Success"
          ) {
            commit("setIsResearchDel", false);
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "success",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          } else {
            commit(
              "setNotification",
              {
                title: "",
                message: resp.data.message,
                status: "",
                comment: "",
                type: "danger",
                show: true,
                key: new Date().getTime(),
              },
              { root: true }
            );
          }
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setDeleteLoader", false);
      });
  },
};

const getters = {
  getLoader: (state: any) => state.loader,
  getbasketdetails: (state: { basketdetails: any }) => state.basketdetails,
  getIsPreview: (state: { isPreview: boolean }) => state.isPreview,
  getApiLoader: (state: { apiLoader: boolean }) => state.apiLoader,
  getPreviewData: (state: { previewData: any }) => state.previewData,
  getValidTab: (state: { validTab: any }) => state.validTab,
  getIsRange: (state: { isRange: any }) => state.isRange,
  getCurrentExch: (state: { currentExch: string }) => state.currentExch,
  getContractInfoFull: (state: { contractInfoFull: any }) =>
    state.contractInfoFull,
  getContractInfo: (state: { contractInfo: any }) => state.contractInfo,
};

const tradecall = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default tradecall;
