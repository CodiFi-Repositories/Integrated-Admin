<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex flex-wrap">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">User ID</label>
          <div class="flex items-center min-w-[160px] h-10 border rounded p-2">
            <input v-model="userId" placeholder="Enter User ID"
              class="w-full h-9 ml-1 text-xs outline-none" />
          </div>
        </div>

        <div>
          <label class="primaryColor pb-1 text-sm ml-2">From Date</label>
          <VDatePicker :max-date="today" v-model="fromDate" @update:modelValue="onFromDateChange" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div class="flex items-center justify-between min-w-[180px] h-10 border rounded cursor-pointer p-2">
                <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
                  class="min-w-[130px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
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
          <VDatePicker :min-date="fromDate" :max-date="today" v-model="toDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div class="flex items-center justify-between min-w-[180px] h-10 border rounded cursor-pointer p-2">
                <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
                  class="min-w-[130px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                <button type="button"
                  class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                  @click="() => togglePopover()">
                  <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>

        <div class="flex flex-col">
          <label class="primaryColor pb-1 text-sm ml-2">Frequency</label>
          <select v-model="frequency"
            class="min-w-[160px] h-10 border rounded px-3 text-xs outline-none cursor-pointer">
            <option value="">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="fortnighty">Fortnighty</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="primaryColor pb-1 text-sm ml-2">Status</label>
          <select v-model="status"
            class="min-w-[160px] h-10 border rounded px-3 text-xs outline-none cursor-pointer">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="flex gap-3 items-end">
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

          <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs" type="button"
            v-if="getSipDetails?.length" @click="downloadUnicodeCSV(getSipDetails, 'SIP Details', header)">
            Download
          </button>
        </div>
      </div>
    </div>

    <sipOrderDialog :show="showDialog" :loading="dialogLoader" :executed="getSipOrderDetails?.executed || []"
      :upcoming="getSipOrderDetails?.upcoming || []" @close="closeDialog" />

    <div class="pt-4 rounded">
      <div class="card p-5 border rounded bg-white shadow-sm" v-if="getSipDetails?.length">
        <div>
          <div class="border rounded mt-2 overflow-auto">
            <table class="w-full overflow-auto">
              <thead class="text-[13px]">
                <tr class="border-b">
                  <th v-for="head in header" class="truncate border-r">
                    {{ head.name }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="(i, id) in showData" :key="id" class="border-b cursor-pointer hover:bg-gray-50"
                  @click="openDialog(i)">
                 
                  <td class="truncate border-r text-center">
                    {{ i["userId"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["symbol"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["exchange"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["frequency"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["sipType"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["sipAmount"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["sipQuantity"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["capPrice"] || "" }}
                  </td>
                  
                  <td class="truncate border-r text-center">
                    {{ i["duration"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["startDate"] ? new Date(i["startDate"]).toLocaleDateString("en-GB") : "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["endDate"] ? new Date(i["endDate"]).toLocaleDateString("en-GB") : "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["executionCount"] ?? "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["pendingInstallments"] ?? "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["failedInstallments"] ?? "" }}
                  </td>
                  <td class="text-center border-r text-xs">
                    {{ i["sipStatus"] || "" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["initiatedBy"] || "" }}
                  </td>
                  <td class="text-center text-xs">
                    {{ i["modifiedBy"] || "" }}
                  </td>
                   <td class="truncate border-r text-center">
                    {{ i["createdAt"] ? new Date(i["createdAt"]).toLocaleDateString("en-GB") : "" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <commonPagination v-if="getSipDetails && getSipDetails.length" v-on:page-chg="getTableData"
            :tot-len="getSipDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
        </div>
      </div>
      <noData v-if="getSipDetails?.length == 0"> </noData>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import commonFunc from "../../mixins/commonFunc";
import noData from "../../components/no-data.vue";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
import sipOrderDialog from "./sipOrderDialog.vue";
export default defineComponent({
  components: {
    noData,
    Icons,
    commonPagination,
    sipOrderDialog,
  },
  mixins: [commonFunc],
  name: "sip",
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const userId = ref("");
    const fromDate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    const frequency = ref("");
    const status = ref("");
    const submitClicked = ref();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([      
      { name: "Client Code", csvKey: "userId" },
      { name: "Symbol", csvKey: "symbol" },
      { name: "Exchange", csvKey: "exchange" },
       { name: "Frequency", csvKey: "frequency" },
      { name: "SIP Type", csvKey: "sipType" },
      { name: "SIP Amount", csvKey: "sipAmount" },
      { name: "SIP Quantity", csvKey: "sipQuantity" },
      { name: "Cap Price", csvKey: "capPrice" }, 
      { name: "Installment", csvKey: "duration" },
      { name: "Start Date", csvKey: "startDate" },
      { name: "End Date", csvKey: "endDate" },
      { name: "Execution Count", csvKey: "executionCount" },
      { name: "Pending Installments", csvKey: "pendingInstallments" },
      { name: "Failed Installments", csvKey: "failedInstallments" },
      { name: "Status", csvKey: "sipStatus" },
      { name: "Initiated By", csvKey: "initiatedBy" },
      { name: "Modified By", csvKey: "modifiedBy" },
      { name: "Created On", csvKey: "createdAt" },
    ]);

    const disabledDates = ref([
      {
        repeat: {
          weekdays: [1, 7],
        },
      },
    ]);
    const showDialog = ref(false);
    const dialogLoader = ref(false);
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
      header,
      userId,
      fromDate,
      toDate,
      frequency,
      status,
      popover,
      disabledDates,
      maxDateToDate,
      today,
      submitClicked,
      rowsCount,
      showData,
      rowsPerPage,
      showDialog,
      dialogLoader,
    };
  },
  methods: {
    openDialog(row: any) {
      this.showDialog = true;
      this.dialogLoader = true;
      this.$store.dispatch("reports/getSipOrderDetails", row.id)
        .finally(() => {
          this.dialogLoader = false;
        });
    },
    closeDialog() {
      this.showDialog = false;
      this.$store.commit("reports/setSipOrderDetails", { executed: [], upcoming: [] });
    },
    onFromDateChange(val: string) {
      if (this.toDate && val > this.toDate) {
        this.toDate = val;
      }
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.getSipDetails.length : data.last;
      if (this.getSipDetails && this.getSipDetails.length > 0) {
        this.showData = this.getSipDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    getDetails() {
      if (this.fromDate && this.toDate) {
        let json: Object = {
          userId: this.userId,
          startDate: (window as any).formatDate(new Date(this.fromDate), 'D'),
          endDate: (window as any).formatDate(new Date(this.toDate), 'D'),
          frequency: this.frequency,
          status: this.status
        };

        this.$store.dispatch("reports/getSipDetails", json).finally(() => {
          var data = {
            from: 0,
            last: this.rowsCount,
            count: this.rowsCount,
          };
          this.getTableData(data);
        });
        this.submitClicked = true;
      } else {
        this.$notify({
          group: "auth",
          type: "error",
          title: `Select a From Date and To Date`,
        });
      }
    },
  },
  computed: {
    ...mapGetters("reports", ["getSipDetails", "getLoader", "getSipOrderDetails"]),
    ...mapState("accessLog", ["FeedbackDetails", "downloadLoader"]),
  },
  unmounted() {
    this.$store.commit("reports/setSipDetails", []);
  },
});
</script>
