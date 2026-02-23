import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
import errHandle from "../handleError/errorHandling.ts";

const state = {
  accessLogDetails: "",
  SmsLogDetails :[],
  emailLogDetails :[],
  isAccessLog: false,
  accessRow: "",
  loader: false,
  payOutDetails: [],
  FeedbackDetails: [],
  AddNewScript: [],
  downloadLoader: false,
  mailLogs: [],
  pageNum: 1,
  perPage: 20,
  loginType: "EMAIL",
  isMailDial: false,
  accessLogType: true,
  distinctUrl: [],
  loaderKey: false,
  ipo_Loader: false,
  ipoData: '',
  mf_loader: false,
  mfData: ''
};
const mutations = {
  setAccessLogDetails(state: { accessLogDetails: any }, payload: any) {
    state.accessLogDetails = payload;
  },
  setSmsLogsDetails(state :any, payload :any){
    state.SmsLogDetails = payload;
  },
  setEmailLogsDetails(state:any,payload:any){
    state.emailLogDetails = payload;
  },

  setIsAccessLog(state: { isAccessLog: any; accessRow: any }, payload: any) {
    state.isAccessLog = payload.isOpen;
    state.accessRow = payload?.data;
  },
  setLoader(state: { loader: any }, payload: any) {
    state.loader = payload;
  },
  setPayOutDetails(state: any, payload: any) {
    state.payOutDetails = payload;
  },
  setFeedbackDetails(state: any, payload: any) {
    state.FeedbackDetails = payload;
  },
  setAddNewScript(state: any, payload: any) {
    state.AddNewScript = payload;
  },

  setDownloadLoader(state: any, payload: any) {
    state.downloadLoader = payload;
  },
  setMailLogs(state: any, payload: any) {
    state.mailLogs = payload;
  },
  setPageNum(state: any, payload: any) {
    state.pageNum = payload;
  },
  setLoginType(state: any, payload: any) {
    state.loginType = payload;
  },
  setIsMailDial(state: any, payload: any) {
    state.isMailDial = payload;
  },
  setAccessLogType(state: any, payload: any) {
    state.accessLogType = payload;
  },
  setDistinctUrl(state: any, payload: any) {
    state.distinctUrl = payload;
  },
  setLoaderKey(state: any, payload: any) {
    state.loaderKey = payload;
  },
  setIpo_Loader(state:any, payload:any){
    state.ipo_Loader = payload
  },
  setIpoData(state:any, payload:any){
    state.ipoData = payload
  },
  setMf_loader(state:any, payload:any){
    state.mf_loader = payload
  },
  setMfData(state:any, payload:any){
    state.mfData = payload
  },
};

