import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
import errHandle from "../handleError/errorHandling.ts";
import router from "../router/index.ts";
const { notify } = useNotification();
const state = {
  loader: false,
  userDetails: [],
  downloadTable: "table",
  userInput: "",
  authorizeUnblockDialog: false,
};

const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setUserDetails(state: any, payload: any) {
    state.userDetails = payload;
  },
  setDownloadTable(state: any, payload: any) {
    state.downloadTable = payload;
  },
  setUserInput(state: any, payload: any) {
    state.userInput = payload;
  },
  setAuthorizeUnblockDialog(state: any, payload: any) {
    state.authorizeUnblockDialog = payload;
  },
};

const actions = {
  async getUserDetails({ commit }: any, payload: any) {
    commit("setUserInput", payload.userId);
    commit("setLoader", true);
    await httpService
      .getUserDetails(payload)
      .then(
        (response) => {
          if (
            response.data.result.toString().trim() != "No Records Found" &&
            response.data.result.length
          ) {
            response.data.result.forEach(function (item: any) {
              delete item?.id;
              delete item?.createdTimestamp;
              delete item?.requiredActions;

              item.pan = item?.attributes?.pan ? item?.attributes?.pan[0] : "-";
              //  Object.assign(item,{pan:''});
              item.mobile = item?.attributes?.mobile
                ? item?.attributes?.mobile[0]
                : "";
              item.ucc = item?.attributes?.ucc ? item?.attributes?.ucc[0] : "";
              //  Object.assign(item,{mobile:''});
              delete item?.disableableCredentialTypes;
              item?.attributes;

              item["User Name"] = item?.["username"];
              delete item?.username;
              item["Email"] = item?.["email"];
              delete item?.email;
              item["User Enabled"] = item?.["enabled"];
              delete item?.enabled;
              item["Email Verified"] = item?.["emailVerified"];
              delete item?.emailVerified;
              item["First Name"] = item?.["firstName"];
              delete item?.firstName;
              item["Last Name"] = item?.["lastName"];
              delete item?.lastName;
              item["Mobile"] = item?.["mobile"];
              delete item?.mobile;
              item["Pan"] = item?.["pan"];
              delete item?.pan;
            });
            commit("setUserDetails", response.data.result);
          } else {
            notify({ group: "auth", type: "error", title: `No Data Found` });
            commit("setUserDetails", []);
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
  async updateUserDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .updateUserDetails(payload)
      .then(
        (response) => {
          if (
            response.data.message.toString().trim() == "Success" &&
            response?.data?.result[0].toString().trim() ==
              "User details updated"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${response.data.result[0]}`,
            });
            router.push("/userInfo");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${response.data.result[0]}`,
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

  async addUserKeyCloak({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .addUserKeyCloak(payload)
      .then(
        (response) => {
          if (
            (response.data.message.toString().trim() == "Success" &&
              response?.data?.result[0]?.includes("User Created")) ||
            response?.data?.result[0]?.includes("User already exists")
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${response.data.result[0]}`,
            });
            router.push("/userInfo");
          } else {
            notify({
              group: "auth",
              type: "error",
              title: `${response.data.result[0]}`,
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
  async getUpdateAdminuser({ commit, state }: any) {
    commit("setLoader", true);
    let json = {
      userId: state.userDetails[0]["User Name"],
      firstName: state.userDetails[0]["First Name"],
    };
    await httpService
      .getUpdateAdminuser(json)
      .then(
        (response) => {
          let temp: any = {
            group: "auth",
            type: "error",
          };

          temp.title = response.data.message;
          if (response.status == 200 && response.data.status == "Ok") {
            temp.type = "success";
          }
          notify(temp);
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async getDeleteAdminuser({ commit, state }: any) {
    commit("setLoader", true);

    let json = {
      userId: state.userDetails[0]["User Name"],
      firstName: state.userDetails[0]["First Name"],
    };
    await httpService
      .getDeleteAdminuser(json)
      .then(
        (res) => {
          let temp: any = {
            group: "auth",
            type: "error",
          };
          temp.title = res.data.message;
          if (res.status == 200 && res.data.status == "Ok") {
            temp.type = "success";
          }
          notify(temp);
        },
        (error) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async unblockUser({ state, dispatch, commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .unblockUser(payload)
      .then(
        (res: any) => {
          let temp: any = {
            group: "auth",
            type: "error",
          };
          if (res.data.message) {
            temp.title = res.data.message;
          }
          if (res.status == 200 && res.data.status == "Ok") {
            let json = {
              userId: state.userInput,
            };
            temp.type = "success";
            dispatch("getUserDetails", json);
            notify(temp);
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
  getLoader: (state: any) => state.loader,
  getUserDetails: (state: any) => state.userDetails,
  getAdminCheck: (state: any) => state.admincheck,
  getAuthorizeUnblockDialog: (state: any) => state.authorizeUnblockDialog,
};

const user = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default user;
