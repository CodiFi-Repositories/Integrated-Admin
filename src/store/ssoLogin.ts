import { httpService } from "../services/httpservices";
import router from "../router/index"; 
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
      await httpService
        .ssoLogin(payload)
        .then((response) => {
           
          if (response.data.message.toString().trim() === "Success" && response.data.result && response.data.result.length > 0) {
            let userRole = response.data.result[0].kcRole ? response.data.result[0].kcRole : 'admin'
            localStorage.setItem("IntegratedClientId", userRole);
            localStorage.setItem(
              "IntegratedSessionId",
              response.data.result[0].accessToken
            );
            commit("setUserId", userRole, {
              root: true,
            });
            commit("setSessionId", response.data.result[0].accessToken, {
              root: true,
            });
            // localStorage.setItem("IntegratedClientId", "admin");
        // this.$store.commit("setUserId", "admin");
        // this.$router.push('/dashboard')
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
