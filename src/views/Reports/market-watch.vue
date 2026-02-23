<template>
  <div>
    <div class="p-4 h-full">
      <div class="card p-4 border rounded">
        <form
          @submit.prevent="getLoader ? '' : getWatchlistData()"
          class="flex gap-4"
        >
          <div>
            <p class="primaryColor pl-2 pb">User ID</p>
            <input
              type="text"
              v-model="userId"
              maxlength="10"
              class="border min-w-[200px] h-10 rounded focus:outline-0 px-4"
            />
            <div class="h-4 ml-2 mt-2 text-red-500 text-xs">
              <span v-if="submitted && userId == ''">User ID is required</span>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="getLoader ? '' : getWatchlistData()"
              type="submit"
              :disabled="getLoader"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
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
          </div>
          <div
            v-if="activeTabData && activeTabData.length > 0"
            class="flex items-center"
          >
            <button
              @click="downloadCsv()"
              type="button"
              :disabled="getLoader"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            >
              <p>Download</p>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="p-4 h-full"
      v-if="marketWatchData && marketWatchData.length > 0"
    >
      <div class="flex justify-start items-center mb-4">
        <div class="flex flex-wrap" v-for="buttonTab in tabData">
          <button
            v-on:click="changeActiveButtonTab(buttonTab)"
            class="inline-block px-3 pb-1 rounded-t-lg text-sm"
            type="button"
            :class="
              buttonTab.id == activeTabNumber
                ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#005CB9] dark:border-[#005CB9]'
                : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
            "
          >
            <span>{{ `Tab ${buttonTab.id}` }}</span>
          </button>

          <div class="mx-2.5"></div>
        </div>
      </div>
      <div class="" v-if="activeTabData && activeTabData.length > 0">
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
                <tr v-for="(i, id) in showData" :key="id" class="border-b">
                  <td class="text-center border-r border-[#ededed]">
                    {{ i.formattedInsName }}
                  </td>
                  <td class="text-center border-r border-[#ededed]">
                    {{ i.exch }}
                  </td>
                  <td class="text-center border-r border-[#ededed]">
                    {{ i.pdc }}
                  </td>
                  <td class="text-center border-r border-[#ededed]">
                    {{ i.token }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <commonPagination
            v-if="activeTabData && activeTabData.length"
            v-on:page-chg="getTableData"
            :tot-len="activeTabData.length"
            :page-date="rowsPerPage"
            :row-count="rowsCount"
          />
        </div>
      </div>
      <div class="" v-else>
        <div class="flex items-center justify-center relative font-bold">
          <h2>No Records Found</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import commonFunc from "../../mixins/commonFunc";
import commonPagination from "../../components/commonPagination.vue";
export default defineComponent({
  setup() {
    const userId = ref("");
    const submitted = ref(false);
    const header = ref([
      { name: "Scrip Name", csvKey: "formattedInsName" },
      { name: "Exchange", csvKey: "exch" },
      { name: "PDC", csvKey: "pdc" },
      { name: "Token", csvKey: "token" },
    ]);
    const activeTabData = ref();
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
      userId,
      submitted,
      header,
      activeTabData,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  mixins: [commonFunc],
  computed: {
    ...mapState("reports", [
      "currentMarketWatchData",
      "activeTabNumber",
      "marketWatchData",
      "tabData",
    ]),
    ...mapGetters("reports", ["getLoader"]),
  },
  components: { commonPagination },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.activeTabData.length : data.last;
      if (this.activeTabData && this.activeTabData.length > 0) {
        this.showData = this.activeTabData.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    downloadCsv() {
      this.downloadUnicodeCSV(
        this.activeTabData,
        `${this.userId}_Watchlist_${this.activeTabNumber}`,
        this.header
      );
    },
    changeActiveButtonTab(el: any) {
      this.$store.commit("reports/setActiveTabNumber", el.id);
      this.activeTabData = el.scrips;
      var data = {
        from: 0,
        last: this.rowsCount,
        count: this.rowsCount,
      };
      this.getTableData(data);
    },
    async getWatchlistData() {
      if (!!this.userId) {
        this.submitted = false;
        await this.$store
          .dispatch("reports/getMarketWatchData", this.userId)
          .finally(() => {
            this.$store.commit("reports/setActiveTabNumber", 0);
            this.changeActiveButtonTab(this.tabData[0]);
          });
      } else {
        this.submitted = true;
      }
    },
  },
  unmounted() {
    this.$store.commit("reports/setMarketWatchData", []);
    this.$store.commit("reports/setTabData", "final");
  },
});
</script>
