import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
import errHandle from "../handleError/errorHandling.ts";
const { notify } = useNotification();
const state = {
  loader: false,
  versionList: [],
  isAddVersionDialog: false,
  isUpdateVersionDialog: false,
  isDeleteVersionDialog: false,
};

const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setVersionList(state: any, payload: any) {
    state.versionList = payload;
  },
  setIsAddVersionDialog(state: any, payload: any) {
    state.isAddVersionDialog = payload;
  },
  setIsUpdateVersionDialog(state: any, payload: any) {
    state.isUpdateVersionDialog = payload;
  },
  setIsDeleteVersionDialog(state: any, payload: any) {
    state.isDeleteVersionDialog = payload;
  },
};

const actions = {
  async getMobileVersion({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getMobileVersion()
      .then((response) => {
        if (
          response.data.message.toString().trim() == "Success" &&
          response.data.result.length
        ) {
          commit("setVersionList", response.data.result);
        } else {
          notify({ group: "auth", type: "error", title: `No Data Found` });
          commit("setVersionList", []);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async addMobileVersion({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .addMobileVersion(payload)
      .then((response) => {
        if (response.data.message.toString().trim() == "Success") {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
          dispatch("getMobileVersion");
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async updateMobileVersion({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .updateMobileVersion(payload)
      .then((response) => {
        if (response.data.message.toString().trim() == "Success") {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
          dispatch("getMobileVersion");
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async deleteMobileVersion({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .deleteMobileVersion(payload)
      .then((response) => {
        if (response.data.message.toString().trim() == "Success") {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
          dispatch("getMobileVersion");
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
  getLoader: (state: any) => state.loader,
  getVersionList: (state: any) => state.versionList,
  getIsAddVersionDialog: (state: any) => state.isAddVersionDialog,
  getIsUpdateVersionDialog: (state: any) => state.isUpdateVersionDialog,
  getIsDeleteVersionDialog: (state: any) => state.isDeleteVersionDialog,
};

const version = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default version;
