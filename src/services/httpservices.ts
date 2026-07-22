import axios from "axios";
import { env } from "../env";
import store from "../store";
// import store from "../store";

const AXIOS = axios.create({
  baseURL: env().BASEURL,
});

 
function mwHeaders() {
  return {
    headers: { Authorization: "Bearer " + store.state.sessionId },
  };
}
export const httpService = {
  getUserBankDetails,
  getMarketWatchData,
  getDistinctUrl,
  getAccessLog,
  getResponseLog,
  getPayoutDetails,
  getFeedbackDetails,
  FeedbackDownload,
  payOutDownload,
  getTopViewedPage,
  getVisitorsPerDay,
  getUserLogDetails,
  getVersionList,
  getproductlist,
  getNewlyAddedSymbols,
  getDeactivatedSymbols,
  getDuplicateSymbols,
  sendPushNotification,
  sendNewScript,
  getVendors,
  authorizeVendor,
  addMobileVersion,
  deleteMobileVersion,
  updateMobileVersion,
  getMobileVersion,
  getUserDetails,
  updateUserDetails,
  getUserCountDetails,
  addUserKeyCloak,
  ssoLogin,
  getUserCount,
  getContractMasterData,
  updateSettingsAction,
  resetCache,
  getSipDetails,
  getSipOrderDetails,
  getSipLogs,
  getSipCountDetails,
  getHousingLoanData,
  getPropertyLoanData,
  getSecuritiesLoanData,
  getEnterprisesLoanData,
  getUserRecordData,
  getSmsLogsData,
  getEmailLogsData,
  getHoliday,
  addHoliday,
  deleteHoliday,
  getUpdateAdminuser,
  getDeleteAdminuser,
  unblockUser,
  getIPoList,
  getMfDetails,
  getSearchList,
  createBasketNotification,
  getContractInfo,
  getFileUpload,
  getFileSubmit,
  getResearch,
  getStatusList,
  updateBoStatus,
  tradeCallPreview,
  tradeCallCreate,
  tradeCallModify,
  getOrderCount,
  getUserOrderCount,
  getFileUploadDetails,
  getPositionAvgDetails,
  getOrderLogs,
  deleteResearcall,
  getPaymentLogs,
  getHoldingSession,
  getHoldingControls,
  updateHoldingControls,
  updateHoldingSession,
  createHoldingSession,
  deleteHoldingSession,
  createThematicBasket,
  modifyThematicBasket,
  deleteThematicBasket,
  getAllThematicBasket,
  getSelectedThematicBasket,

  //AMO Controls
  getAmoSession,
  getAmoControls,
  updateAmoControls,
  updateAmoSession,
  createAmoSession,
  deleteAmoSession,
  getAmoHolidays,

  getPredefinedMw,
  deleteAdminWatchScrips,
  addWatchScrips,
  getUserSipDetails,

  createPredefinedMw,

  //Research Basket Report
  getCumulativeBasketReport,
  getDaywiseBasketReport,
  updateCorporateAction,
};

function getHoliday() {
  return AXIOS.get("adrest/tdholiday/getHoliday", headers(true));
}

function addHoliday(payload: any) {
  return AXIOS.post("adrest/tdholiday/insertHoliday", payload, headers(true));
}
function deleteHoliday(payload: any) {
  return AXIOS.post("adrest/tdholiday/deleteHoliday", payload, headers(true));
}
function getContractMasterData(payload: any) {
  return AXIOS.post("adrest/contract/get", payload, headers(true));
}

function getMarketWatchData(payload: any) {
  return AXIOS.post("adrest/report/getMarketWatchdata", payload, headers(true));
}

function getUserBankDetails(payload: any) {
  return AXIOS.post("adrest/report/getUserBankDetails", payload, headers(true));
}

function getAccessLog(payload: any) {
  return AXIOS.post(`adrest/log/getaccesslog`, payload, headers(true));
}

function getDistinctUrl() {
  return AXIOS.get("adrest/admin/getDistinctUrl", headers(true));
}

