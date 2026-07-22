<template>
  <div class="flex-1 min-h-0 flex flex-col">
    <div class="card p-4 border rounded bg-white shadow-sm shrink-0">
      <form class="gap-4 flex flex-wrap" @submit.prevent="submitDetails()">
        <div class="flex flex-col relative" ref="searchContainer">
          <label class="primaryColor pb-1 text-sm ml-2">Symbol</label>
          <div class="flex items-center w-[300px] h-10 border rounded p-2">
            <span v-html="searchSvg"></span>
            <input type="search" v-model="symbol" placeholder="Enter Symbol"
              class="w-full h-9 ml-1 text-xs outline-none" @click="searchInput()" @input="
                symbol = symbol.toUpperCase();
                symbolError = '';
              " />
          </div>
          <div class="min-h-[14px]">
            <span v-if="symbolError" class="text-xs text-red-600 ml-2">{{ symbolError }}</span>
          </div>

          <div v-if="!selectedScrip && symbol.length > 0 && searchList && searchList.length > 0"
            class="absolute top-[68px] z-20 w-[300px] bg-white border rounded-lg overflow-y-auto max-h-[350px]">
            <ul class="overflow-auto">
              <li v-for="(item, index) in searchList" :key="index"
                class="flex justify-between px-2 py-3 border-b cursor-pointer hover:bg-slate-50"
                @click="searchRowClick(item)">
                <span class="text-sm">{{ item.formattedInsName }}</span>
                <button type="button" class="px-2 py-1 text-[11px] rounded w-[38px] text-white" :class="[
                  item.exchange == 'NSE'
                    ? 'bg-green-500'
                    : item.exchange == 'BSE'
                      ? 'bg-red-500'
                      : 'bg-[#a3a7ab]',
                ]">
                  {{ item.exchange }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="primaryColor pb-1 text-sm ml-2">Action</label>
          <select v-model="action"
            class="min-w-[160px] h-10 border rounded px-3 text-xs outline-none cursor-pointer"
            @change="onActionChange">
            <option value="" disabled>Select Action</option>
            <option value="Bonus">Bonus</option>
            <option value="Split">Split</option>
          </select>
          <div class="min-h-[14px]">
            <span v-if="actionError" class="text-xs text-red-600 ml-2">{{ actionError }}</span>
          </div>
        </div>

        <div class="flex flex-col" v-if="action == 'Bonus'">
          <label class="primaryColor pb-1 text-sm ml-2">Ratio</label>
          <div class="flex items-center min-w-[180px] h-10 border rounded p-2">
            <input v-model="ratio" placeholder="Enter Ratio (e.g., 1:2, 3:2)"
              class="w-full h-9 ml-1 text-xs outline-none" @input="ratioError = ''" />
          </div>
          <div class="min-h-[14px]">
            <span v-if="ratioError" class="text-xs text-red-600 ml-2">{{ ratioError }}</span>
          </div>
        </div>

        <div class="flex flex-col" v-if="action == 'Split'">
          <label class="primaryColor pb-1 text-sm ml-2">Split Qty</label>
          <div class="flex items-center min-w-[180px] h-10 border rounded p-2">
            <input v-model="splitQty" type="number" min="1" placeholder="Enter Split Quantity"
              class="w-full h-9 ml-1 text-xs outline-none" @input="splitQtyError = ''" />
          </div>
          <div class="min-h-[14px]">
            <span v-if="splitQtyError" class="text-xs text-red-600 ml-2">{{ splitQtyError }}</span>
          </div>
        </div>

        <div class="flex pt-6">
          <button type="submit"
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs">
            Submit
          </button>
        </div>
      </form>
    </div>

    <div class="pt-4 rounded flex-1 min-h-0 flex flex-col">
      <div class="card p-5 border rounded bg-white shadow-sm flex flex-col min-h-0" v-if="history.length">
        <p class="primaryColor text-sm font-semibold">Corporate Action History</p>
        <div class="border rounded mt-2 overflow-auto min-h-0">
          <table class="w-full overflow-auto">
            <thead class="text-[13px] sticky top-0 bg-white">
              <tr class="border-b">
                <th v-for="head in historyHeader" :key="head.csvKey" class="truncate border-r px-2"
                  :class="head.align">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in showData" :key="id" class="border-b hover:bg-slate-50">
                <td v-for="head in historyHeader" :key="head.csvKey" class="truncate border-r px-2"
                  :class="head.align">
                  {{ i[head.csvKey] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center justify-between shrink-0">
          <p class="primaryColor text-sm ml-2 mt-4">Total Records : {{ history.length }}</p>
          <commonPagination v-if="history.length > 10" v-on:page-chg="getTableData" :tot-len="sortedHistory.length"
            :page-date="rowsPerPage" :row-count="rowsCount" />
        </div>
      </div>
      <noData v-if="history.length == 0"> </noData>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import noData from "../../../components/no-data.vue";
import commonPagination from "../../../components/commonPagination.vue";
import { CorporateActionRecord, CorporateActionRequest } from "./types";

const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-[#888]">
<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
</svg>`;

export default defineComponent({
  name: "corporateAction",
  components: {
    noData,
    commonPagination,
  },
  setup() {
    const symbol = ref("");
    const action = ref("");
    const ratio = ref("");
    const splitQty = ref("");
    const symbolError = ref("");
    const actionError = ref("");
    const ratioError = ref("");
    const splitQtyError = ref("");
    const selectedScrip = ref<any>(null);
    const timerId: any = ref(null);
    const history = ref<CorporateActionRecord[]>([]);
    const showData = ref<any[]>([]);
    const rowsCount = ref(10);
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    const historyHeader = ref([
      { name: "Date & Time", csvKey: "dateTime", align: "text-left" },
      { name: "Symbol", csvKey: "symbol", align: "text-left" },
      { name: "Action", csvKey: "action", align: "text-left" },
      { name: "Ratio", csvKey: "ratio", align: "text-center" },
      { name: "Split Qty", csvKey: "splitQty", align: "text-center" },
      { name: "Updated By", csvKey: "updatedBy", align: "text-left" },
    ]);
    return {
      symbol,
      action,
      ratio,
      splitQty,
      symbolError,
      actionError,
      ratioError,
      splitQtyError,
      selectedScrip,
      timerId,
      searchSvg,
      history,
      showData,
      rowsCount,
      rowsPerPage,
      historyHeader,
    };
  },
  computed: {
    ...mapState("tradecall", ["searchList"]),
    sortedHistory(): CorporateActionRecord[] {
      return [...this.history].sort((a, b) => b.ts - a.ts);
    },
  },
  watch: {
    symbol: function (newValue) {
      newValue = newValue.trim();
      clearTimeout(this.timerId);
      if (
        this.selectedScrip &&
        newValue == this.selectedScrip.formattedInsName
      ) {
        return;
      }
      this.selectedScrip = null;
      if (newValue && newValue.length > 1) {
        this.timerId = setTimeout(() => {
          this.callSearch(newValue);
        }, 500);
      }
    },
    sortedHistory: {
      immediate: true,
      handler() {
        this.getTableData({
          from: 0,
          last: this.rowsCount,
          count: this.rowsCount,
        });
      },
    },
  },
  methods: {
    searchInput() {
      this.symbol = this.symbol.toUpperCase();
      this.$store.commit("tradecall/setSearchList", []);
    },
    callSearch(value: any) {
      var temp = {
        value: value.toString().toUpperCase(),
      };
      clearTimeout(this.timerId);
      this.$store.dispatch("tradecall/getSearchList", temp);
    },
    handleClickOutside(event: any) {
      const container: any = this.$refs.searchContainer;
      if (container && !container.contains(event.target)) {
        clearTimeout(this.timerId);
        if (!this.selectedScrip && this.symbol) {
          this.symbol = "";
        }
        if (this.searchList && this.searchList.length > 0) {
          this.$store.commit("tradecall/setSearchList", []);
        }
      }
    },
    searchRowClick(item: any) {
      this.selectedScrip = item;
      this.symbol = item.formattedInsName;
      this.symbolError = "";
      this.$store.commit("tradecall/setSearchList", []);
    },
    onActionChange() {
      this.actionError = "";
      this.ratio = "";
      this.splitQty = "";
      this.ratioError = "";
      this.splitQtyError = "";
    },
    validate(): boolean {
      let valid = true;
      if (!this.symbol.trim()) {
        this.symbolError = "Symbol is required";
        valid = false;
      } else if (!this.selectedScrip) {
        this.symbolError = "Select a symbol from the search list";
        valid = false;
      }
      if (!this.action) {
        this.actionError = "Action is required";
        valid = false;
      }
      if (this.action == "Bonus") {
        if (!this.ratio.trim()) {
          this.ratioError = "Ratio is required";
          valid = false;
        } else if (!/^[1-9]\d*:[1-9]\d*$/.test(this.ratio.trim())) {
          this.ratioError = "Enter ratio as number:number (e.g., 1:2)";
          valid = false;
        }
      }
      if (this.action == "Split") {
        if (!String(this.splitQty).trim()) {
          this.splitQtyError = "Split Qty is required";
          valid = false;
        } else if (isNaN(Number(this.splitQty)) || Number(this.splitQty) <= 0) {
          this.splitQtyError = "Only positive numbers are allowed";
          valid = false;
        }
      }
      return valid;
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.sortedHistory.length : data.last;
      if (this.sortedHistory.length > 0) {
        this.showData = this.sortedHistory.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    async submitDetails() {
      if (!this.validate()) return;
      const payload: CorporateActionRequest = {
        symbol: this.selectedScrip.symbol || this.selectedScrip.tradingSymbol,
        token: String(this.selectedScrip.token),
        exch: this.selectedScrip.exchange,
        action: this.action.toUpperCase(),
      };
      if (this.action == "Bonus") {
        payload.ratio = this.ratio.trim();
      } else {
        payload.splitQty = String(this.splitQty).trim();
      }
      const success = await this.$store.dispatch(
        "reports/updateCorporateAction",
        payload
      );
      if (!success) return;
      const record: CorporateActionRecord = {
        ts: Date.now(),
        dateTime: (window as any).formatDate(new Date(), "D&T"),
        symbol: this.symbol.trim(),
        action: this.action,
        ratio: this.action == "Bonus" ? this.ratio.trim() : "-",
        splitQty: this.action == "Split" ? String(this.splitQty).trim() : "-",
        updatedBy: localStorage.getItem("IntegratedClientId") || "-",
      };
      this.history.unshift(record);
      this.$notify({
        group: "auth",
        type: "success",
        title: `Corporate action submitted`,
      });
      this.symbol = "";
      this.selectedScrip = null;
      this.action = "";
      this.ratio = "";
      this.splitQty = "";
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
    clearTimeout(this.timerId);
    this.$store.commit("tradecall/setSearchList", []);
  },
});
</script>
