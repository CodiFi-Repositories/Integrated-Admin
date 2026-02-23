import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import errHandle from "../handleError/errorHandling.ts";

const state = {
  marketWatchData: [],
  userBankDetails: [],
  sipDetails: [],
  housingLoanData: [],
  propertyLoanData: [],
  enterprisesLoanData: [],
  securitiesLoanData: [],
  currentLoanData: [],
  loader: false,
  activeTabNumber: "1",
  currentMarketWatchData: [],
  tabData: [],
  activeOrderCountTab: 0,
  ordersCountData: [],
  userOrdersCountData: [],
  fileUploadDetails: [],
  positionAvgDetails: [],
  paymentLogs: [],
  paymentResponseDialog: false,
  paymentResponseRowData: "",
};

const mutations = {
  setActiveTabNumber(state: any, payload: any) {
    state.activeTabNumber = payload;
  },
  setTabData(state: any, payload: any) {
    if (payload == "initial") {
      let tabs: any = [];
      for (let el of state.marketWatchData) {
        tabs.push(el.mwId);
      }
      tabs = new Set(tabs);
      tabs = [...tabs];
      tabs = tabs.sort();
      let tabData: any = [];
      for (let idx of tabs) {
        let arr = state.marketWatchData.filter((el: any) => {
          return el.mwId == idx;
        });
        tabData.push({ id: idx, scrips: arr });
      }
      state.tabData = tabData;
    } else {
      state.currentMarketWatchData = [];
    }
  },
  setUserBankDetails(state: any, payload: any) {
    state.userBankDetails = payload;
  },
  setMarketWatchData(state: any, payload: any) {
    state.marketWatchData = payload;
  },
  setSipDetails(state: any, payload: any) {
    state.sipDetails = payload;
  },
  setHousingLoanData(state: any, payload: any) {
    state.housingLoanData = payload;
    state.currentLoanData = payload;
  },
  setPropertyLoanData(state: any, payload: any) {
    state.propertyLoanData = payload;
    state.currentLoanData = payload;
  },
  setEnterprisesLoanData(state: any, payload: any) {
    state.enterprisesLoanData = payload;
    state.currentLoanData = payload;
  },
  setSecuritiesLoanData(state: any, payload: any) {
    state.securitiesLoanData = payload;
    state.currentLoanData = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setTabsData(state: any, payload: any) {
    state.tabData = payload;
  },
  setOrderCountActiveTab(state: any, payload: any) {
    state.activeOrderCountTab = payload;
  },
  setOrdersCount(state: any, payload: any) {
    state.ordersCountData = payload;
  },
  setUserOrdersCount(state: any, payload: any) {
    state.userOrdersCountData = payload;
  },
  setFileUploadDetails(state: any, payload: any) {
    state.fileUploadDetails = payload;
  },
  setPositionAvgDetails(state: any, payload: any) {
    state.positionAvgDetails = payload;
  },
  setPaymentLogs(state: any, payload: any) {
    state.paymentLogs = payload;
  },
  setPaymentResponseDialog(state: any, payload: any) {
    state.paymentResponseDialog = payload.isOpen;
    state.paymentResponseRowData = payload.data;
  },
};
const actions = {
  async getUserBankDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    let json = {
      clientId: payload,
    };
    await httpService
      .getUserBankDetails(json)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.status.toString().trim() == "Ok" &&
            response.data.message != "No Records Found"
          ) {
            for (let item of response.data.result) {
              item.defaultAccBank =
                item.defaultAccBank == "Y" ? "Primary" : "Secondary";
            }
            commit("setUserBankDetails", response.data.result);
          } else {
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
  async getMarketWatchData({ commit }: any, payload: any) {
    commit("setLoader", true);
    let json = {
      userId: payload,
    };
    commit("setTabsData", []);
    await httpService
      .getMarketWatchData(json)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.status.toString().trim() == "Ok" &&
            response.data.message != "No Records Found"
          ) {
            commit("setMarketWatchData", response.data.result);
            commit("setTabData", "initial");
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
  async getSipDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getSipDetails(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.message != "No Records Found" &&
            response.data.result?.length > 0 && 
            response.data.result[0].data && 
            response.data.result[0].data.length > 0
          ) {
            if (response.data.message.toString().trim() == "No Records Found") {
            } else {
              response.data.result[0].data.forEach(function (item: any) {
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
                delete item.startDate;
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

            for (let item of response.data.result[0].data) {
              item["Order No"] =
                item["Order No"] != "0" ? item["Order No"] : "-";
              item["Placed By"] =
                item["Placed By"] != "0" ? item["Placed By"] : "-";
            }

            commit("setSipDetails", response.data.result[0].data);
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
  async getHousingLoanData({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getHousingLoanData(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result[0] != "No Records Found" &&
            response.data.result.length
          ) {
            commit("setHousingLoanData", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: response.data.result[0]
                ? response.data.result[0]
                : response.data.message,
            });
            commit("setHousingLoanData", []);
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
  async getPropertyLoanData({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getPropertyLoanData(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message.toString().trim() == "Success" &&
            response.data.result[0].toString().trim() != "No Records Found" &&
            response.data.result.length
          ) {
            commit("setPropertyLoanData", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: response.data.result[0]
                ? response.data.result[0]
                : response.data.message,
            });
            commit("setPropertyLoanData", []);
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
  async getEnterprisesLoanData({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getEnterprisesLoanData(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message == "Success" &&
            response.data.result[0].toString().trim() != "No Records Found" &&
            response.data.result.length
          ) {
            for (let item of response.data.result) {
              item.typeOfLoan = item.typeOfLoan != null ? item.typeOfLoan : "-";
            }
            commit("setEnterprisesLoanData", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: response.data.result[0]
                ? response.data.result[0]
                : response.data.message,
            });
            commit("setEnterprisesLoanData", []);
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
  async getSecuritiesLoanData({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getSecuritiesLoanData(payload)
      .then(
        (response) => {
          if (
            response.status == 200 &&
            response.data.message == "Success" &&
            response.data.result[0].toString().trim() != "No Records Found" &&
            response.data.result.length
          ) {
            for (let item of response.data.result) {
              item.typeOfLoan = item.typeOfLoan != null ? item.typeOfLoan : "-";
              item.portfolioValue =
                item.portfolioValue != null ? item.portfolioValue : "-";
            }
            commit("setSecuritiesLoanData", response.data.result);
          } else {
            notify({
              group: "auth",
              type: "error",
              title: response.data.result[0]
                ? response.data.result[0]
                : response.data.message,
            });
            commit("setSecuritiesLoanData", []);
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
  async getOrdersCount({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getOrderCount(payload)
      .then(
        (res: any) => {
          var ordersData = [];
          var ordersCount = 0
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0 && 
            res.data.result[0].data && res.data.result[0].data.length > 0 
          ) {
            ordersData = res.data.result[0].data;
            ordersCount = res.data.result[0].totalCount
          } else {
            ordersData = [];
          }
          commit("setOrdersCount", ordersCount);
          commit("setUserOrdersCount", ordersData);
        },
        (err: any) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getUserOrderCount({ commit }: any, payload: any) {
    commit("setLoader", true);
    let userOrderCount = [];
    await httpService
      .getUserOrderCount(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            userOrderCount = res.data.result;
          } else {
            userOrderCount = [];
          }
          commit("setUserOrdersCount", userOrderCount);
        },
        (err: any) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getFileUploadDetails({ commit }: any, payload: any) {
    let fileUploadDetails: any = [];
    await httpService.getFileUploadDetails(payload).then(
      (res: any) => {
        if (
          res.status == 200 &&
          res.data.status == "Ok" &&
          res.data.message == "Success" &&
          res.data.result &&
          res.data.result.length > 0
        ) {
          fileUploadDetails = res.data.result;
        } else {
          fileUploadDetails = [];
        }
        commit("setFileUploadDetails", fileUploadDetails);
      },
      (err) => {
        errHandle.methods.errorHandle(err);
      }
    );
  },
  async getPositionAvgDetails({ commit }: any, payload: any) {
    let positionAvgDetails = [];
    commit("setLoader", true);
    await httpService
      .getPositionAvgDetails(payload)
      .then(
        (res: any) => {
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            positionAvgDetails = res.data.result;
          } else {
            positionAvgDetails = [];
          }
          commit("setPositionAvgDetails", positionAvgDetails);
        },
        (err) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getPaymentLogs({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getPaymentLogs(payload)
      .then(
        (res: any) => {
          let paymentLogs: any = [];
          if (
            res.status == 200 &&
            res.data.status == "Ok" &&
            res.data.message == "Success" &&
            res.data.result &&
            res.data.result.length > 0
          ) {
            paymentLogs = res.data.result;
          }
          commit("setPaymentLogs", paymentLogs);
        },
        (err: any) => {
          errHandle.methods.errorHandle(err);
        }
      )
      .finally(() => {
        commit("setLoader", false);
      });
  },
};
const getters = {
  getUserBankDetails: (state: any) => state.userBankDetails,
  getSipDetails: (state: any) => state.sipDetails,
  getHousingLoanData: (state: any) => state.housingLoanData,
  getPropertyLoanData: (state: any) => state.propertyLoanData,
  getEnterprisesLoanData: (state: any) => state.enterprisesLoanData,
  getSecuritiesLoanData: (state: any) => state.securitiesLoanData,
  getCurrentLoanData: (state: any) => state.currentLoanData,
  getLoader: (state: any) => state.loader,
  getPaymentLogs: (state: any) => state.paymentLogs,
};

const reports = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};

export default reports;
