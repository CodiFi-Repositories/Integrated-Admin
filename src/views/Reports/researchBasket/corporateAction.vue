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

        <div class="flex flex-col">
          <label class="primaryColor pb-1 text-sm ml-2">Effective Date</label>
          <VDatePicker v-model="effectiveDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date" @update:modelValue="effectiveDateError = ''">
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
          <div class="min-h-[14px]">
            <span v-if="effectiveDateError" class="text-xs text-red-600 ml-2">{{ effectiveDateError }}</span>
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
                <th class="truncate border-r px-2 text-center">Revert</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in history" :key="id" class="border-b hover:bg-slate-50">
                <td v-for="head in historyHeader" :key="head.csvKey" class="truncate border-r px-2"
                  :class="head.align">
                  {{ i[head.csvKey] }}
                </td>
                <td class="truncate border-r px-2 text-center">
                  <button v-if="i.reverted == 0" type="button"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 my-1 rounded text-xs cursor-pointer"
                    @click="openRevertDialog(i)">
                    Revert
                  </button>
                  <span v-else class="text-xs text-gray-400">Reverted</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center justify-between shrink-0">
          <p class="primaryColor text-sm ml-2 mt-4">Records : {{ history.length }}</p>
          <div class="flex justify-end mt-4 gap-4">
            <div class="flex items-center">
              <div class="primaryColor text-sm mr-2">Rows Per Page :</div>
              <select v-model="rowsCount"
                class="border h-10 rounded focus:outline-0 px-4 text-xs cursor-pointer ring-1 ring-inset ring-gray-300"
                @change="getHistory('reset')">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </div>
            <nav class="isolate inline-flex space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="goBack()"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="page == 1 ? 'cursor-not-allowed' : 'cursor-pointer'">
                <icons name="leftArrow" />
              </a>
              <a v-for="(cpage, id) in pages" :key="id"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer"
                :class="page == cpage
                  ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  " @click="changePage(cpage)">{{ cpage }}</a>
              <a @click="forward()"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'">
                <icons name="rightArrow" />
              </a>
            </nav>
          </div>
        </div>
      </div>
      <noData v-if="history.length == 0"> </noData>
    </div>

    <div v-if="revertDialog" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div class="text-center">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Confirmation</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure want to <span class="text-red-500">Revert</span> the
                  {{ revertRowData?.action }} on {{ revertRowData?.symbol }}?
                </p>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 flex gap-2">
              <button type="button"
                class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="closeRevertDialog()">Cancel</button>
              <button type="button"
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="confirmRevert()">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import noData from "../../../components/no-data.vue";
import Icons from "../../../components/icons.vue";
import { CorporateActionRecord, CorporateActionRequest } from "./types";

