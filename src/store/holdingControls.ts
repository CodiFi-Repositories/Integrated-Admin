import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import errorHandling from "../handleError/errorHandling";
import { httpService } from "../services/httpservices";

const state = {
  holdingSessionData: [],
  isAlwaysOn: false,
  isAlwaysOff: false,
  checkTimings: false,
  isCheckTimings: false,
  isCreateSessionDialog: false,
  loader: false,
  isDeleteHoldingSessionDialog: false
};
const mutations = {
  setHoldingSessionData(state: any, payload: any) {
    state.holdingSessionData = payload;
  },
  setIsAlwaysOn(state: any, payload: any) {
    state.isAlwaysOn = payload;
  },
  setIsAlwaysOff(state: any, payload: any) {
    state.isAlwaysOff = payload;
  },
  setIsCheckTimings(state: any, payload: any) {
    state.isCheckTimings = payload;
  },
  setIsCreateSessionDialog(state: any, payload: any) {
    state.isCreateSessionDialog = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setIsDeleteHoldingSessionDialog(state: any, payload: any){
    state.isDeleteHoldingSessionDialog = payload
  }

};
const actions = {
  async getHoldingSession({ commit }: any) {
    commit("setLoader", true);
    let sessionData: any = [];
    await httpService
      .getHoldingSession()
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.message == "Success" &&
            res.data.status == "Ok" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            sessionData = res.data.result;
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setHoldingSessionData", sessionData);
        commit("setLoader", false);
      });
  },
  getHoldingControls({ commit }: any) {
    commit("setLoader", true);
    httpService
      .getHoldingControls()
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            commit("setIsAlwaysOn", res.data.result[0].alwaysOn == 1);
            commit("setIsAlwaysOff", res.data.result[0].alwaysOff == 1);
            commit("setIsCheckTimings", res.data.result[0].checkTimings == 1);
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  updateholdingControls({ state, commit, rootGetters, dispatch }: any) {
    commit("setLoader", true);
    const json = {
      alwaysOn: state.isAlwaysOn ? 1 : 0,
      alwaysOff: state.isAlwaysOff ? 1 : 0,
      checkTimings: state.isCheckTimings ? 1 : 0,
      updatedBy: rootGetters["getUserId"],
    };
    httpService
      .updateHoldingControls(json)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Updated Successfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });
            dispatch("getHoldingControls");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res?.data?.message}`,
            });
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async updateSession({ dispatch, commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .updateHoldingSession(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Updated Successfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });
            dispatch("getHoldingSession");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res?.data?.message}`,
            });
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async createSession({ dispatch, commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .createHoldingSession(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Inserted Successfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });
            dispatch("getHoldingSession");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res?.data?.message}`,
            });
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async deleteSession({ dispatch, commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .deleteHoldingSession(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Deleted successfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });
            dispatch("getHoldingSession");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res?.data?.message}`,
            });
          }
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },

};
const getters = {
  getHoldingSessionData: (state: any) => state.holdingSessionData,
  getIsAlwaysOn: (state: any) => state.isAlwaysOn,
  getIsAlwaysOff: (state: any) => state.isAlwaysOff,
  getIsCheckTimings: (state: any) => state.isCheckTimings,
  getIsCreateSessionDialog: (state: any) => state.isCreateSessionDialog,
  getLoader: (state: any) => state.loader,
};
const namespaced = true;
const holdingControls = {
  state,
  mutations,
  actions,
  getters,
  namespaced,
};
export default holdingControls;