function getResponseLog(payload: any) {
  return AXIOS.post(`adrest/log/getrestlogs`, payload, headers(true));
}

function getPayoutDetails(payload: any) {
  return AXIOS.post("adrest/payment/getPayoutDetails", payload, headers(true));
}

function getFeedbackDetails(payload: any) {
  return AXIOS.post("fbrest/feedback/getFeedback", payload, headers(true));
}

function payOutDownload(payload: any) {
  return AXIOS.post(
    "adrest/payment/downloadPayoutDetails",
    payload,
    headers(true)
  );
}

function FeedbackDownload(payload: any) {
  return AXIOS.post(
    "adrest/payment/downloadFeedbackDetails",
    payload,
    headers(true)
  );
}

function headers(isBearer: boolean) {
   if(isBearer){

        }
  return {
    
    
    headers: {
          "Content-Type": "application/json",
        }

       
    
    // isBearer
    //   ? {
    //       Authorization: "Bearer " + store.state.sessionId,
    //     }
    //   : {
    //       "Content-Type": "application/json",
    //     },
  };
}

function getTopViewedPage() {
  return AXIOS.get("adrest/admin/getUrlBasedRecords", headers(true));
}

function getVisitorsPerDay() {
  return AXIOS.get("adrest/admin/userLogDetails", headers(true));
}

function getUserLogDetails() {
  return AXIOS.get("adrest/admin/userLogDetails", headers(true));
}

function getVersionList() {
  return axios.get("mobileVersion.json", headers(true));
}

//
function getUserRecordData(payload: any) {
  return AXIOS.get(`adrest/admin/userecord/${payload}`, headers(true));
}

function getproductlist() {
  return AXIOS.get("adrest/product/get/mtfpreference", headers(true));
}

function getNewlyAddedSymbols() {
  return AXIOS.get("adrest/contract/get/newlyadd", headers(true));
}

function getDeactivatedSymbols() {
  return AXIOS.get("adrest/contract/get/deactivated", headers(true));
}

function getDuplicateSymbols() {
  return AXIOS.get("adrest/contract/getDuplicateList", headers(true));
}

function sendPushNotification(payload: any) {
  return AXIOS.post("/adrest/com/msg/send", payload, headers(true));
}

// tradecalls

function getSearchList(payload: Object) {
  return AXIOS.post(`scrip-rest/scrip/search`, payload);
}

function createBasketNotification(payload: any) {
  return AXIOS.post(
    `research-rest/tradecall/create/researchcall`,
    payload
  );
}

function getContractInfo(payload: any) {
  return AXIOS.post(`/scrip-rest/scrip/contract/info`, payload);
}

function sendNewScript(payload: any) {
  return AXIOS.post(
    "/adrest/contract/addContractMaster",
    payload,
    headers(true)
  );
}

function getVendors(payload: any) {
  return AXIOS.post("/adrest/com/getVendors", payload, headers(true));
}

function authorizeVendor(payload: any) {
  return AXIOS.post("/adrest/com/updateAuthorize", payload, headers(true));
}

function addMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/add", payload, headers(true));
}

function deleteMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/delete", payload, headers(true));
}

function updateMobileVersion(payload: any) {
  return AXIOS.post("/adrest/com/version/update", payload, headers(true));
}

function getMobileVersion() {
  return AXIOS.get("/adrest/com/version/get", headers(true));
}
//

function getUserCountDetails() {
  return AXIOS.get("adrest/user/login/details", headers(true));
}

function getUserDetails(payload: any) {
  return AXIOS.post("adrest/com/getKcUserDetails", payload, headers(true));
}

function updateUserDetails(payload: any) {
  return AXIOS.post("adrest/com/updateKcUserDetails", payload, headers(true));
}

function getUpdateAdminuser(payload: any) {
  return AXIOS.post(`adrest/com/updateAdminUser`, payload, headers(true));
}

function getDeleteAdminuser(payload: any) {
  return AXIOS.post(`adrest/com/deleteAdminUser`, payload, headers(true));
}

