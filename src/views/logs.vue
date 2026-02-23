<style>
/* tr,
td,
th {
    @apply border border-collapse p-2
} */
</style>

<template>
  <div>
    <div class="flex items-center">
      <tab-menu @activeTab="changeTab" />
      <div class="flex h-10 w-10 pt-3">
        <CommonLoader v-if="loader"></CommonLoader>
      </div>
    </div>

    <div class="p-4 h-full" v-if="validTab == 0">
      <div class="card p-5 border rounded bg-white shadow-sm">
        <div class="mb-4 gap-2 flex flex-wrap ">
          <div>
            <p class="primaryColor pb-1 ml-2 text-sm">UserId</p>
            <input type="text" ref="userID" v-model="userId" autocomplete="off" maxlength="10" id="logsId"
              class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs" />
          </div>

          <div>
            <p class="primaryColor pb-1 text-sm ml-2">Log Type *</p>

            <Listbox as="div" v-model="accessLogType" class=" min-w-[200px] h-10 focus:outline-0 text-xs">
              <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
              <div class="relative">
                <ListboxButton
                  class="relative w-full h-10 cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border  sm:text-sm sm:leading-6 ">
                  <span class="block truncate">{{ accessLogType.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                    <ListboxOption as="template" v-for="stock in logtypes" :key="stock.id" :value="stock"
                      v-slot="{ active, accessLogType }">
                      <li
                        :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-black', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                        <span :class="[accessLogType ? 'font-semibold' : 'font-normal', 'block truncate']">{{
        stock.name
      }}</span>

                        <span v-if="accessLogType"
                          :class="[active ? 'text-black' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>

          </div>

          <div v-if="accessLogType.name == 'AccessLog'">

            <div v-if="getDistinctUrl.length > 0">
              <p class="primaryColor pb-1 text-sm ml-2">URL</p>

              <Combobox autocomplete:off as="div" v-model="uri" class="min-w-[200px] h-10 focus:outline-0 text-xs">
                <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                <div class="relative">

                  <ComboboxInput @change="searchTerm = $event.target.value"
                    class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs" />
                  <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
                    <!-- <span class="block truncate">{{ uri }}</span> -->
                    <ChevronUpDownIcon class="h-5 w-5 cursor-pointer text-gray-400 c" aria-hidden="true" />

                  </ComboboxButton>

                  <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ComboboxOptions v-if="getDistinctUrl.length > 0"
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                      <ComboboxOption as="template" v-for="(item, index) in filteredItems" :key="index" :value="item"
                        v-slot="{ active, accessLogType }">
                        <li
                          :class="[active ? 'bg-[#d1d1d185] text-black' : 'text-black', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                          <span class="text-xs"
                            :class="[accessLogType ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item
                            }}</span>

                          <span v-if="accessLogType"
                            :class="[active ? 'text-black' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ComboboxOption>
                    </ComboboxOptions>
                  </transition>
                </div>
              </Combobox>
            </div>
            <div v-else>
              <p class="primaryColor pb-1 text-sm ml-2">URL</p>
              <input type="text" ref="URI" v-model="uri" autocomplete="off" maxlength="10"
                class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />
            </div>
          </div>
          <div>
            <label class="primaryColor pb-1 text-sm ml-2">{{accessLogType.name == 'AccessLog' ? 'From Date' : 'Date and Time' }} *</label>

            <VDatePicker type="date" :max-date="new Date().toISOString().slice(0, 10)" :min-date="getMinDate()"
              v-model="fromDate" is-required :popover="popover" :masks="{
        input: 'DD-MM-YYYY HH:mm:ss',
        modelValue: 'DD-MM-YYYY HH:mm:s',
      }" mode="dateTime" is24hr :dateFormat="'DD-MM-YYYY HH:mm:ss'">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                  <input :value="inputValue" placeholder="DD-MM-YYYY HH:mm:ss" v-on="inputEvents"
                    class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                  <button type="button"
                    class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                    @click="() => togglePopover()">
                    <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>
          <div v-if="accessLogType.name == 'AccessLog'">
            <label class="primaryColor pb-1 text-sm ml-2">To Date *</label>
            <VDatePicker type="datetime-local" :max-date="today" :min-date="fromDate" v-model="toDate" is-required
              :popover="popover" :masks="{
        input: 'DD-MM-YYYY',
        modelValue: 'DD-MM-YYYY',
      }" mode="dateTime" is24hr :dateFormat="'DD-MM-YYYY'">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                  <input :value="inputValue" placeholder="DD-MM-YYYY" v-on="inputEvents"
                    class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                  <button type="button"
                    class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                    @click="() => togglePopover()">
                    <Icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>
          <div class="flex justify-end pt-6 gap-2">
            <div class="min-w-[120px] h-10">
              <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                :disabled="getLoader" @click="getReports('table')">
                <p v-if="!getLoader">Submit</p>
                <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                  xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="logtre && logtre.length > 0" class="flex items-end">
            <button type="button" :disabled="getLoader"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
              @click="downloadNew(logtre, keys[accessLogType.name], userId ? `${userId}_${accessLogType.name}` : accessLogType.name)">
              <p>Download</p>
              <!-- <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg> -->
            </button>
          </div>
        </div>
        <div class="h-full" v-if="logtre && !getLoader &&  logtre.length > 0">
          <!-- <div class="flex-grow overflow-auto h-[20px]"></div> -->

          <table class="w-full border rounded table-fixed h-full cursor-pointer">
            <thead>
              <tr v-if="accessLogType.name == 'AccessLog'" class="border-b border-[#ededed] text-[13px]">
                <th v-for="head in header" class=" border-r">
                  {{ head.name }}
                </th>
              </tr>
              <tr v-if="accessLogType.name == 'RestLog'" class="border-b border-[#ededed] text-[13px]">
                <th v-for="head in header1" class=" border-r">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="h-[100px]">
              <tr class="border-b border-[#ededed] text-sm" v-for="(item, index) in logtre" :key="index"
                @click="getRsponseBody(item)">
                <td class="truncate text-center border-r">
                  {{ item.user_id || item.userId }}
                </td>
                <td class="truncate text-center border-r" :title="item.uri || item.url">
                  {{ item.uri || item.url }}
                </td>
                <td class="truncate text-center border-r">
                  {{ item.createdOn || item.created_on }}
                </td>
                <td class="truncate text-center border-r">{{ item.method }}</td>
                <td class="truncate border-r">
                  {{ item.req_body || item.reqBody }}
                </td>
                <td class="truncate">{{ item.res_body || item.resBody }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-end mt-4 gap-4" >
            <div class="flex items-center ">
              <div class="primaryColor text-sm mr-2">Rows Per Page : </div>
              <!-- <select v-model="rowsCount"
                class="border h-10 rounded focus:outline-0 px-4 text-xs cursor-pointer ring-1 ring-inset ring-gray-300"
                @change="getReports('table')">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
              </select> -->
              <Listbox as="div" v-model="rowsCount" class="h-10 focus:outline-0 text-xs">
                <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                <div class="relative">
                  <ListboxButton id="logs_drop_down" @mouseenter="getWidth('logs_drop_down')"
                    class="relative w-[100px] h-10 cursor-pointer bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded  sm:text-sm sm:leading-6 ">
                    <span class="block truncate">{{ rowsCount }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>

                  <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm"
                      :class="isBottom ? 'bottom-[40px]' : ''">
                      <ListboxOption as="template" v-for="option in rowsPerPage.slice(0, rowsCount)" :key="option.id"
                        :value="option.option" v-slot="{ active, selectedExchangeData }">
                        <li
                          :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                          <span :class="[selectedExchangeData ? 'font-semibold' : 'font-normal', 'block truncate']">
                            {{ option.option }}
                          </span>

                          <span v-if="selectedExchangeData"
                            :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                            <CheckIcon class="h-5 w-5 " aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
            <nav class="isolate inline-flex space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="goBack()"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="page == 1 ? 'cursor-not-allowed' : ''">
                <!-- class="sr-only" -->
                <Icons name="leftArrow" />
                <!-- <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /> -->
              </a>
              <a class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer"
                :class="page == cpage
        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
        " v-for="(cpage, id) in pages" :key="id" @click="changePage(cpage)">{{ cpage }}</a>
              <a @click="forward()"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <Icons name="rightArrow" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <accesslog />

  </div>
  <smsLogs @smslogs_header="setHeader" v-if="validTab == 2" />
  <mailsLogs @maillogs_header="setHeader" v-if="validTab == 1" />
  <ipo_log v-if="validTab == 4" />
  <mfLogs v-if="validTab == 3" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import accesslog from "../components/dialog/responseLog.vue";
import mailsLogs from "./mail/mails-logs.vue";
import smsLogs from "./mail/sms-logs.vue";
import CommonLoader from "../components/commonLoader.vue";
import noData from "../components/no-data.vue";
import Icons from "../components/icons.vue";
import commonFunc from "../mixins/commonFunc";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, ComboboxInput } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

import ipo_log from "./ipo_log.vue";
import mfLogs from "./mfLogs.vue"

export default defineComponent({
  setup() {
    const today = new Date();
    const fromDate = ref();
    const hours = ref("");
    const minutes = ref("");
    const maxDateToDate = ref("");
    const toDate = ref();
    const userId = ref("");
    const fromTime = ref("");
    const toTime = ref("");
    const page = ref(1);
    const perPage = ref(20);
    const pages = ref(2);
    const tabs = ref(["Accesslog", "Mail/SMS"]);
    const value = ref("");
    const uri = ref('');
    const list = ref([]);
    const query = ref('');

    const eventtimeSpecific = new Date();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const logtypes = [
      { id: 1, name: "AccessLog" },
      { id: 2, name: "RestLog" },
    ];
    const accessLogType = ref(logtypes[0]);
    const logType = ref(logtypes[0]);
    const rowsCount = ref(20);
    const header = ref([
    { name: "User Id", csvKey: "user_id" },
      { name: "URL", csvKey: "uri" },
      { name: "CreatedOn", csvKey: "created_on" },
      { name: "Method", csvKey: "method" },
      { name: "Request", csvKey: "req_body" },
      { name: "Response", csvKey: "res_body" },
    ]);
    const header1 = ref([
    { name: "User Id", csvKey: "userId" },
      { name: "URL", csvKey: "url" },
      { name: "CreatedOn", csvKey: "createdOn" },
      { name: "Method", csvKey: "method" },
      { name: "Request", csvKey: "reqBody" },
      { name: "Response", csvKey: "resBody" },
    ]);
    const validTab = ref(0);
    const activeTabData = ref([]);
    const searchTerm = ref('')
    const logtre = ref()
    const temporaryactivepage = ref(1)
    const rowsPerPage = ref([
      { id: 1, option: 10 },
      { id: 2, option: 20 },
      { id: 3, option: 30 },
      { id: 4, option: 50 }
    ]);
    const keys: any = ref({
      AccessLog: {
        userId: 'user_id',
        URL: 'uri',
        CreatedOn: 'created_on',
        Method: 'method',
        Request: 'req_body',
        Response: 'res_body'
      },
      RestLog: {
        userId: 'userId',
        URL: 'url',
        CreatedOn: 'createdOn',
        Method: 'method',
        Request: 'reqBody',
        Response: 'resBody'
      },
    })
    const isBottom = ref(false)
    return {
      today,
      fromDate,
      hours,
      minutes,
      maxDateToDate,
      toDate,
      userId,
      fromTime,
      toTime,
      page,
      perPage,
      pages,
      tabs,
      logType,
      value,
      uri,
      accessLogType,
      popover,
      eventtimeSpecific,
      logtypes,
      rowsCount, header, header1, keys,
      validTab,
      activeTabData,
      list,
      query,
      searchTerm,
      logtre,
      temporaryactivepage,
      rowsPerPage,
      isBottom
    };
  },
  methods: {
    downloadCsv() {
      if (this.accessLogType.name == "AccessLog") {
        this.downloadUnicodeCSV(
          this.logtre,
          "Accesslog",
          this.header
        );
      }
      else {
        this.downloadUnicodeCSV(
          this.logtre,
          "RestLog",
          this.header1
        );
      }
    },
    downloadLogsCsv() {
      this.downloadUnicodeCSV(this.activeTabData, this.validTab, this.header);
    },
    setHeader(val: any) {
      this.header = val.header;
      this.activeTabData = val.data;
    },
    getMinDate() {
      let date = new Date();
      let newMonth = date.getMonth() - 1;
      date.setMonth(newMonth);
      return date.toISOString().slice(0, 10);
    },

    async getReports(from: String) {
      if (from != "paginate") this.resetPagination();
      if (this.fromDate) {
        if (this.accessLogType.name == "AccessLog") {
          let json = {
            fromDate: this.dateFormatter(this.fromDate),
            toDate: this.dateFormatter(this.toDate),
            userId: this.userId,
            uri: this.uri == 'All' ? '' : this.uri,
            pageNo: this.page,
            pageSize: this.rowsCount,
          };
          await this.$store.dispatch("accessLog/getAccessLogDetails", json).finally(() => { this.getdata() });
        } else {
          let json = {
            userId: this.userId,
            fromDate: this.dateFormatter(this.fromDate),
            toDate: this.addTimeToDate(this.fromDate),
            pageNo: this.page,
            pageSize: this.rowsCount,
          };

          await this.$store.dispatch("accessLog/getResponseLog", json).finally(() => { this.getdata() });
        }
      } else {
        this.userId
          ? ""
          : this.$notify({
            group: "auth",
            type: "error",
            title: `Enter your User Id`,
          });
        if (!this.fromDate || !this.toDate) {
          this.$notify({
            group: "auth",
            type: "error",
            title: `Select a from Date and To date`,
          });
        }
      };
    },

    addTimeToDate(date: any) {
      // Add 1 hour, 59 minutes, and 59 seconds in milliseconds
      const timeToAdd = (59 * 60 * 1000) + (59 * 1000);

      // Create new Date object with added time
      const newDate = new Date(date.getTime() + timeToAdd);

      // Format the new date to YYYY-MM-DD HH:mm
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(newDate.getDate()).padStart(2, '0');
      const hours = String(newDate.getHours()).padStart(2, '0');
      const minutes = String(newDate.getMinutes()).padStart(2, '0');

      // Return in the desired format
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    getRsponseBody(val: any) {
      this.$store.commit("accessLog/setIsAccessLog", {
        isOpen: true,
        data: val,
      });
    },
    resetFields() {
      this.userId = "";
      this.value = "";
      this.$store.commit("accessLog/setMailLogs", []);
      this.$store.commit("accessLog/setAccessLogDetails", "");
    },

    validateRegex(val: string) {
      let email = new RegExp("^([a-z0-9_\.-]+\@[\da-z\.-]+.[a-z\.]{2,6})$");
      let mobile = new RegExp("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$");
      if (val) {
        return email.test(val) || (val.length > 6 && mobile.test(val));
      }
      return false;
    },

    changePage(cpage: any) {
      this.temporaryactivepage = cpage;
      this.page = cpage;
      this.getReports("paginate");
    },

    resetPagination() {
      this.logtre = []
      this.$store.commit("accessLog/setAccessLogDetails", "");
      this.temporaryactivepage = this.page = 1;
      this.pages = 2;
    },

    goBack() {
      if (this.page == 1) return;
      this.page -= 1;
      this.temporaryactivepage = this.page;
      this.getReports("paginate");
    },

    forward() {
      this.page += 1;
      this.temporaryactivepage = this.page;
      this.getReports("paginate");
    },
    setPreviousWeekDatetime() {
      const now = new Date();
      // now.setDate(now.getDate() - 7); // Subtract 7 days
      const year = now.getFullYear().toString().padStart(4, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours();
      this.fromDate = new Date(`${year}-${month}-${day} ${hours}:00:00`);
    },

    setCurrentDatetime() {
      this.toDate = new Date();
    },

    dateFormatter(date: any) {
      if (!date) return null;

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    async changeTab(data: any) {
      data == 0 ? await this.$store.dispatch("accessLog/getDistinctUrl") : ''
      this.validTab = data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit('setActivePageTab', data)
      this.$store.commit('setQuries', { data: { tab: data }, action: 'change' })
    },

    getdata() {
      if (this.getLogDeatails && this.getLogDeatails.length > 0) {
        this.logtre = this.getLogDeatails
        this.page = this.temporaryactivepage
        if (this.page == this.pages && this.getLogDeatails) {
          this.pages += 1;
        }
      }
    },
    getWidth(id: string) {
      if (document.getElementById(id)) {
        let heightAtPlace: any = document.getElementById(id)?.getBoundingClientRect().top
        let innerHeight: any = (window as any).innerHeight
        heightAtPlace && innerHeight && (heightAtPlace - innerHeight) < 150 ? this.isBottom = true : this.isBottom = false
      }

    },
    formatedDate(data: any) {
      const originalDate = new Date(data);
      const formattedDate = `${originalDate.getDate().toString().padStart(2, '0')}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
      return formattedDate
    }
  },
  mixins: [commonFunc],
  computed: {
    getTime() {
      let arr = [];
      for (let i = 1; i <= 24; i++) {
        arr.push(i);
      }
      return arr;
    },
    ...mapGetters("accessLog", [
      "getLogDeatails",
      "getLoader",
      "getMailLogs",
      "getDistinctUrl",
    ]),
    ...mapGetters("accessLog", { loader: "getLoader" }),

    filteredItems() {
      return this.getDistinctUrl
        .filter((user: any) => (user).toLowerCase()
          .includes(this.searchTerm.toLowerCase())
        )
    }
  },
  watch: {
    accessLogType: function (val: any) {
      this.$store.commit('accessLog/setAccessLogType', val.name == 'AccessLog')
    },
    rowsCount() {
      this.getReports('table')
    },
  },
  components: {
    accesslog,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    noData,
    Icons,
    Listbox, ListboxButton, ListboxOption, Combobox, ListboxOptions,
    ComboboxButton,
    ComboboxOption,
    ComboboxOptions,
    CheckIcon, ChevronUpDownIcon, ComboboxInput,
    smsLogs,
    mailsLogs,
    CommonLoader,
    ipo_log,
    mfLogs
  },
  async mounted() {
    this.$nextTick(() => {
      let check = document.getElementById("logsId") as HTMLElement;
      if (check) {
        check.focus();
      }
    });
    this.$store.commit("accessLog/setAccessLogDetails", "");
    this.resetFields();
  },
  async created() {
    this.$store.commit(
      "setActivePageTab",
      this.$store.state.queries["logs"].query.tab
    );
    await this.changeTab(this.$store.state.queries['logs'].query.tab);

    this.uri = this.getDistinctUrl[0];
  },

  beforeMount() {
    this.setCurrentDatetime();
    this.setPreviousWeekDatetime();
  },
  unmounted() {
    this.$store.commit("accessLog/setAccessLogDetails", "");
  },
});
</script>
