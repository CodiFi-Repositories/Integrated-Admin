<template>
  <div class="w-full overflow-hidden p-4">
    <form>
      <div class="min-w-full sm:p-3 lg:p-4 w-[100%] bg-white rounded border">
        <div class="w-full flex items-center justify-between">
          <div class="flex justify-start items-center mb-4 w-full">
            <div
              class="flex flex-wrap"
              v-for="(buttonTab, index) in adminWatchlist"
            >
              <button
                v-on:click="changeActiveButtonTab(index)"
                class="inline-block px-3 pb-1 rounded-t-lg text-sm"
                type="button"
                :class="
                  index == activeData
                    ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#0081B8] dark:border-[#0081B8]'
                    : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
                "
              >
                <span>{{ buttonTab.mwName }}</span>
              </button>

              <div class="mx-2.5"></div>
            </div>
          </div>
          <section class="w-full mb-4 relative">
            <div
              class="flex items-center border rounded-full py-2 px-4 max-w-2xl justify-center bg-gray-100 cursor-not-allowed"
            >
              <span v-html="searchSvg"></span>
              <input
                type="search"
                v-model="search"
                placeholder="Search and Add Instruments"
                class="border-none outline-none placeholder:text-xs pl-1 w-full bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                @click="searchInput()"
              />
            </div>

            <div
              v-if="search.length > 0"
              class="absolute z-20 w-full bg-white border rounded-lg overflow-y-auto mt-2 max-h-[350px] max-w-2xl mx-auto"
            >
              <ul class="overflow-auto">
                <li
                  v-for="(item, index) in searchList"
                  :key="index"
                  class="flex justify-between px-2 py-3 border-b cursor-pointer hover:bg-slate-50"
                  @click="
                    searchRowClick(adminWatchlist[activeData], {
                      exchange: item.exchange,
                      token: item.token,
                    })
                  "
                >
                  <span class="text-sm">{{ item.formattedInsName }}</span>
                  <button
                    class="px-2 py-1 text-[11px] rounded w-[38px] text-white"
                    :class="[
                      item.exchange == 'NSE'
                        ? 'bg-green-500'
                        : item.exchange == 'BSE'
                        ? 'bg-red-500'
                        : 'bg-[#a3a7ab]',
                    ]"
                  >
                    {{ item.exchange }}
                  </button>
                </li>
              </ul>
            </div>

            <!-- <div v-else class="text-center py-8">No scrips added</div> -->
          </section>
        </div>

        <button
          v-if="selectedCheckbox && selectedCheckbox.length > 0"
          type="button"
          @click="multiDelete()"
          class="inline-flex w-full justify-center rounded-md outline-none bg-blue-600 px-6 py-2 text-sm text-white shadow-sm sm:ml-3 sm:w-auto mb-2"
        >
          Delete {{ selectedCheckbox.length }}
        </button>
        <section
          class="overflow-auto"
          :class="
            selectedCheckbox && selectedCheckbox.length > 0
              ? 'h-[calc(100vh-269px)]'
              : 'h-[calc(100vh-225px)]'
          "
        >
          <table
            v-if="
              adminWatchlist &&
              adminWatchlist.length > 0 &&
              adminWatchlist[activeData] &&
              adminWatchlist[activeData].scrips &&
              adminWatchlist[activeData].scrips.length > 0
            "
            class="w-full border rounded table-fixed cursor-pointer"
          >
            <thead class="sticky z-10 top-0 bg-white">
              <tr class="border-b border-[#ededed] text-[13px]">
                <th>
                  <input
                    v-model="selectAll"
                    type="checkbox"
                    name="default-radio-watchlist-head"
                    autocomplete="off"
                    @click="resetSearch()"
                    class="cursor-pointer w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
                <th v-for="head in tableHead" class="border-r">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="h-[100px]">
              <tr
                class="border-b border-[#ededed] text-sm"
                v-for="(item, index) in adminWatchlist[activeData].scrips"
                :key="index"
              >
                <td class="text-center">
                  <input
                    v-model="selectedCheckbox"
                    :value="item"
                    type="checkbox"
                    name="default-radio-watchlist"
                    autocomplete="off"
                    @input="resetSearch()"
                    class="cursor-pointer w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td class="truncate text-center border-r">
                  {{ item.tradingSymbol ?? "-" }}
                </td>
                <td class="truncate text-center border-r">
                  {{ item.exchange ?? "-" }}
                </td>

                <td class="text-center border-r">
                  {{ item.segment ?? "-" }}
                </td>
                <td class="text-center border-r">
                  {{ item.token ?? "-" }}
                </td>
                <td class="text-center border-r">
                  {{ item.pdc ?? "-" }}
                </td>
                <td class="truncate">
                  <div
                    class="flex gap-4 items-center justify-center align-middle cursor-pointer"
                  >
                    <!-- <a @click="showDeleteDialog(i)" class="text-black cursor-pointer" v-html="deleteSvg"></a> -->

                    <div>
                      <span
                        v-html="deleteSvg"
                        @click="callDeleteDialog(item)"
                      ></span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </form>
  </div>
  <adminDeleteDialog
    v-if="isAdminDeleteDialog"
    :isMultiDelete="isMultiDelete"
    :selectedCheckbox="selectedCheckbox"
    :currentScrip="currentScrip"
    :activeTab="activeData"
    @resetValues="resetAllCheckbox"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import adminDeleteDialog from "./adminConfirmDialog.vue";