function updateSettingsAction(payload: any) {
  return AXIOS.post(
    "adrest/product/update/mtfpreference",
    payload,
    headers(true)
  );
}

function addUserKeyCloak(payload: any) {
  return AXIOS.post("adrest/com/addNewUser", payload, headers(true));
}

function ssoLogin(payload: any) {
  return AXIOS.post(
    `auth-rest/admin/pwd/validatenew`,
    payload,
    headers(true)
  );
}

//Get user count
function getUserCount() {
  return AXIOS.get("adrest/user/login/details", headers(true));
}

// reset in add new scrip
function resetCache(jsonObj: any) {
  return AXIOS.post(`adrest/contract/reloadcache`, jsonObj, headers(true));
}

function getSipDetails(payload: any) {
  return AXIOS.post(
    `adrest/report/get`,
    payload,
    headers(true)
  );
}

function getSipOrderDetails(payload: any) {
  return AXIOS.get(
    `adrest/report/info/${payload}`,
    headers(true)
  );
}

function getSipLogs(payload: any) {
  return AXIOS.post(`adrest/report/getSipLogs`, payload, headers(true));
}

function getSipCountDetails() {
  return AXIOS.get(`adrest/report/getSipCountDetails`, headers(true));
}

function getHousingLoanData(payload: any) {
  return AXIOS.post(`adrest/loan/get/housing`, payload, headers(true));
}

function getPropertyLoanData(payload: any) {
  return AXIOS.post(`adrest/loan/get/Property`, payload, headers(true));
}

function getSecuritiesLoanData(payload: any) {
  return AXIOS.post(`adrest/loan/get/Securities`, payload, headers(true));
}

function getEnterprisesLoanData(payload: any) {
  return AXIOS.post(
    `adrest/loan/get/MediumEnterprises`,
    payload,
    headers(true)
  );
}

function getSmsLogsData() {
  return AXIOS.get(`adrest/emailsms/getsmslogs`, headers(true));
}

function getEmailLogsData() {
  return AXIOS.get(`adrest/emailsms/getemaillogs`, headers(true));
}

function unblockUser(payload: any) {
  return AXIOS.get(`adrest/get/unBlock?userId=${payload}`, headers(true));
}

function getIPoList(payload: any) {
  return AXIOS.post(`adrest/report/getIpoOrderReport`, payload, headers(true));
}

function getMfDetails(payload: any) {
  return AXIOS.post(`adrest/report/getMfOrderDetails`, payload, headers(true));
}

function getFileUpload(payload: any) {
  return AXIOS.post(
    "/po-rest/positionfile/loadPositionAvgFile",
    payload,
    headers(true)
  );
}
function getFileSubmit() {
  return AXIOS.get(
    "/po-rest/positionfile/insertPositionAvgFile",
    headers(true)
  );
}

function getResearch(payload: any) {
  return AXIOS.post(
    "/research-rest/tradecall/get/all",
    payload
  );
}

function getStatusList() {
  return AXIOS.get("research-rest/tradecall/getUniqStatus");
}

function updateBoStatus(payload: any) {
  return AXIOS.post("/bo-rest/research/updateStatus", payload,);
}

function tradeCallPreview(payload: any) {
  return AXIOS.post(
    "research-rest/tradecall/preview/researchcall",
    payload
  );
}

function tradeCallCreate(payload: any) {
  return AXIOS.post(
    "research-rest/tradecall/create/researchcall",
    payload
  );
}

function tradeCallModify(payload: any) {
  return AXIOS.post(
    "/adrest/research/modifiedcalllnotification",
    payload,
    headers(true)
  );
}

function getOrderCount(payload: any) {
  return AXIOS.post("/adrest/report/getOrderDetails", payload, headers(true));
}
function getUserOrderCount(payload: any) {
  return AXIOS.post("/adrest/report/getUserOrderCount", payload, headers(true));
}