const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-[#888]">
<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
</svg>`;

export default defineComponent({
  name: "corporateAction",
  components: {
    noData,
    Icons,
  },
  setup() {
    const symbol = ref("");
    const action = ref("");
    const ratio = ref("");
    const splitQty = ref("");
    const effectiveDate = ref(new Date().toISOString().slice(0, 10));
    const symbolError = ref("");
    const actionError = ref("");
    const ratioError = ref("");
    const splitQtyError = ref("");
    const effectiveDateError = ref("");
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const selectedScrip = ref<any>(null);
    const timerId: any = ref(null);
    const rowsCount = ref(10);
    const page = ref(1);
    const pages = ref(1);
    const isLastPage = ref(true);
    const revertDialog = ref(false);
    const revertRowData = ref<any>(null);
    const historyHeader = ref([
      { name: "Date & Time", csvKey: "dateTime", align: "text-left" },
      { name: "Symbol", csvKey: "symbol", align: "text-left" },
      { name: "Action", csvKey: "action", align: "text-left" },
      { name: "Ratio", csvKey: "ratio", align: "text-center" },
      { name: "Split Qty", csvKey: "splitQty", align: "text-center" },
      { name: "Effective Date", csvKey: "effectiveDate", align: "text-left" },
      { name: "Updated By", csvKey: "updatedBy", align: "text-left" },
    ]);
    return {
      symbol,
      action,
      ratio,
      splitQty,
      effectiveDate,
      symbolError,
      actionError,
      ratioError,
      splitQtyError,
      effectiveDateError,
      popover,
      selectedScrip,
      timerId,
      searchSvg,
      rowsCount,
      page,
      pages,
      isLastPage,
      revertDialog,
      revertRowData,
      historyHeader,
    };
  },
  computed: {
    ...mapState("tradecall", ["searchList"]),
    ...mapState("reports", ["corporateActionHistory"]),
    history(): CorporateActionRecord[] {
      return (this.corporateActionHistory || []).map((r: any) => ({
        id: r.id,
        dateTime: this.formatDateTime(r.dateTime || r.updatedOn || r.createdOn),
        symbol: r.symbol || "-",
        action: r.corporateAction || "-",
        ratio: r.ratio || "-",
        splitQty: r.splitQty || "-",
        effectiveDate: this.formatDateTime(r.effectiveDate, true),
        updatedBy: r.updatedBy || r.createdBy || "-",
        reverted: r.reverted ?? 0,
      }));
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
  },
  methods: {
    formatDateTime(value: any, dateOnly = false): string {
      if (!value) return "-";
      const d = new Date(value);
      if (isNaN(d.getTime())) return "-";
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      if (dateOnly) return `${day}/${month}/${year}`;
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
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
      if (!this.effectiveDate) {
        this.effectiveDateError = "Effective Date is required";
        valid = false;
      }
      return valid;
    },
    async getHistory(from: string) {
      if (from != "paginate") {
        this.page = 1;
        this.pages = 1;
      }
      const rows = await this.$store.dispatch(
        "reports/getCorporateActionHistory",
        {
          pageNo: this.page,
          pageSize: this.rowsCount,
        }
      );
      if (rows.length == 0 && this.page > 1) {
        this.isLastPage = true;
        this.pages = this.page - 1;
        this.page = this.page - 1;
        return;
      }
      this.$store.commit("reports/setCorporateActionHistory", rows);
      this.isLastPage = rows.length < this.rowsCount;
      if (!this.isLastPage && this.pages == this.page) {
        this.pages = this.page + 1;
      }
    },
    changePage(cpage: number) {
      if (this.page == cpage) return;
      this.page = cpage;
      this.getHistory("paginate");
    },
    goBack() {
      if (this.page == 1) return;
      this.page -= 1;
      this.getHistory("paginate");
    },
    forward() {
      if (this.isLastPage) return;
      this.page += 1;
      this.getHistory("paginate");
    },
    openRevertDialog(row: CorporateActionRecord) {
      this.revertRowData = row;
      this.revertDialog = true;
    },
    closeRevertDialog() {
      this.revertDialog = false;
      this.revertRowData = null;
    },
    async confirmRevert() {
      const success = await this.$store.dispatch(
        "reports/revertCorporateAction",
        { id: String(this.revertRowData.id) }
      );
      this.closeRevertDialog();
      if (!success) return;
      this.$notify({
        group: "auth",
        type: "success",
        title: `Corporate action reverted`,
      });
      this.getHistory("paginate");
    },
    async submitDetails() {
      if (!this.validate()) return;
      const payload: CorporateActionRequest = {
        symbol: this.selectedScrip.symbol || this.selectedScrip.tradingSymbol,
        token: String(this.selectedScrip.token),
        exch: this.selectedScrip.exchange,
        action: this.action.toUpperCase(),
        effectiveDate: (window as any).formatDate(
          new Date(this.effectiveDate),
          "D"
        ),
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
      this.getHistory("reset");
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
      this.effectiveDate = new Date().toISOString().slice(0, 10);
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.getHistory("reset");
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
    clearTimeout(this.timerId);
    this.$store.commit("tradecall/setSearchList", []);
  },
});
</script>
