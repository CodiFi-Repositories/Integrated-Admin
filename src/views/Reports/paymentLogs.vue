<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div>
          <p class="primaryColor pl-2 pb">User ID *</p>
          <input
            type="text"
            v-model="userId"
            maxlength="10"
            class="border min-w-[200px] h-10 rounded focus:outline-0 px-4"
          />
          <div class="h-4 ml-2 mt-2 text-red-500 text-xs">
            <span v-if="submitClicked && userId == ''"
              >User ID is required</span
            >
          </div>
        </div>
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
        <div class="pt-6">
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
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-4"
            type="button"
            v-if="getPaymentLogs?.length"
            @click="downloadUnicodeCSV(getPaymentLogs, 'Payment Logs', header)"
          >
            Download
          </button>
        </div>
      </div>
    </div>
    <div class="" v-if="getPaymentLogs && getPaymentLogs.length > 0">
      <div class="bg-white p-5 mt-5">
        <div>
          <table class="border rounded w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="border-r">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(i, id) in showData"
                @click="getResponseBody(i)"
                :key="id"
                class="border-b"
              >
                <td class="text-center border-r border-[#ededed]">
                  {{ i.userId ? i.userId : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.orderId ? i.orderId : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.amount ? i.amount : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.paymentStatus ? i.paymentStatus : "-" }}
                </td>
                <td class="truncate border-r max-w-[200px]">
                  {{ i.request ? i.request : "-" }}
                </td>
                <td class="truncate max-w-[200px]">
                  {{ i.response ? i.response : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <commonPagination
          v-if="getPaymentLogs && getPaymentLogs.length"
          v-on:page-chg="getTableData"
          :tot-len="getPaymentLogs.length"
          :page-date="rowsPerPage"
          :row-count="rowsCount"
        />
      </div>
    </div>

    <div class="bg-white p-5 mt-5" v-else>
      <div class="flex items-center justify-center relative font-bold">
        <h2>No Records Found</h2>
      </div>
    </div>
  </div>
  <paymentResponseLog v-if="paymentResponseDialog" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import commonPagination from "../../components/commonPagination.vue";
import commonFunc from "../../mixins/commonFunc";
import icons from "../../components/icons.vue";
import paymentResponseLog from "./paymentResponseLog.vue";
export default defineComponent({
  name: "paymentLogs",
  mixins: [commonFunc],
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    const submitClicked = ref();
    const userId = ref("");
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
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });

    const header = ref([
      { name: "User ID", csvKey: "userId" },
      { name: "Order ID", csvKey: "orderId" },
      { name: "Amount", csvKey: "amount" },
      { name: "Payment Status", csvKey: "paymentStatus" },

      { name: "Request", csvKey: "request" },
      { name: "Response", csvKey: "response" },
    ]);
    return {
      today,
      fromDate,
      toDate,
      maxDateToDate,
      submitClicked,
      popover,
      header,
      userId,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  computed: {
    ...mapGetters("reports", ["getLoader", "getPaymentLogs"]),
    ...mapState("reports", ["paymentResponseDialog"]),
  },

  components: {
    icons,
    commonPagination,
    paymentResponseLog,
  },
  methods: {
    getDetails() {
      this.submitClicked = true;
      if (this.toDate && this.fromDate && this.userId) {
        let json = {
          userId: this.userId,
          fromDate: this.dateFormatter(this.fromDate),
          toDate: this.dateFormatter(this.toDate),
        };
        this.$store.dispatch("reports/getPaymentLogs", json).finally(() => {
          var data = {
            from: 0,
            last: this.rowsCount,
            count: this.rowsCount,
          };
          this.getTableData(data);
        });
      }
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.getPaymentLogs.length : data.last;
      if (this.getPaymentLogs && this.getPaymentLogs.length > 0) {
        this.showData = this.getPaymentLogs.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    getResponseBody(val: any) {
      this.$store.commit("reports/setPaymentResponseDialog", {
        isOpen: true,
        data: val,
      });
    },
    dateFormatter(date: any) {
      if (!date) return null;
      date = new Date(date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      //   const hours = date.getHours().toString().padStart(2, "0");
      //   const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
  },
  unmounted() {
    this.$store.commit("reports/setPaymentLogs", []);
  },
});
</script>
