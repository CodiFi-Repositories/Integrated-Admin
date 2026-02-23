<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div class="">
          <div class="text-sm pb-1">
            User ID
            <span class="text-[#888] ml-2"
              >( Ex: 10234,12049,76543 )
              <span class="text-red-600">*</span></span
            >
          </div>
          <input
            type="text"
            v-model="userId"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[black] h-10 focus:outline-none"
            placeholder="Enter User ID"
            @input="
              userId = userId.toUpperCase();
              userErrorMsg = '';
            "
          />
          <div class="min-h-[14px]">
            <span v-if="userErrorMsg" class="text-xs text-red-600">
              {{ userErrorMsg }}</span
            >
          </div>
        </div>

        <div class="flex pt-6">
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
            v-if="positionAvgDetails && positionAvgDetails.length > 0"
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
                {{ i.clientId ? i.clientId : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.exchange ? i.exchange : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.instrumentName ? i.instrumentName : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.symbol ? i.symbol : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.expiryDate ? i.expiryDate : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.strikePrice ? i.strikePrice : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.optionType ? i.optionType : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.netQty ? i.netQty : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.netRate ? i.netRate : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.token ? i.token : "-" }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.createdOn ? getParsedDate(i.createdOn) : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination
        v-if="positionAvgDetails.length > 0"
        v-on:page-chg="getTableData"
        :tot-len="positionAvgDetails.length"
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
export default defineComponent({
  name: "positionAvgDetails",
  created() {},
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = ref(today);

    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([
      { name: "Client Id", csvKey: "clientId" },
      { name: "Exchange", csvKey: "exchange" },
      { name: "Instrument Name", csvKey: "instrumentName" },
      { name: "Symbol", csvKey: "symbol" },
      { name: "Expiry Date", csvKey: "expiryDate" },
      { name: "Strike Price", csvKey: "strikePrice" },
      { name: "Option Type", csvKey: "optionType" },
      { name: "Net Qty", csvKey: "netQty" },
      { name: "netRate", csvKey: "netRate" },
      { name: "Token", csvKey: "token" },
      { name: "Created On", csvKey: "createdOn" },
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
    const userId = ref("");
    const userErrorMsg = ref("");
    return {
      fromDate,

      rowsPerPage,
      rowsCount,
      header,
      popover,
      today,
      displayData,
      userId,
      userErrorMsg,
    };
  },
  computed: {
    ...mapGetters("reports", ["getLoader"]),
    ...mapState("reports", ["downloadLoader", "positionAvgDetails"]),
  },
  mixins: [commonFunc],
  components: {
    commonPagination,
  },
  methods: {
    getDetails() {
      if (this.userId && this.userId != "") {
        let json = {
          clientId: this.userId,
        };
        this.$store
          .dispatch("reports/getPositionAvgDetails", json)
          .finally(() => {
            let data = { count: 0, last: 0, from: 0 };
            data.count = this.rowsCount;
            data.last = this.rowsCount;
            data.from = 0;
            this.getTableData(data);
          });
      } else {
        this.userErrorMsg = "User Id is required";
      }
    },
    getTableData(data: any) {
      this.rowsCount = data.count;

      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.positionAvgDetails.length : data.last;

      if (this.positionAvgDetails && this.positionAvgDetails.length > 0) {
        this.displayData = this.positionAvgDetails.slice(fromIndex, lastIndex);
      } else {
        this.displayData = [];
      }
    },

    downloadCsv() {
      this.downloadUnicodeCSV(
        this.positionAvgDetails,
        "Position Average",
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
    this.$store.commit("reports/setPositionAvgDetails", []);
  },
});
</script>
