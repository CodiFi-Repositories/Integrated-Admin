<template>
  <div class="w-full flex-wrap">
    <div
      class="py-2 min-w-full sm:px-3 lg:px-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid grid-cols-12 rounded w-[100%]">
      <div class="break-after-column justify-between flex flex-wrap rounded bg-white w-full">
        <div class="pl-[15px] flex mt-[20px]">
          <p @click="backToHolidays()" class="text-sm flex font-bold mb-4 cursor-pointer primaryColor">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

            Back
          </p>
          <p class="text-sm flex font-bold mb-4 primaryColor">
            &nbsp;/ Add Holiday
          </p>
        </div>
      </div>
      <div
        class="col-span-8 bg-white sm:pl-[20px] md:pr-[130px] md:pl-[130px] lg:pl-[200px] lg:pr-[200px] sm:cols-span-1 md:cols-span-3">
        <div class="h-[80%] mt-2">
          <form id="form" class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-3"
            @submit.prevent="submitHandle()">
            <div class="pb">
              <label class="primaryColor pl-2" for="">Holiday Event</label>
              <input type="text" ref="userID" id="logsId" v-model="holiday" autocomplete="off"
                placeholder="Enter Event Name"
                class="border font-light w-full h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>

            <div class="h-4">
              <p v-if="holiday == ''" :hidden="hiddenValue" class="h-4 ml-2 mt-2 text-red-500 text-xs">
                Event name is required*
              </p>
            </div>

            <div class="pb-4 gap-4 pt-4 w-full grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="text-md font-small mb-1 primaryColor flex justify-start ml-1" for="">
                  <div class="pl-2">Sessions</div>
                </label>
                <ul class="flex text-sm font-medium text-gray-900">
                  <li v-for="item in sessions" class="w-full">
                    <div class="flex items-center ps-3">
                      <input id="vue-checkbox" type="checkbox" :value="item" v-model="selectedSessions"
                        class="w-4 h-4" />
                      <label for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item }}</label>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="">
                <label class="text-md font-small mb-1 primaryColor flex justify-start ml-1" for="">
                  <div class="pl-2">Settlement Holiday</div>
                </label>
                <div class="columns-2 flex justify-start gap-x-2">
                  <label class="pt-2 align-center cursor-pointer">
                    <input type="radio" name="weektag" v-model="settlementHoliday" value="1"
                      class="display-block w-[30px] p-3 cursor-pointer" />Yes</label>
                  <label class="pt-2 align-center cursor-pointer">
                    <input type="radio" name="settlementHoliday" v-model="settlementHoliday" value="0"
                      class="display-block w-[30px] p-3 cursor-pointer" />No</label>
                </div>
              </div>
            </div>
            <div class="pb-4">
              <div>
                <label class="text-md font-small mb-1 primaryColor flex justify-start ml-1" for="">
                  <div class="pl-2">Exchanges</div>
                </label>
                <ul class="flex flex-wrap max-w-[100%] text-sm font-medium text-gray-900">
                  <li v-for="item in exchanges" class="">
                    <div class="flex items-center ps-3">
                      <input id="vue-checkbox" type="checkbox" :value="item" v-model="selectedExchanges"
                        class="w-4 h-4" />

                      <label for="vue-checkbox"
                        class="w-full pt-[1px] w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item
                        }}</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="pb-4 gap-4 pt-4 w-full grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="primaryColor flex justify-start pl-2" for="">Date</label>
                <VDatePicker type="date" :min-date="new Date().toISOString().slice(0, 10)" v-model="eventDate"
                  is-required :popover="popover" :masks="{
            input: 'DD-MM-YYYY',
            modelValue: 'DD-MM-YYYY',
          }" mode="date" is24hr :dateFormat="'DD-MM-YYYY'">
                  <template v-slot="{ togglePopover, inputValue, inputEvents }">
                    <div class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                      <input :value="inputValue" placeholder="Enter Date" v-on="inputEvents"
                        class="w-full h-9 ml-1 outline-none cursor-pointer" readonly />
                      <button type="button"
                        class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                        @click="() => togglePopover()">
                        <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                      </button>
                    </div>
                  </template>
                </VDatePicker>
                <div class="h-[15px] justify-left col-span-1">
                  <p v-if="eventDate == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Date is required*
                  </p>
                </div>
              </div>
              <div>
                <label class="text-md font-small primaryColor flex justify-start ml-2" for="">Additional
                  Information</label>
                <input type="text" ref="aditional" id="additionalInfo" v-model="additionalInfo" autocomplete="off"
                  placeholder="Enter Additional Information"
                  class="border font-light w-full h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              </div>
            </div>
          </form>
          <div class="h-[14px]"></div>
        </div>
      </div>
      <div class="break-before-column col-span-2 bg-white flex align-top rounded justify-end"></div>
    </div>
    <div class="h-full flex items-top justify-end p-4 w-[100%]">
      <div class="mr-3 mt-1">
        <input v-on:click="resetFormData"
          class="bg-white-500 hover:bg-black-700 text-black border border-black h-10 w-[120px] cursor-pointer rounded"
          type="submit" autocomplete="off" value="Cancel" />
      </div>
      <div class="mr-3 mt-1">
        <input v-on:click="validateFileValue()"
          class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs" type="submit"
          autocomplete="off" value="Submit" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
