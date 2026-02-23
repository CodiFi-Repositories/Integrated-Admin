<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">Date</label>
          <VDatePicker
            :max-date="today"
            v-model="fromDate"
            is-required
            :popover="popover"
            :masks="{
              input: 'DD-MM-YYYY',
              modelValue: 'DD-MM-YYYY',
            }"
            type="month"
          >
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div
                class="flex items-center justify-between min-w-[200px] h-10 border rounded cursor-pointer p-2"
              >
                <input
                  :value="inputValue"
                  placeholder="MM/YYYY"
                  v-on="inputEvents"
                  class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer"
                  readonly
                  mode="month"
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
            v-if="fileUploadDetails && fileUploadDetails.length > 0"
            class="negativeBackground text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
            :disabled="downloadLoader"
            @click="downloadCsv()"
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
    <div
      v-if="displayData && displayData.length > 0"
      class="card p-4 border rounded bg-white shadow-sm mt-4"
    >
      <div class="mt-2" id="order_count_table">
        <table class="w-full overflow-auto">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th v-for="head in header" class="truncate border-r">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in displayData" :key="id" class="border-b">
              <td class="truncate border-r text-center">
                {{ i.fileName }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.processType ? i.processType : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.totalRecords ? i.totalRecords : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.completedRecords ? i.completedRecords : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.errorRecords ? i.errorRecords : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.createdOn ? getParsedDate(i.createdOn) : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination
        v-if="fileUploadDetails.length > 0"
        v-on:page-chg="getTableData"
        :tot-len="fileUploadDetails.length"
        :page-date="rowsPerPage"
        :row-count="rowsCount"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import commonPagination from "../../components/commonPagination.vue";
import commonFunc from "../../mixins/commonFunc";
import icons from "../../components/icons.vue";
export default defineComponent({
  name: "fileUploadDetails",
  created() {},
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = ref(today);

    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([
      { name: "File Name", csvKey: "date" },
      { name: "Process Type", csvKey: "comments" },
      { name: "Total Records", csvKey: "question" },
      { name: "Completed Records", csvKey: "suggestion" },
      { name: "Error Records", csvKey: "ratings" },
      { name: "Created On", csvKey: "source" },
    ]);
    const rowsCount = ref(20);

    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    const displayData: any = ref([]);
    return {
      fromDate,

      rowsPerPage,
      rowsCount,
      header,
      popover,
      today,
      displayData,
    };
  },
  computed: {
    ...mapGetters("reports", ["getLoader"]),
    ...mapState("reports", ["downloadLoader", "fileUploadDetails"]),
  },
  components: {
    commonPagination,
    icons,
  },
  mixins: [commonFunc],
  methods: {
    getDetails() {
      let json = {
        createdOn: (window as any).formatDate(new Date(this.fromDate), 'D'),
      };
      this.$store.dispatch("reports/getFileUploadDetails", json).finally(() => {
        let data = { count: 0, last: 0, from: 0 };
        data.count = this.rowsCount;
        data.last = this.rowsCount;
        data.from = 0;
        this.getTableData(data);
      });
    },
    getTableData(data: any) {
      this.rowsCount = data.count;

      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.fileUploadDetails.length : data.last;

      if (this.fileUploadDetails && this.fileUploadDetails.length > 0) {
        this.displayData = this.fileUploadDetails.slice(fromIndex, lastIndex);
      } else {
        this.displayData = [];
      }
    },

    downloadCsv() {
      this.downloadUnicodeCSV(
        this.fileUploadDetails,
        "File Upload Details",
        this.header
      );
    },
    getParsedDate(date: any) {
      if (date) {
        date = date.split(" ");
        date && date.length > 0 ? (date = date[0]) : "";
      }
      return date;
    },
  },
  unmounted() {
    this.$store.commit("reports/setFileUploadDetails", []);
  },
});
</script>