function getFileUploadDetails(payload: any) {
  return AXIOS.post(
    "/adrest/report/getFileUploadDetails",
    payload,
    headers(true)
  );
}
function getPositionAvgDetails(payload: any) {
  return AXIOS.post(
    "/adrest/report/getPositionAvgUser",
    payload,
    headers(true)
  );
}
function getPaymentLogs(payload: any) {
  return AXIOS.post("adrest/report/getPaymentLog", payload, headers(true));
}
function getCumulativeBasketReport(payload: any) {
  return AXIOS.post(
    "adrest/report/cumulativeBasketReport",
    payload,
    headers(true)
  );
}
function getDaywiseBasketReport(payload: any) {
  return AXIOS.post(
    "adrest/report/dayWiseBasketReport",
    payload,
    headers(true)
  );
}
function updateCorporateAction(payload: any) {
  return AXIOS.post(
    "adrest/report/updateCorporateAction",
    payload,
    headers(true)
  );
}
function getOrderLogs() {
  return AXIOS.get(`/adrest/log/getorderlogs`, headers(true));
}

function deleteResearcall(payload: Object) {
  return AXIOS.post(
    `research-rest/tradecall/delete`,
    payload
  );
}


//HOLDING CONTROLS
function getHoldingSession() {
  return AXIOS.get("adrest/holdingsPreference/getsession", headers(true));
}
function getHoldingControls() {
  return AXIOS.get("adrest/holdingsPreference/getcontrol", headers(true));
}
function updateHoldingControls(payload: Object) {
  return AXIOS.post("adrest/holdingsPreference/updatecontrol", payload, headers(true));
}
function updateHoldingSession(payload: Object) {
  return AXIOS.post("adrest/holdingsPreference/updatesession", payload, headers(true));
}
function createHoldingSession(payload: Object) {
  return AXIOS.post("adrest/holdingsPreference/addsession", payload, headers(true));
}
function deleteHoldingSession(payload: Object) {
  return AXIOS.post("adrest/holdingsPreference/deletesession", payload, headers(true));
}
function createThematicBasket(payload: Object) {
  return AXIOS.post("research-rest/admin/thematic/create", payload)
}
function modifyThematicBasket(payload: Object) {
  return AXIOS.post('research-rest/admin/thematic/modify', payload)
}
function deleteThematicBasket(basketId: any) {
  return AXIOS.get(`research-rest/admin/thematic/delete/${basketId}`)
}
function getAllThematicBasket(payload: Object){
  return AXIOS.post("research-rest/admin/thematic/get", payload)
}
function getSelectedThematicBasket(basketId:any ) {
  return AXIOS.get(`research-rest/admin/thematic/get/${basketId}`)
}

function getAmoSession() {
  return AXIOS.get("adrest/amo/getsession", headers(true));
}
function getAmoControls() {
  return AXIOS.get("adrest/amo/getcontrol", headers(true));
}
function updateAmoControls(payload: Object) {
  return AXIOS.post("adrest/amo/updatecontrol", payload, headers(true));
}
function updateAmoSession(payload: Object) {
  return AXIOS.post("adrest/amo/updatesession", payload, headers(true));
}
function createAmoSession(payload: Object) {
  return AXIOS.post("adrest/amo/addsession", payload, headers(true));
}
function deleteAmoSession(payload: Object) {
  return AXIOS.post("adrest/amo/deletesession", payload, headers(true));
}
function getAmoHolidays() {
  return AXIOS.get("adrest/amo/get/holidaydata", headers(true));
}

function getPredefinedMw(payload:Object) {
  return AXIOS.post("mw-new/advance/mw", payload, mwHeaders());
}
function deleteAdminWatchScrips(payload: any) {
  return AXIOS.post("mw-new/pre-def/mw/deletescrips", payload, mwHeaders());
}
function addWatchScrips(payload: any) {
  return AXIOS.post("mw-new/pre-def/mw/addscrips", payload, mwHeaders());
}

function getUserSipDetails() {
  return AXIOS.get("adrest/report/getUserSipDetails", headers(true));
}


function createPredefinedMw(payload:Object) {
  return AXIOS.post("mw-new/pre-def/mw/create", payload, mwHeaders());
}