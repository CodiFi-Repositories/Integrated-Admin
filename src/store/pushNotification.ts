import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import errHandle from "../handleError/errorHandling.js";
const state = {
  loader: false,
  resetdialogue: false,
};

const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setresetdialogue(state: any, payload: any) {
    state.resetdialogue = payload;
  },
};

const actions = {
  async sendPushNotification({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .sendPushNotification(payload)

      .then((response) => {
        if (response.data.message.toString().trim() == "Success") {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
        } else {
          notify({
            group: "auth",
            type: "error",
            title: `${response.data.message}`,
          });
        }
      }, (error) => {
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
  getLoader: (state: any) => state.loader,
};

const pushNotify = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default pushNotify;
