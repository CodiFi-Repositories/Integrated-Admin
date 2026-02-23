import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
import errHandle from "../handleError/errorHandling.ts";
const { notify } = useNotification();
const state = {
  loader: false,
  vendorList: [],
  authorizeDialog: false,
};

const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setVendorList(state: any, payload: any) {
    state.vendorList = payload;
  },
  setAuthorizeDialog(state: any, payload: any) {
    state.authorizeDialog = payload;
  },
};

const actions = {
  async getVendors({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getVendors(payload)
      .then((response) => {
        if (
          response.data.message.toString().trim() == "Success" &&
          response.data.result.length
        ) {
          for (let item of response.data.result) {
            item.authorization_status =
              item.authorization_status == 1 ? "Active" : "Inactive";
          }
          commit("setVendorList", response.data.result);
        } else {
          notify({ group: "auth", type: "error", title: `No Data Found` });
          commit("setVendorList", []);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async authorizeVendor({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .authorizeVendor(payload.updatePayload)
      .then((response) => {
        if (response.data.message.toString().trim() == "Success") {
          commit("setAuthorizeDialog", false);
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
          dispatch("getVendors", payload.getPayload);
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
  getVendorList: (state: any) => state.vendorList,
  getAuthorizeDialog: (state: any) => state.authorizeDialog,
};

const vendor = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default vendor;
