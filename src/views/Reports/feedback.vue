<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">From Date</label>
          <VDatePicker
            :max-date="today"
            v-model="fromDate"
            is-required
            :popover="popover"
            :masks="{
              input: 'DD/MM/YYYY',
              modelValue: 'DD/MM/YYYY',
            }"
            mode="date"
          >
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class="flex items-center justify-between min-w-[200px] h-10 border rounded cursor-pointer p-2"
              >
                <input
                  :value="inputValue"
                  placeholder="DD/MM/YYYY"
                  v-on="inputEvents"
                  class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer"
                  readonly
                />
                <button
                  type="button"
                  class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                  @click="() => togglePopover()"
                >
                  <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">To Date</label>
          <VDatePicker
            :max-date="today"
            :min-date="fromDate"
            v-model="toDate"
            is-required
            :popover="popover"
            :masks="{
              input: 'DD/MM/YYYY',
              modelValue: 'DD/MM/YYYY',
            }"
            mode="date"
            :disabled-dates="!fromDate"
          >
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class="flex items-center justify-between min-w-[200px] h-10 border rounded cursor-pointer p-2"
              >
                <input
                  :value="inputValue"
                  placeholder="DD/MM/YYYY"
                  v-on="inputEvents"
                  class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer"
                  readonly
                />
                <button
                  type="button"
                  class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                  @click="() => togglePopover()"
                >
                  <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>
        <div class="flex items-end">
          <button
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader"
            @click="getDetails()"
          >
            <p v-if="!getLoader">Submit</p>
            <svg
              v-if="getLoader"
              class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fffff"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#fffff"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
          <button
            class="negativeBackground text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
            :disabled="downloadLoader"
            @click="downloadCsv()"
            v-if="FeedbackDetails.length > 0"
          >
            <p v-if="!downloadLoader">Download</p>
            <svg
              v-if="downloadLoader"
              class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fffff"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#fffff"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- jhbuhbhb -->

    <!-- khbkjnjn -->
    <div class="pt-4 h-full">
      <div
        class="card p-4 border rounded bg-white shadow-sm"
        v-if="FeedbackDetails.length"
      >
        <div
          class="border rounded mt-2 overflow-auto"
          v-if="FeedbackDetails?.length"
        >
          <table class="w-full overflow-auto">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="truncate border-r">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in showData" :key="id" class="border-b">
                <td class="truncate border-r text-center">
                  {{ formatDateValue(i.date) }}
                </td>
                <td class="border-r wordwrap text-left">
                  {{ i.comments }}
                </td>
                <td class="truncate border-r text-center">{{ i.question }}</td>
                <td class="truncate border-r text-center">
                  {{ i.suggestion }}
                </td>
                <td class="truncate border-r text-center">
                  {{ i.ratings }}
                </td>
                <td class="truncate border-r text-center">
                  {{ i.source }}
                </td>
                <td class="truncate border-r text-center">{{ i.version }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <commonPagination
          v-if="FeedbackDetails && FeedbackDetails.length"
          v-on:page-chg="getTableData"
          :tot-len="FeedbackDetails.length"
          :page-date="rowsPerPage"
          :row-count="rowsCount"
        />
      </div>
      <noData v-else></noData>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import noData from "../../components/no-data.vue";
import Icons from "../../components/icons.vue";
import commonFunc from "../../mixins/commonFunc";
import commonPagination from "../../components/commonPagination.vue";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid";
export default defineComponent({
  name: "feedback",
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([
      { name: "Date", csvKey: "date" },
      { name: "Comments", csvKey: "comments" },
      { name: "Question", csvKey: "question" },
      { name: "Suggestion", csvKey: "suggestion" },
      { name: "Ratings", csvKey: "ratings" },
      { name: "Source", csvKey: "source" },
      { name: "Version", csvKey: "version" },
    ]);
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
    const disabledDates = ref([
      {
        repeat: {
          weekdays: [1, 7],
        },
      },
    ]);

    return {
      fromDate,
      toDate,
      popover,
      disabledDates,
      maxDateToDate,
      today,
      header,
      rowsPerPage,
      rowsCount,
      showData,
    };
  },
  mixins: [commonFunc],
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    noData,
    Icons,
    commonPagination,
  },
  methods: {
    downloadCsv() {
      this.downloadUnicodeCSV(this.FeedbackDetails, "feedback", this.header);
    },
    formatDateValue(date: any) {
      let dateString = date.trim();
      var parts;

      if (dateString.indexOf("/") !== -1) {
        parts = dateString.split("/");
      } else {
        parts = dateString.split("-");
      }
      if (parts.length === 3) {
        if (parts[0].length > 2) {
          dateString = parts[1] + "/" + parts[2] + "/" + parts[0];
        } else {
          dateString = parts[1] + "/" + parts[0] + "/" + parts[2];
        }
      }

      let dateObject = new Date(dateString);
      const day = String(dateObject.getDate()).padStart(2, "0");
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const year = dateObject.getFullYear();

      return `${day}/${month}/${year}`;
    },
    addDays(first: string) {
      if (first == "fromDate") {
        this.toDate = "";
      }
      this.maxDateToDate = this.fromDate;
    },
    getTableData(data: any) {
      this.rowsCount = data.count;

      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.FeedbackDetails.length : data.last;
      if (this.FeedbackDetails && this.FeedbackDetails.length > 0) {
        this.showData = this.FeedbackDetails.slice(fromIndex, lastIndex);
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

        this.$store
          .dispatch("accessLog/callFeedbackReport", json)
          .finally(() => {
            let data = { count: 0, last: 0, from: 0 };
            data.count = this.rowsCount;
            data.last = this.rowsCount;
            data.from = 0;
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
    ...mapState("accessLog", ["FeedbackDetails", "downloadLoader"]),
    ...mapGetters("accessLog", ["getLoader"]),
  },
  // watch: {
  //   FeedbackDetails: {
  //     handler() {
  //       let data = { count: 0, last: 0, first: 0 };
  //       data.count = this.rowsCount;
  //       data.last = this.rowsCount;
  //       data.first = 0;
  //       this.getTableData(data);
  //     },
  //   },
  // },
  unmounted() {
    this.$store.commit("accessLog/setFeedbackDetails", "");
  },
});
</script>
<style>
.wordwrap {
  word-wrap: break-word !important;
  max-width: 1px;
}
</style>