import icons from "../../components/icons.vue";
const deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-auto cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
`;
const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-[#888]">
<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
</svg>`;
export default defineComponent({
  setup() {
    const activeData = ref(0);
    const tableHead = ref([
      { name: "Symbol" },
      { name: "Exchange" },
      { name: "Exchange Segment" },

      { name: "Token" },
      { name: "PDC" },
      { name: "Actions" },
    ]);
    const selectedCheckbox: any = ref([]);

    const isMultiDelete = ref(false);
    const currentScrip = ref({});
    const search = ref("");
    const timerId: any = ref(null);
    return {
      activeData,
      tableHead,
      deleteSvg,
      selectedCheckbox,
      currentScrip,
      searchSvg,
      search,
      isMultiDelete,
      timerId,
    };
  },
  components: {
    icons,
    adminDeleteDialog,
  },
  computed: {
    selectAll: {
      get: function () {
        return this.adminWatchlist[this.activeData].scrips
          ? this.selectedCheckbox &&
              this.selectedCheckbox.length ==
                this.adminWatchlist[this.activeData].scrips?.length
          : false;
      },
      set: function (value: any) {
        var selected: any = [];
        if (value) {
          this.adminWatchlist[this.activeData].scrips?.forEach(function (
            el: any
          ) {
            selected.push(el);
          });
        }

        this.selectedCheckbox = selected;
      },
    },
    ...mapState("content", ["adminWatchlist", "isAdminDeleteDialog"]),
    ...mapState("tradecall", ["searchList"]),
  },
  mounted() {
    this.$store.dispatch("content/getPredefinedMw");
  },
  methods: {
    searchRowClick(mw: any, data: any) {
      let json = {
        mwId: mw?.mwId,
        mwName: mw?.mwName,
        "predefined": "true",
        "isDefault": "false",
        scrips: [
          {
            token: data.token,
            exchange: data.exchange,
          },
        ],
      };

      this.$store.dispatch("content/addWatchScrips", json);

      data.checked = true;
      this.resetAllCheckbox("");
    },
    searchInput() {
      this.search = this.search.toUpperCase();
      this.$store.commit("tradecall/setSearchList", []);
    },
    changeActiveButtonTab(data: any) {
      this.activeData = data;
    },
    async multiDelete() {
      this.resetSearch();
      this.isMultiDelete = true;
      this.$store.commit("content/setIsAdminDeleteDialog", true);
    },
    callDeleteDialog(data: any) {
      this.currentScrip = data;
      this.isMultiDelete = false;
      this.$store.commit("content/setIsAdminDeleteDialog", true);
    },
    async resetAllCheckbox(_: any) {
      this.selectAll = false;
      this.selectedCheckbox = [];
    },
    callSearch(value: any) {
      var temp = {
        value: value.toString().toUpperCase(),
      };
      clearTimeout(this.timerId);
      this.$store.dispatch("tradecall/getSearchList", temp);
    },
    resetSearch() {
      this.search = "";
    },
  },
  watch: {
    search: function (newValue) {
      newValue = newValue.trim();
      clearTimeout(this.timerId);
      if (newValue && newValue.length > 1) {
        this.timerId = setTimeout(() => {
          this.callSearch(newValue);
        }, 500);
      }
    },
  },
});
</script>