const actions = {
  async getAccessLogDetails( {commit}: any, payload: object) {
    commit("setLoader", true);

    await httpService
      .getAccessLog(payload)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status.toString().trim() == "Ok" &&
          response.data.message.toString().trim() != "No Records Found"
        ) {

          response.data.result.forEach((element:any) => {
            // let inTimeFormat = '';

            function formatedDate(data:any) {
              const originalDate = new Date(data);
              const formattedDate = `${originalDate.getDate().toString().padStart(2, '0')}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
              return formattedDate
            }
            // if (element.in_time) {
            //     let tempDate = new Date(element.in_time).getDate();
            //     let tempMonth = (new Date(element.in_time).getMonth() + 1);
            //     let tempYear = new Date(element.in_time).getFullYear();
            //     let tempHour = (new Date(element.in_time).getHours()).toString().padStart(2, '0');
            //     let tempMins = (new Date(element.in_time).getMinutes()).toString().padStart(2, '0');
            //     let tempSecs = (new Date(element.in_time).getSeconds()).toString().padStart(2, '0');
        
            //     inTimeFormat = `${tempYear}-${tempMonth > 9 ? tempMonth : `0${tempMonth}`}-${tempDate > 9 ? tempDate : `0${tempDate}`} ${tempHour}:${tempMins}:${tempSecs}`;
            // }
            // element.in_time = inTimeFormat;
            let temp = element.in_time.includes('T') && element.in_time.includes('.') ?  element.in_time.split('.')[0].toString().replace('T', ' '): element.in_time
            element.in_time = formatedDate(temp)
        
            let outTimeFormat = '';
            if (element.out_time) {
                let tempDate = new Date(element.out_time).getDate();
                let tempMonth = (new Date(element.out_time).getMonth() + 1);
                let tempYear = new Date(element.out_time).getFullYear();
                let tempHour = (new Date(element.out_time).getHours()).toString().padStart(2, '0');
                let tempMins = (new Date(element.out_time).getMinutes()).toString().padStart(2, '0');
                let tempSecs = (new Date(element.out_time).getSeconds()).toString().padStart(2, '0');
        
                outTimeFormat = `${tempYear}-${tempMonth > 9 ? tempMonth : `0${tempMonth}`}-${tempDate > 9 ? tempDate : `0${tempDate}`} ${tempHour}:${tempMins}:${tempSecs}`;
            }
            element.out_time = outTimeFormat;
        })
          
          commit('setAccessLogDetails', response.data.result)
        } else {
          commit('setAccessLogDetails', '')
          
          notify({
            group: "auth",
            type: "error",
            title: `${response.data.message}`,
          });
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getDistinctUrl({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getDistinctUrl()
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          let distinctarray = response.data.result;
          distinctarray = distinctarray.filter(
            (value: any, index: any) => distinctarray.indexOf(value) === index
          );
          distinctarray.unshift('All')
          commit("setDistinctUrl", distinctarray);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async callPayoutReport({ commit }: any, payload: Object) {
    commit("setLoader", true);
    httpService
      .getPayoutDetails(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status.toString().trim() == "Ok" &&
          resp.data.message.toString().trim() == "Success" &&
          resp.data.result &&
          resp.data.result.length > 0
        ) {
          commit("setPayOutDetails", resp.data.result);
        } else {

          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
          commit("setPayOutDetails", []);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  downloadFile({ commit }: any, payload: any) {
    commit("setDownloadLoader", true);
    httpService
      .payOutDownload(payload)
      .then((resp) => {
        if (resp.status == 200 && resp.data) {
          const el = (sel: string, par?: any): Element =>
            (par || document).querySelector(sel);
          const elNew = (tag: string, prop?: any): HTMLAnchorElement =>
            Object.assign(document.createElement(tag), prop);

          const file = new Blob([resp.data], { type: "text/plain" });
          const href = URL.createObjectURL(file);
          const elAnchor = elNew("a", { href, download: "payoutDetails.txt" });
          el("body").append(elAnchor);
          elAnchor.click();
          elAnchor.remove();
          URL.revokeObjectURL(href);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setDownloadLoader", false);
        commit("setIsMailDial", false);
      });
  },

  async sendNewScript({ commit }: any, payload: Object) {
    commit("setLoader", true);
    await httpService
      .sendNewScript(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status == "Ok" &&
          resp.data.message.toString().trim() == "Success" &&
          resp.data.result[0].toString().trim() != "No Records Found" &&
          resp.data.result.length > 0
        ) {
          commit("setAddNewScript", resp.data.result);
          notify({
            group: "auth",
            type: "success",
            title: `${resp.data.result[0]}`,
          });
        } else if (resp.data.result[0].toString().trim() == "No Records Found") {
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.result[0]}`,
          });
        } else {
          commit("setAddNewScript", []);
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async callFeedbackReport({ commit }: any, payload: Object) {
    commit("setLoader", true);
    httpService
      .getFeedbackDetails(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status == "Ok" &&
          resp.data.message.toString().trim() == "Success" &&
          resp.data.result[0].toString().trim() != "No Records Found" &&
          resp.data.result.length > 0
        ) {
          commit("setFeedbackDetails", resp.data.result);
        } else if (resp.data.result[0].toString().trim() == "No Records Found") {
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.result[0]}`,
          });
        } else {
          commit("setFeedbackDetails", []);
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  feedbackdownloadFile({ commit }: any, payload: any) {
    commit("setDownloadLoader", true);
    httpService
      .FeedbackDownload(payload)
      .then((resp) => {
        if (resp.status == 200 && resp.data) {
          const el = (sel: string, par?: any): Element =>
            (par || document).querySelector(sel);
          const elNew = (tag: string, prop?: any): HTMLAnchorElement =>
            Object.assign(document.createElement(tag), prop);

          const file = new Blob([resp.data], { type: "text/plain" });
          const href = URL.createObjectURL(file);
          const elAnchor = elNew("a", {
            href,
            download: "FeedbackDetails.txt",
          });
          el("body").append(elAnchor);
          elAnchor.click();
          elAnchor.remove();
          URL.revokeObjectURL(href);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setDownloadLoader", false);
        commit("setIsMailDial", false);
      });
  },

  async getResponseLog({ state, commit }: any, payload: object) {
    commit("setLoader", true);
    await httpService
      .getResponseLog(payload)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status.toString().trim() == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          state.accessLogDetails = response.data.result;
        } else {
          state.accessLogDetails = "";
          notify({
            group: "auth",
            type: "error",
            title: `${response.data.message}`,
          });
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getSmsLogsData({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getSmsLogsData()
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
         let mailSmsDetails = response.data.result;
         commit("setSmsLogsDetails", mailSmsDetails);
        } 
        else{
          commit("setSmsLogsDetails",[]);
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getEmailLogsData({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getEmailLogsData()
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
         let emailLogsDetails = response.data.result;
         commit("setEmailLogsDetails", emailLogsDetails );
        } 
        else{
          commit("setEmailLogsDetails",[]);
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
        }
      }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getIPOlist({commit}:any, payload:any){
    commit('setIpo_Loader', true)
   await httpService.getIPoList(payload).then(async resp => {
      let ipoData: any = ''
      if(resp.status == 200 && resp.data.status == "Ok" && resp.data.message == "Success" && resp.data.result && resp.data.result.length > 0){
        ipoData = resp.data.result[0]
      }
     await commit('setIpoData', ipoData)
    }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit('setIpo_Loader', false)
      });
  },
  async callgetMfDetails({commit}:any, payload:any){
    commit('setMf_loader', true)
    await httpService.getMfDetails(payload).then(async resp => {
      let mfData: any = ''
      if(resp.status == 200 && resp.data.status == "Ok" && resp.data.message == "Success" && resp.data.result && resp.data.result.length > 0){
        mfData = resp.data.result[0]
      }
     await commit('setMfData', mfData)
    }, (error)=>{
        errHandle.methods.errorHandle(error);
      })
      .finally(() => {
        commit('setMf_loader', false)
      });
  }
};

const getters = {
  getLogDeatails: (state: { accessLogDetails: any }) => state.accessLogDetails,
  getIsAccessLog: (state: { isAccessLog: any }) => state.isAccessLog,
  getAccessRow: (state: { accessRow: any }) => state.accessRow,
  getLoader: (state: { loader: any }) => state.loader,
  getMailLogs: (state: { mailLogs: any }) => state.mailLogs,
  getPageperData: (state: any) => {
    let from = state.pageNum * state.perPage - state.perPage;
    let to = state.pageNum * state.perPage;
    return state.accessLogDetails.slice(from, to);
  },
  getAccessLogType: (state: any) => state.accessLogType,
  getDistinctUrl: (state: any) => state.distinctUrl,
  getLoaderKey: (state: any) => state.loaderKey,
  getEmailLogsDetails: (state:any ) => state.emailLogDetails,
  getSmsLogsDetails: (state:any) => state.SmsLogDetails,

};

const accessLog = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default accessLog;