//import { mapGetters, mapState } from "vuex";
import icons from "../../components/icons.vue";

export default defineComponent({
  name: "add-holidays",
  setup() {
    const holiday = ref("");
    const additionalInfo = ref("");
    const eventDate = ref("");
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const sessions = ref(["Morning", "Evening"]);
    const exchanges = ref([
      "NSE",
      "BSE",
      "NFO",
      "BFO",
      "CDS",
      "BCD",
      "MCX",
      "NCO",
      "BCO",
    ]);
    const hiddenValue = ref(true);

    const settlementHoliday = ref("0");
    const selectedSessions = ref([""]);
    const selectedExchanges = ref([""]);
    const dayOfWeek = ref("");
    return {
      holiday,
      eventDate,
      popover,
      settlementHoliday,
      sessions,
      exchanges,
      additionalInfo,
      hiddenValue,
      selectedSessions,
      selectedExchanges,
      dayOfWeek,
    };
  },
  components: {
    icons,
  },
  methods: {
    submitHandle() { },
    getMinDate() {
      return new Date();
    },
    resetFormData() { },
    formatDate(date: any) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const weekDay = date.getDay();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = daysOfWeek[weekDay];
      this.dayOfWeek = dayOfWeek;
      return `${year}-${month}-${day}`;
    },
    backToHolidays() {
      this.$router.push({ path: "/settings", query: { key: "holiday" } });
    },
    validateFileValue() {
      if (this.holiday == "" || this.eventDate == "") {
        this.hiddenValue = false;
      } else {
        let json = {
          holidays: this.holiday,
          date: this.formatDate(this.eventDate),
          day: this.dayOfWeek,
          morningSession: this.selectedSessions.includes("Morning") ? 1 : 0,
          eveningSession: this.selectedSessions.includes("Evening") ? 1 : 0,
          settlementHoliday: Number(this.settlementHoliday),
          bcdHoliday: this.selectedExchanges.includes("BCD") ? 1 : 0,
          bfoHoliday: this.selectedExchanges.includes("BFO") ? 1 : 0,
          cdsHoliday: this.selectedExchanges.includes("CDS") ? 1 : 0,
          mcxHoliday: this.selectedExchanges.includes("MCX") ? 1 : 0,
          bseHoliday: this.selectedExchanges.includes("BSE") ? 1 : 0,
          nseHoliday: this.selectedExchanges.includes("NSE") ? 1 : 0,
          nfoHoliday: this.selectedExchanges.includes("NFO") ? 1 : 0,
          ncoHoliday: this.selectedExchanges.includes("NCO") ? 1 : 0,
          bcoHoliday: this.selectedExchanges.includes("BCO") ? 1 : 0,

          info: this.additionalInfo != "" ? this.additionalInfo : "",
        };

        this.$store.dispatch("settings/addHoliday", json);
      }
    },
  },
});
</script>
<style></style>
