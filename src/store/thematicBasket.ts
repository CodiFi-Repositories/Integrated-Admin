import errorHandling from "../handleError/errorHandling";
import { httpService } from "../services/httpservices";
const today = new Date();
const yesterDay = new Date(today);
yesterDay.setDate(today.getDate() - 1);
const formattedToday = today.toISOString().slice(0, 16); // Includes date and time (YYYY-MM-DDTHH:mm)

const formattedYesterday = yesterDay.toISOString().slice(0, 16); // Include date and time (YYYY-MM-DDTHH:mm)
const dateFormatter = (date: Date | null, type: string) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  if (type === "from") {
    // Set time to 00:00 for 'from'
    hours = "00";
    minutes = "00";
    seconds = "00";
  } else if (type === "to") {
    // Set time to current time for 'to'
    const now = new Date();
    hours = now.getHours().toString().padStart(2, "0");
    minutes = now.getMinutes().toString().padStart(2, "0");
    seconds = now.getSeconds().toString().padStart(2, "0");
  }
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Return the full date and time (YYYY-MM-DD HH:mm)
};
const state = {
  editThematicBasket: false,
  showOrderWindow: false,
  thematicBasketList: [],
  scripsArray: [],
  selectedScrip: "",
  thematicBasketLoader: false,
  selectedThematicBasket: "",
  selectedThematicBasketScrips: "",
  isCreateThematicBasket: false,

  fromDate: formattedYesterday, // Set initial fromDate as 5 days ago with time
  toDate: formattedToday,
};
const mutations = {
  setshowdialog(state: { showOrderWindow: any }, payload: any) {
    state.showOrderWindow = payload;
  },
  setThematicBasketList(state: { thematicBasketList: any }, payload: any) {
    state.thematicBasketList = payload;
  },
  setThematicBasketLoader(state: { thematicBasketLoader: any }, payload: any) {
    state.thematicBasketLoader = payload;
  },
  seteditaddtrade(state: { editThematicBasket: any }, payload: any) {
    state.editThematicBasket = payload;
  },
  setSelectedThematicBasket(
    state: { selectedThematicBasket: any },
    payload: any
  ) {
    state.selectedThematicBasket = payload;
  },
  setSelectedThematicBasketScrips(
    state: { selectedThematicBasketScrips: any },
    payload: any
  ) {
    state.selectedThematicBasketScrips = payload;
  },
  setIsCreateThematicBasket(
    state: { isCreateThematicBasket: any },
    payload: any
  ) {
    state.isCreateThematicBasket = payload;
  },
  setFromDate(state: { fromDate: any }, payload: any) {
    state.fromDate = payload;
  },
  setToDate(state: { toDate: any }, payload: any) {
    state.toDate = payload;
  },
};
const actions = {
  createThematicBasket({ commit }: any, payload: any) {
    commit("setThematicBasketLoader", true);
    httpService
      .createThematicBasket(payload)
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.status == "Ok") {
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
            commit("setIsCreateThematicBasket", false);
          } else if (res.data.message) {
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
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setThematicBasketLoader", false);
      });
  },
  modifyThematicBasket({ commit, dispatch }: any, payload: any) {
    commit("setThematicBasketLoader", true);
    httpService
      .modifyThematicBasket(payload)
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.status == "Ok") {
            dispatch("getAllThematicBasket");

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
            commit("setIsCreateThematicBasket", false);
          } else if (res.data.message) {
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
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setThematicBasketLoader", false);
      });
  },
  deleteThematicBasket({ commit, dispatch }: any, payload: any) {
    commit("setThematicBasketLoader", true);
    httpService
      .deleteThematicBasket(payload)
      .then(
        (res: any) => {
          if (res.status == 200 && res.data.status == "Ok") {
            dispatch("getAllThematicBasket");

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
          } else if (res.data.message) {
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
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setThematicBasketLoader", false);
      });
  },
  getAllThematicBasket({ state, commit }: any) {
    const fromDateObj = state.fromDate ? new Date(state.fromDate) : null;
    const toDateObj = state.toDate ? new Date(state.toDate) : null;
    const json = {
      fromDate: fromDateObj ? dateFormatter(fromDateObj, "from") : null,
      toDate: toDateObj ? dateFormatter(toDateObj, "to") : null,
    };
    commit("setThematicBasketLoader", true);
    httpService
      .getAllThematicBasket(json)
      .then(
        (res: any) => {
          let basketList = [];
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0 &&
            res.data.result[0] != "No data found"
          ) {
            basketList = res.data.result;
          }
          commit("setThematicBasketList", basketList);
        },
        (err: any) => {
          errorHandling.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setThematicBasketLoader", false);
      });
  },
  getSelectedThematicBasket({ commit }: any, payload: any) {
    httpService
      .getSelectedThematicBasket(payload)
      .then(
        (res: any) => {
          let data = "";
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            data = res.data.result[0];
          }
          commit("setSelectedThematicBasketScrips", data);
        },
        (err: any) => errorHandling.methods.errorHandle(err)
      )
      .finally(() => {
        commit("setIsCreateThematicBasket", true);
      });
  },
};
const getters = {
  getThematicBasketList: (state: { thematicBasketList: any }) =>
    state.thematicBasketList,
  getSelectedThematicBasketScrips: (state: {
    selectedThematicBasketScrips: any;
  }) => state.selectedThematicBasketScrips,
};
const namespaced = true;
const thematicBasket = {
  state,
  namespaced,
  mutations,
  actions,
  getters,
};

export default thematicBasket;
