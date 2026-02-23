import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import errHandle from "../handleError/errorHandling.ts";

const state = {
  newlyAddedSymbols: [],
  deactivatedSymbols: [],
  duplicateSymbols: [],
  contractMasterData: [],
  loader: false,
  exchangeData: [
    "",
    "nse_fo",
    "nse_cm",
    "cde_fo",
    "bse_cm",
    "nse_idx",
    "bse_idx",
  ],
  urlLogsData: [],
  resetdialogue: false,
};

const mutations = {
  setNewlyAddedSymbols(state: any, payload: any) {
    state.newlyAddedSymbols = payload;
  },
  setDeactivatedSymbols(state: any, payload: any) {
    state.deactivatedSymbols = payload;
  },
  setDuplicateSymbols(state: any, payload: any) {
    state.duplicateSymbols = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setresetdialogue(state: any, payload: any) {
    state.resetdialogue = payload;
  },
  setContractMasterData(state: any, payload: any) {
    state.contractMasterData = payload;
  },
  //
  SET_SNAKBAR({ state }: any, payload: any) {
    state.snackbar.msg = payload.msg;
    state.snackbar.show = payload.show;
    state.snackbar.color = payload.color;
    state.snackbar.timeout = payload.timeout;
  },
};

const actions = {
  async getContractMasterData({ commit }: any, payload: any) {
    let json = {
      symbol: payload.symbol,
      exch: payload.exch,
      // group: payload.group ? payload.group : "",
      expiry: payload.expiry ? payload.expiry : "",
    };
    commit("setLoader", true);
    await httpService
      .getContractMasterData(json)
      .then(
        (response) => {
          if (response.data) {
            if (
              response.data.message.toString().trim() == "Success" &&
              response.data.result &&
              response.data.result.length > 0 &&
              response.data.result[0].result &&
              response.data.result[0].result.length > 0
            ) {
              commit("setContractMasterData", response.data.result[0].result);
              notify({
                group: "auth",
                type: "success",
                title: `${response.data.message}`,
              });
            } else {
              commit("setContractMasterData", []);
              notify({
                group: "auth",
                type: "error",
                title: `No results found`,
              });
            }
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
  async getNewlyAddedSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getNewlyAddedSymbols()
      .then(
        (response) => {
          if (response.data) {
            commit("setNewlyAddedSymbols", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${response.data.message}`,
            });
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

  async getDeactivatedSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getDeactivatedSymbols()
      .then(
        (response) => {
          if (response.data) {
            commit("setDeactivatedSymbols", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${response.data.message}`,
            });
            // dispatch("getProductList");
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

  async getDuplicateSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getDuplicateSymbols()
      .then(
        (response) => {
          if (response.data) {
            commit("setDuplicateSymbols", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${response.data.message}`,
            });
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

  async resetCache({ commit }: any, jsonObj: any) {
    commit("setLoader", true);
    await httpService
      .resetCache(jsonObj)
      .then(
        (response) => {
          if (response.data) {
            if (
              response.status == 200 &&
              response.data.message.toString().trim() ==
                "Contract loaded sucessfully"
            ) {
              notify({
                group: "auth",
                type: "success",
                title: `${response.data.message}`,
              });
              // dispatch("getProductList");
            }
            commit("notify", {
              msg: "Reset Cache successfully",
              show: true,
              color: "teal darken-1",
              timeout: 2500,
            });
          } else {
            commit("notify", {
              msg: "Reset Cache failed",
              show: true,
              color: "red darken-1",
              timeout: 2500,
            });
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
};

const getters = {
  getNewlyAddedSymbols: (state: any) => state.newlyAddedSymbols,
  getDeactivatedSymbols: (state: any) => state.deactivatedSymbols,
  getDuplicateSymbols: (state: any) => state.duplicateSymbols,
  getLoader: (state: any) => state.loader,
};

const cMaster = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default cMaster;
