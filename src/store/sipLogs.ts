import { httpService } from "../services/httpservices";
import errHandle from "../handleError/errorHandling.ts";

const state = {
  sipDetails: [],
  sipOrderDetails: { executed: [], upcoming: [] },
  sipLogsData: [],
  sipLogsSummary: null,
  sipCountDetails: null,
  userSipDetails: [],
  sipDialogDetails: [],
  loader: false,
};

const mutations = {
  setSipDetails(state: any, payload: any) {
    state.sipDetails = payload;
  },
  setSipOrderDetails(state: any, payload: any) {
    state.sipOrderDetails = payload;
  },
  setSipLogsData(state: any, payload: any) {
    state.sipLogsData = payload;
  },
  setSipLogsSummary(state: any, payload: any) {
    state.sipLogsSummary = payload;
  },
  setSipCountDetails(state: any, payload: any) {
    state.sipCountDetails = payload;
  },
  setUserSipDetails(state: any, payload: any) {
    state.userSipDetails = payload;
  },
  setSipDialogDetails(state: any, payload: any) {
    state.sipDialogDetails = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
};

const actions = {
  async getSipDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    commit("setSipDetails", []);
    await httpService
      .getSipDetails(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.message != "No Records Found" &&
            response.data.result &&
            response.data.result?.length > 0
          ) {
            if (response.data.message.toString().trim() == "No Records Found") {
            } else {
              response.data.result.forEach(function (item: any) {
                delete item.dpTxnMode;
                delete item.dpc;
                delete item.euin;
                delete item.euinVal;
                delete item.firstOrderFlag;
                delete item.folioNo;
                delete item.frequencyAllowed;
                delete item.internalRefNo;
                delete item.ipadd;
                delete item.memberCode;
                delete item.param1;
                delete item.param2;
                delete item.param3;
                delete item.passKey;
                delete item.password;
                delete item.regId;
                delete item.schemeName;
                delete item.subberCode;
                delete item.transCode;
                delete item.userID;
                item["Created On"] = item["createdon"];
                delete item.createdon;
                item["Client Code"] = item["clientCode"];
                delete item.clientCode;
                item["Installment"] = item["installmentAmount"];
                delete item.installmentAmount;
                item["Frequency"] = item["frequencyType"];
                delete item.frequencyType;
                item["Mandate"] = item["mandateid"];
                delete item.mandateid;
                item["No Of Installment"] = item["noOfInstallment"];
                delete item.noOfInstallment;
                item["Order No"] = item["sip_orderno"];
                delete item.sip_orderno;
                item["Ref No"] = item["uniqueRefNo"];
                delete item.uniqueRefNo;
                item["Trans Mode"] = item["transMode"];
                delete item.transMode;
                item["Scheme"] = item["schemeCode"];
                delete item.schemeCode;
                item["Remarks"] = item["remarks"];
                delete item.remarks;
                item["Placed By"] = "0";
              });
            }

            for (let item of response.data.result) {
              item["Order No"] =
                item["Order No"] != "0" ? item["Order No"] : "-";
              item["Placed By"] =
                item["Placed By"] != "0" ? item["Placed By"] : "-";
            }

            commit("setSipDetails", response.data.result);
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
  async getSipCountDetails({ commit }: any) {
    await httpService
      .getSipCountDetails()
      .then(
        (response: any) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result &&
            response.data.result.length > 0
          ) {
            commit("setSipCountDetails", response.data.result[0]);
          } else {
            commit("setSipCountDetails", null);
          }
        },
        (error: any) => {
          errHandle.methods.errorHandle(error);
        }
      );
  },
  async getSipDialogDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getSipDetails(payload)
      .then(
        (response: any) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result &&
            response.data.result.length > 0
          ) {
            commit("setSipDialogDetails", response.data.result);
          } else {
            commit("setSipDialogDetails", []);
          }
        },
        (error: any) => {
          errHandle.methods.errorHandle(error);
          commit("setSipDialogDetails", []);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getUserSipDetails({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getUserSipDetails()
      .then(
        (response: any) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result &&
            response.data.result.length > 0
          ) {
            commit("setUserSipDetails", response.data.result);
          } else {
            commit("setUserSipDetails", []);
          }
        },
        (error: any) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getSipLogs({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getSipLogs(payload)
      .then(
        (response: any) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result
          ) {
            commit("setSipLogsData", response.data.result.logs || []);
            commit("setSipLogsSummary", response.data.result.summary || null);
          } else {
            commit("setSipLogsData", []);
            commit("setSipLogsSummary", null);
          }
        },
        (error: any) => {
          errHandle.methods.errorHandle(error);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getSipOrderDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getSipOrderDetails(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result &&
            response.data.result[0]?.installmentDetails &&
            response.data.result[0]?.installmentDetails.length > 0
          ) {
            const executed: any[] = [];
            const upcoming: any[] = [];
            for (const item of response.data.result[0].installmentDetails) {
              if (item.status?.toString().trim().toLowerCase() !== "pending") {
                executed.push(item);
              } else {
                upcoming.push(item);
              }
            }
            commit("setSipOrderDetails", { executed, upcoming });
          } else {
            commit("setSipOrderDetails", { executed: [], upcoming: [] });
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
  getSipDetails: (state: any) => state.sipDetails,
  getSipOrderDetails: (state: any) => state.sipOrderDetails,
  getSipLogsData: (state: any) => state.sipLogsData,
  getSipLogsSummary: (state: any) => state.sipLogsSummary,
  getSipCountDetails: (state: any) => state.sipCountDetails,
  getUserSipDetails: (state: any) => state.userSipDetails,
  getSipDialogDetails: (state: any) => state.sipDialogDetails,
  getLoader: (state: any) => state.loader,
};

const sipLogs = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default sipLogs;
