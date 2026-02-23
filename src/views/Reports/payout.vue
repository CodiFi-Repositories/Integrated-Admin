<style>
/* Add any additional styles you need */
</style>

<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded">
      <form class="gap-4 flex flex-wrap">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">From Date</label>
          <VDatePicker :max-date="today" v-model="fromDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY', // Updated format here
            modelValue: 'DD/MM/YYYY', // Updated format here
          }" mode="date">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class="flex items-center justify-between min-w-[200px] h-10 sm:w-full border rounded cursor-pointer p-2">
                <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
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
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">To Date</label>
          <VDatePicker :max-date="today" :min-date="fromDate" v-model="toDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class="flex items-center justify-between sm:w-full min-w-[200px] h-10 border rounded cursor-pointer p-2">
                <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
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
        <div class="flex items-end">
          <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader" @click="getDetails()">
            <p v-if="!getLoader">Submit</p>
            <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </button>
          <button class="negativeBackground text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
            :disabled="downloadLoader" @click="
            $store.dispatch('accessLog/downloadFile', {
              fromDate: fromDate,
              toDate: toDate,
            })
            " v-if="payOutDetails.length > 0">
            <p v-if="!downloadLoader">Download</p>
            <svg v-if="downloadLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm" v-if="payOutDetails.length">
      <div class="border rounded mt-2">
        <table class="w-full">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th class="border-r">Date</th>
              <th class="border-r">ldCode</th>
              <th class="border-r">Account No</th>
              <th class="border-r">IFSC Code</th>
              <th class="border-r">Mode</th>

              <th class="">Amount</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in showData" :key="id" class="border-b">
              <td class="truncate border-r text-center">{{ i.date }}</td>
              <td class="truncate border-r text-center">{{ i.ldCode }}</td>
              <td class="truncate border-r text-center">
                {{ i.clientBankAccountNumber }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.clientBankIfscCode }}
              </td>
              <td class="truncate border-r text-center">{{ i.paymentMode }}</td>
              <td class="truncate text-center">{{ i.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination v-if="payOutDetails && payOutDetails.length" v-on:page-chg="getTableData"
        :tot-len="payOutDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
    </div>
    <noData v-else> </noData>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import noData from "../../components/no-data.vue";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "reports",
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    noData,
    Icons,
    commonPagination,
  },
  setup() {
    const today = new Date();
    const fromDate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    let prevFromDate = ref(today);
    let prevToDate = ref(today);
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const rowsCount = ref(20);
    const showData = ref();
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    return {
      fromDate,
      toDate,
      popover,
      maxDateToDate,
      today,
      prevFromDate,
      prevToDate,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.payOutDetails.length : data.last;
      if (this.payOutDetails && this.payOutDetails.length > 0) {
        this.showData = this.payOutDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    getDetails() {
      if (this.fromDate && this.toDate) {
        let json: Object = {
          fromDate: this.fromDate,
          toDate: this.toDate,
        };
        this.$store.dispatch("accessLog/callPayoutReport", json).finally(() => {
          var data = {
            from: 0,
            last: this.rowsCount,
            count: this.rowsCount,
          };
          this.getTableData(data);
        });
      } else {
        this.$notify({
          group: "auth",
          type: "error",
          title: `Select a from Date and To date`,
        });
      }
    },
  },
  computed: {
    ...mapState("accessLog", ["payOutDetails", "downloadLoader"]),
    ...mapGetters("accessLog", ["getLoader"]),
  },
  unmounted() {
    this.$store.commit("accessLog/setPayOutDetails", "");
  },
});
</script>
