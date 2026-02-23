<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">From Date</label>
          <VDatePicker :max-date="new Date().toISOString().slice(0, 10)" v-model="fromDate" is-required
            :popover="popover" :masks="{
            input: 'DD-MM-YYYY HH:mm',
            modelValue: 'DD-MM-YYYY HH:mm',
          }" mode="dateTime" is24hr>
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div class="flex items-center justify-between min-w-[200px] h-10 border rounded cursor-pointer p-2">
                <input :value="inputValue" placeholder="DD-MM-YYYY HH:mm" v-on="inputEvents"
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
          <VDatePicker :max-date="new Date().toISOString().slice(0, 10)" :min-date="fromDate" v-model="toDate"
            is-required :popover="popover" :masks="{
            input: 'DD-MM-YYYY HH:mm',
            modelValue: 'DD-MM-YYYY  HH:mm',
          }" mode="dateTime" is24hr>
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div class="flex items-center justify-between w-[200px] h-10 border cursor-pointer rounded p-2">
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
        <div class="flex items-end">
          <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader" @click="getLoanData()">
            <p v-if="!getLoader">Submit</p>
            <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </button>
          <button type="button" v-if="getHousingLoanData.length"
            class="negativeBackground text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
            @click="downloadCsv()">
            Download
          </button>
        </div>
      </div>
    </div>
    <div class="p-5 bg-white mt-2 overflow-x-auto" v-if="getHousingLoanData?.length">
      <div>
        <table class="border rounded w-full">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th v-for="head in header" class="truncate border-r">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in showData" :key="id" class="border-b">
              <td class="truncate border-r text-center">{{ i.userId }}</td>
              <td class="truncate border-r text-center">{{ i.name }}</td>
              <td class="truncate border-r text-center">{{ i.mobileNo }}</td>
              <td class="truncate border-r text-center">{{ i.emailId }}</td>
              <td class="truncate border-r text-center">{{ i.pincode }}</td>
              <td class="truncate border-r text-center">{{ i.loanAmount }}</td>
              <td class="truncate border-r text-center">{{ i.incomeRange }}</td>
              <td class="truncate border-r text-center">
                {{ i.loanRequiredFor }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.purposeOfLoan }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.customerSegment }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination v-if="getHousingLoanData && getHousingLoanData.length" v-on:page-chg="getTableData"
        :tot-len="getHousingLoanData.length" :page-date="rowsPerPage" :row-count="rowsCount" />
    </div>

    <div v-else class="p-4 h-full flex items-center justify-center relative font-bold">
      <h2>No Records Found</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import Icons from "../../../components/icons.vue";
import commonPagination from "../../../components/commonPagination.vue";
import commonFunc from "../../../mixins/commonFunc";
export default defineComponent({
  name: "Housing Loan",
  components: {
    Icons,
    commonPagination,
  },
  mixins: [commonFunc],
  setup() {
    const fromDate = ref();
    const toDate = ref();
    const maxDateToDate = ref("");
    const submitClicked = ref();
    const eventtimeSpecific = new Date();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([
      { name: "Client Code", csvKey: "userId" },
      { name: "Name", csvKey: "name" },
      { name: "Mobile No", csvKey: "mobileNo" },
      { name: "Email Id", csvKey: "emailId" },
      { name: "Pincode", csvKey: "pincode" },
      { name: "Loan Amount", csvKey: "loanAmount" },
      { name: "Income Range", csvKey: "incomeRange" },
      { name: "Loan Required For", csvKey: "loanRequiredFor" },
      { name: "Purpose of Loan", csvKey: "purposeOfLoan" },
      { name: "Customer Segment", csvKey: "customerSegment" },
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
    return {
      fromDate,
      toDate,
      popover,
      maxDateToDate,
      submitClicked,
      eventtimeSpecific,
      header,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.getHousingLoanData.length : data.last;
      if (this.getHousingLoanData && this.getHousingLoanData.length > 0) {
        this.showData = this.getHousingLoanData.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    downloadCsv() {
      this.downloadUnicodeCSV(this.getHousingLoanData, "Housing", this.header);
    },
    getLoanData() {
      if (this.fromDate && this.toDate) {
        let fromDateStr = "";
        if (!this.fromDate?.toString().includes("T")) {
          fromDateStr = this.fromDate.toString().replace("T", " ");
        } else {
          const day = String(this.fromDate?.getDate()).padStart(2, "0");
          const month = String(this.fromDate?.getMonth() + 1).padStart(2, "0");
          const year = this.fromDate?.getFullYear();
          const hours = this.fromDate?.getHours();
          const minutes = this.fromDate?.getMinutes();

          fromDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;
        }

        let toDateStr;
        if (!this.toDate?.includes("T")) {
          toDateStr = this.toDate.toString().replace("T", " ");
        } else {
          const day = String(this.toDate?.getDate()).padStart(2, "0");
          const month = String(this.toDate?.getMonth() + 1).padStart(2, "0");
          const year = this.toDate?.getFullYear();
          const hours = this.toDate?.getHours();
          const minutes = this.toDate?.getMinutes();

          toDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;
        }

        let json = {
          fromDate: fromDateStr,
          toDate: toDateStr,
        };

        this.$store.dispatch("reports/getHousingLoanData", json).finally(() => {
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
          title: `Select a from date and To date`,
        });
      }
    },

    setPreviousWeekDatetime() {
      const now = new Date();
      now.setDate(now.getDate() - 7); // Subtract 7 days
      const year = now.getFullYear().toString().padStart(4, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      this.fromDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    setCurrentDatetime() {
      const now = new Date();
      const year = now.getFullYear().toString().padStart(4, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      this.toDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  computed: {
    ...mapGetters("reports", ["getHousingLoanData", "getLoader"]),
  },
  created() {
    this.$emit("housing_header", this.header);
    this.setCurrentDatetime();
    this.setPreviousWeekDatetime();
  },
  unmounted() {
    this.$store.commit("reports/setHousingLoanData", []);
  },
});
</script>
