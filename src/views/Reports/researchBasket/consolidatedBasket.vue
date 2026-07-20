<template>
  <div class="flex-1 min-h-0 flex flex-col">
    <div class="card p-4 border rounded bg-white shadow-sm shrink-0">
      <form class="gap-4 flex flex-wrap" @submit.prevent="getDetails()">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">User ID</label>
          <div class="flex items-center min-w-[160px] h-10 border rounded p-2">
            <input v-model="userId" placeholder="Enter User ID"
              class="w-full h-9 ml-1 text-xs outline-none" />
          </div>
        </div>

        <div class="flex items-end" v-if="basketNames.length">
          <button type="button"
            class="h-10 min-w-[100px] border rounded text-xs primaryColor px-3 cursor-pointer flex items-center justify-center gap-2"
            @click="showFilter = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
            </svg>
            Filter
            <span v-if="selectedBaskets.length"
              class="negativeBackground text-white rounded-full px-2 py-0.5 text-[10px]">
              {{ selectedBaskets.length }}
            </span>
          </button>
        </div>

        <div class="flex gap-3 items-end">
          <button type="submit"
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader">
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
            v-if="getCumulativeBasketData?.length"
            @click="downloadUnicodeCSV(getCumulativeBasketData, 'Consolidated Basket Report', header)">
            Download
          </button>
        </div>
      </form>
    </div>

    <basketFilterPanel :show="showFilter" :basket-names="basketNames" :selected="selectedBaskets"
      @close="showFilter = false" @apply="applyBasketFilter" />

    <basketReportTable :header="header" :rows="getCumulativeBasketData" :basket-filter="selectedBaskets" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import commonFunc from "../../../mixins/commonFunc";
import basketReportTable from "./basketReportTable.vue";
import basketFilterPanel from "./basketFilterPanel.vue";
import {
  CumulativeBasketRequest,
  TableHeader,
  distinctBasketNames,
} from "./types";

export default defineComponent({
  name: "consolidatedBasket",
  components: {
    basketReportTable,
    basketFilterPanel,
  },
  mixins: [commonFunc],
  setup() {
    const userId = ref("");
    const selectedBaskets = ref<string[]>([]);
    const showFilter = ref(false);
    const header = ref<TableHeader[]>([
      { name: "User ID", csvKey: "userId" },
      { name: "Research ID", csvKey: "researchId" },
      { name: "Basket Name", csvKey: "basketName" },
      { name: "Buy Lot", csvKey: "buyLot" },
      { name: "Executed Buy Qty", csvKey: "executedBuyQty" },
      { name: "Buy Value", csvKey: "buyValue" },
      { name: "Sell Lot", csvKey: "sellLot" },
      { name: "Executed Sell Qty", csvKey: "executedSellQty" },
      { name: "Sell Value", csvKey: "sellValue" },
      { name: "Net Qty (Open)", csvKey: "netQty" },
      { name: "Net Value", csvKey: "netValue" },
    ]);
    return {
      userId,
      selectedBaskets,
      showFilter,
      header,
    };
  },
  computed: {
    ...mapGetters("reports", ["getCumulativeBasketData", "getLoader"]),
    basketNames(): string[] {
      return distinctBasketNames(this.getCumulativeBasketData);
    },
  },
  methods: {
    applyBasketFilter(selected: string[]) {
      this.selectedBaskets = selected;
    },
    getDetails() {
      // if (this.userId.trim()) {
        const json: CumulativeBasketRequest = {
          userId: this.userId ? this.userId.trim() : '',
        };
        this.selectedBaskets = [];
        this.$store.dispatch("reports/getCumulativeBasketReport", json);
      // } else {
      //   this.$notify({
      //     group: "auth",
      //     type: "error",
      //     title: `Enter a User ID`,
      //   });
      // }
    },
  },
  unmounted() {
    this.$store.commit("reports/setCumulativeBasketData", null);
  },
});
</script>
