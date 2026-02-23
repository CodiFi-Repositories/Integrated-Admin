<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <form class="gap-4 flex" @submit.prevent="getDetails()">
        <div class="relative">
         <div>
          <label class="primaryColor pb-1 text-sm ml-2">Date</label>
          <VDatePicker :max-date="today" v-model="ordersFromDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date">
            <template v-slot="{ togglePopover, inputValue, inputEvents }">
              <div class="flex items-center justify-between min-w-[200px] h-10 border rounded cursor-pointer p-2">
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
          <div class="absolute top-12">
            <!-- <MonthPicker
              @change="showDate"
              class="w-[300px]"
              v-if="isMonthPicker"
              :no-default="true"
              :max-date="today"
              :default-month="new Date().getMonth() + 1"
            ></MonthPicker> -->
            
          </div>
        </div>

        <div class="flex items-end">
          <button
          type="submit"
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader"
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
            v-if="
              (activeOrderCountTab == 0 &&
                ordersCountData &&
                ordersCountData.length > 0) ||
              (activeOrderCountTab == 1 &&
                userOrdersCountData &&
                userOrdersCountData.length > 0)
            "
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
      </form>
    </div>
    <div
      v-if="
        (userOrdersCountData && userOrdersCountData.length > 0) ||
        (ordersCountData && ordersCountData.length > 0)
      "
      class="card p-4 border rounded bg-white shadow-sm mt-4"
    >
      <div class="">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center mx-4 mt-4"
          id="myTab"
        >
          <li
            class="mr-2"
            role="presentation"
            v-for="(b, id) in orderCountTabs"
            :key="id"
            @click="changeActive(id)"
          >
            <button
              class="inline-block px-3 pb-2 rounded-t-lg"
              type="button"
              :class="
                activeOrderCountTab == id
                  ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#005CB9] dark:border-[#005CB9]'
                  : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
              "
            >
              {{ b.name }}
            </button>
          </li>
        </ul>
      </div>
      <div
        v-if="showData() && showData().length > 0"
        class="mt-2"
        id="order_count_table"
      >
        <table class="w-full overflow-auto">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th v-for="head in getHeader()" class="truncate border-r">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in showData()" :key="id" class="border-b">
              <td class="truncate border-r text-center">
                {{ activeOrderCountTab == 0 ? "Total Orders" : i.userId }}
              </td>
              <td class="truncate border-r text-center">
                {{ i.count ? i.count : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination
        v-if="
          activeOrderCountTab == 1 &&
          userOrdersCountData &&
          userOrdersCountData.length > 0
        "
        v-on:page-chg="getTableData"
        :tot-len="userOrdersCountData.length"
        :page-date="rowsPerPage"
        :row-count="rowsCount"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
import commonFunc from "../../mixins/commonFunc";
export default defineComponent({
  name: "orderCount",
  setup() {
     const today = new Date().toISOString().slice(0, 10);
    const ordersFromDate = ref(today);

    const downloadLoader = ref(false);
    const maxDateToDate = ref("");
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const orderCountTabs = ref([
      {
        name: "Total Orders",
        id: 0,
      },
      {
        name: "User Orders",
        id: 1,
      },
    ]);
    const orderCountHeader = ref([
      { name: "Type", csvKey: "date" },
      { name: "Count", csvKey: "count" },
    ]);
    const userOrderCountHeader = ref([
      { name: "User", csvKey: "userId" },
      { name: "Count", csvKey: "count" },
    ]);
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    const rowsCount = ref(20);
    const displayData = ref([]);
    const selectedDate = ref({
      from: null,
      to: null,
      month: new Date().toLocaleString("en-US", { month: "long" }),
      year: new Date().getFullYear(),
    });
    const isMonthPicker = ref(false);
    return {
      displayData,

      today,
      maxDateToDate,
      popover,
      downloadLoader,
      orderCountTabs,
      orderCountHeader,
      userOrderCountHeader,
      rowsCount,
      rowsPerPage,
      selectedDate,
      isMonthPicker,
      ordersFromDate,
    };
  },
  components: {
    icons,
    commonPagination,
  },
  computed: {
    ...mapGetters("reports", ["getLoader"]),
    ...mapState("reports", [
      "activeOrderCountTab",
      "ordersCountData",
      "userOrdersCountData",
    ]),
  },
  mixins: [commonFunc],
  methods: {
    getDetails() {
      
      const json = {
       createdOn : this.ordersFromDate
      };
      // this.$store.dispatch("reports/getOrdersCount", json);
      this.$store.dispatch("reports/getOrdersCount", json).finally(() => {
        let data = { count: 0, last: 0, from: 0 };
        data.count = this.rowsCount;
        data.last = this.rowsCount;
        data.from = 0;
        this.getTableData(data);
      });
    },
    downloadCsv() {
      let arr: any = [];
      let fileName = "";

      if (this.activeOrderCountTab == 0) {
        arr = this.ordersCountData;
        fileName = "Orders Count";
      } else {
        arr = this.userOrdersCountData;
        fileName = "User Orders Count";
      }
      this.downloadUnicodeCSV(arr, fileName, this.getHeader());
    },
    getTableData(data: any) {
      this.rowsCount = data.count;

      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.userOrdersCountData.length : data.last;
      if (this.userOrdersCountData && this.userOrdersCountData.length > 0) {
        this.displayData = this.userOrdersCountData.slice(fromIndex, lastIndex);
      } else {
        this.displayData = [];
      }
    },
    changeActive(id: any) {
      this.$store.commit("reports/setOrderCountActiveTab", id);
    },
    getHeader() {
      if (this.activeOrderCountTab == 0) {
        return this.orderCountHeader;
      } else {
        return this.userOrderCountHeader;
      }
    },
    showData() {
      if (this.activeOrderCountTab == 0) {
        return this.ordersCountData;
      } else {
        return this.displayData;
      }
    },
    showDate(date: any) {
      this.isMonthPicker = true;
      this.selectedDate = date;
    },
  },
  unmounted() {
    this.$store.commit("reports/setOrdersCount", []);
    this.$store.commit("reports/setUserOrdersCount", []);
  },
});
</script>
<style>
.month-picker__container {
  width: 250px !important;
}
.month-picker__year button {
  /* Add your styles here */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}
.month-picker__month {
  font-family: "Open Sans", sans-serif !important;
  font-size: 12px;
}
.month-picker__month.selected,
.month-picker__month.selected-range-first,
.month-picker__month.selected-range-second {
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: inset 0 0 3px #3490d2, 0px 2px 5px rgba(85, 176, 242, 0.2);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
