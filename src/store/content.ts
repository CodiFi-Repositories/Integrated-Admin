import { useNotification } from "@kyvg/vue3-notification";
import { httpService } from "../services/httpservices";
import errorHandling from "../handleError/errorHandling";
const { notify } = useNotification();
const state = {
  adminWatchlist: [],
  isSmartWatch: false,
  isAdminDeleteDialog: false,
  loader: false,
};
const mutations = {
  setAdminWatchList(state: any, payload: any) {
    state.adminWatchlist = payload;
  },
  setIsSmartWatch(state: any, payload: any) {
    state.isSmartWatch = payload;
  },
  setIsAdminDeleteDialog(state: any, payload: any) {
    state.isAdminDeleteDialog = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
};
const actions = {
  async getPredefinedMw({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getPredefinedMw({
    "defaultMw": false,
    "source": "WEB",
    "preDef": true,
    "advFlag": true,
    "lstsFlag": true
})
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.message == "Success") {
            const filteredResult = res.data.result?.filter((el: any) => el.mwName !== 'My Stocks') ?? [];
            commit("setAdminWatchList", filteredResult);
            if (filteredResult?.length) {
              filteredResult.forEach((el: any) => {
                if (el.hasOwnProperty("isEnabled") && el.mwId == 4) {
                  commit("setIsSmartWatch", el.isEnabled == 1);
                }
              });
            }
          }
        },
        (error) => {
          errorHandling.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async createPredefinedMw({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .createPredefinedMw({
    "mwName": payload
})
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.message == "Success") {
            dispatch("getPredefinedMw", "reload");
          }
        },
        (error) => {
          errorHandling.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async deleteScrips({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .deleteAdminWatchScrips(payload)
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.message == "Success") {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });

            dispatch("getPredefinedMw", "reload");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res.data.message}`,
            });
          }
        },
        (error) => {
          errorHandling.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async addWatchScrips({ commit, dispatch }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .addWatchScrips(payload)
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.message == "Success") {
            notify({
              group: "auth",
              type: "success",
              title: `${res.data.message}`,
            });

            dispatch("getPredefinedMw", "reload");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${res.data.message}`,
            });
          }
        },
        (error) => {
          errorHandling.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
};
const getters = {
  getLoader: (state: any) => state.loader,
};
const namespaced = true;
const content = {
  state,
  namespaced,
  mutations,
  actions,
  getters,
};
export default content;
