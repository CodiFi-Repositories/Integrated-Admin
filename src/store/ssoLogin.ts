import { httpService } from "../services/httpservices";
import router from "../router/index";
import { env } from "../env";
import errHandle from "../handleError/errorHandling.ts";

const auth: any = {
  namespaced: true,
  state: {
    error_message: null,
  },
  mutations: {
    setErrorMessage(state: any, payload: any) {
      state.error_message = payload;
    },
  },
  actions: {
    async getData({ commit }: any, payload: any) {
      commit("setErrorMessage", null);
      let json = {
        vendor: env().APPCODE,
        authCode: payload,
      };
      await httpService
        .ssoLogin(json)
        .then((response) => {
          if (response.data.message.toString().trim() === "Success") {
            localStorage.setItem("IntegratedClientId", response.data.result[0].clientId);
            localStorage.setItem(
              "IntegratedSessionId",
              response.data.result[0].accessToken
            );
            commit("setUserId", response.data.result[0].clientId, {
              root: true,
            });
            commit("setSessionId", response.data.result[0].accessToken, {
              root: true,
            });
            router.push("dashboard");
          } else if (response.data.message) {
            commit("setErrorMessage", response.data.message);
            errHandle.methods.localClear()
          }
        }, (error) => {
          errHandle.methods.errorHandle(error);
        })
        .finally(() => { });
    },
  },
  getters: {
    getErrorMsg: (state: any) => state.error_message,
  },
};
export default auth;
