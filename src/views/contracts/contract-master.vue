<template>
  <div>
    <div class="p-4 h-full" v-if="!loader">
      <div class="card p-4 h-full rounded border">
        <div class="mb-6 gap-4 flex flex-wrap">
          <div>
            <p class="primaryColor pb-1 text-sm ml-2">Symbol</p>
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <input v-model="symbol" class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs" />
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm ml-2">Exchange</p>
            <!-- <select v-model="selectedExchangeData" class="border min-w-[160px] h-10 rounded focus:outline-0 px-4 text-xs">
              <option :value="list" v-for="(list, index) in exchangeData" :key="index">
                {{ list }}
              </option>
            </select> -->
            <Listbox as="div" v-model="selectedExchangeData" class="min-w-[200px] h-10 focus:outline-0 text-xs">
              <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
              <div class="relative">
                <ListboxButton
                  class="relative w-full h-10 cursor-pointer bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded sm:text-sm sm:leading-6">
                  <span class="block truncate">{{
      selectedExchangeData.name
    }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                    <ListboxOption as="template" v-for="stock in selectExch" :key="stock.id" :value="stock"
                      v-slot="{ active, selectedExchangeData }">
                      <li :class="[
      active
        ? 'bg-[#d1d1d185] text-black '
        : 'text-gray-900',
      'relative cursor-pointer select-none py-2 pl-3 pr-9',
    ]">
                        <span :class="[
      selectedExchangeData
        ? 'font-semibold'
        : 'font-normal',
      'block truncate',
    ]">{{ stock.name }}</span>

                        <span v-if="selectedExchangeData" :class="[
      active ? 'text-white' : 'text-blue-600',
      'absolute inset-y-0 right-0 flex items-center pr-4',
    ]">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <!-- <div>
            <p class="primaryColor pb-1 text-sm ml-2">Group</p>
             @change="addDays(fromDate, 10, 'fromDate')"
            <input v-model="group" class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />

          </div> -->
          <div>
            <!-- <p class="primaryColor pb-1 text-sm">Expiry Date</p> -->
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <!-- <input v-model="expiry" type="date" class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
              :max="new Date().toISOString().slice(0, 10)" /> -->
            <label class="primaryColor pb-1 text-sm ml-2">To Date</label>
            <VDatePicker :max-date="today" v-model.string="expiry" is-required :popover="popover" :masks="{
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

          <div class="flex items-end">
            <button @click="getContractMaster"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs">
              <p>Submit</p>
              <svg v-if="isLoading == true" class="animate-spin h-5 w-5 text-white flex mx-auto"
                xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
          </div>
        </div>
        <div class="h-full">
          <div class="flex-grow overflow-auto h-[20px]"></div>
        </div>
      </div>
      <div class="card p-4 border rounded bg-white shadow-sm" v-if="contractMasterData.length">
        <div class="border rounded mt-2">
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="border-r">{{ head.name }}</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in showData" :key="id" class="border-b">
                <td class="truncate border-r text-center">
                  {{ i.formattedInsName }}
                </td>
                <td class="truncate border-r text-center">{{ i.symbol }}</td>
                <td class="truncate border-r text-center">
                  {{ i.isin }}
                </td>
                <td class="truncate border-r text-center">
                  {{ i.lotSize }}
                </td>
                <td class="truncate border-r text-center">
                  {{ i.tickSize }}
                </td>
                <td class="truncate text-center">{{ i.token }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <commonPagination v-if="contractMasterData && contractMasterData.length" v-on:page-chg="getTableData"
          :tot-len="contractMasterData.length" :page-date="rowsPerPage" :row-count="rowsCount" />
      </div>
      <noData v-else> </noData>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState, mapGetters } from "vuex";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import noData from "../../components/no-data.vue";
export default defineComponent({
  components: {
    Icons,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    noData,
    CheckIcon,
    ChevronUpDownIcon,
    commonPagination,
  },
  setup() {
    const isLoading = ref(false);
    const symbol = ref("");
    const today = new Date();
    const header = ref([
      { name: "Scrip Name", csvKey: "formattedInsName" },
      { name: "Symbol", csvKey: "symbol" },
      { name: "ISIN Number", csvKey: "isin" },
      { name: "Lot Size", csvKey: "lotSize" },
      { name: "Tick Size", csvKey: "tickSize" },
      { name: "Token", csvKey: "token" },
    ]);
    // const selectedExchangeData = ref("nse_fo");
    const group = ref("");
    const expiry = new Date();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const selectExch = [
      { id: 0, name: "" },
      { id: 1, name: "nse_fo" },
      { id: 2, name: "nse_cm" },
      { id: 3, name: "cde_fo" },
      { id: 4, name: "bse_cm" },
      { id: 5, name: "nse_idx" },
      { id: 6, name: "bse_idx" },
    ];
    const selectedExchangeData = ref(selectExch[1]);
    // const rawDate = ref('');
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
      isLoading,
      symbol,
      group,
      expiry,
      selectedExchangeData,
      popover,
      selectExch,
      today,
      header,
      rowsCount,
      rowsPerPage,
      showData,
    };
  },

  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.contractMasterData.length : data.last;
      if (this.contractMasterData && this.contractMasterData.length > 0) {
        this.showData = this.contractMasterData.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },

    getContractMaster() {
      let json = {
        symbol: this.symbol,
        exch: this.selectedExchangeData.name,
        // group: this.group,
        expiry: this.expiry,
      };

      this.$store
        .dispatch("cMaster/getContractMasterData", json)
        .finally(() => {
          let data = { count: 0, last: 0, from: 0 };
          data.count = this.rowsCount;
          data.last = this.rowsCount;
          data.from = 0;
          this.getTableData(data);
        });
    },
  },
  computed: {
    ...mapState("cMaster", ["exchangeData", "contractMasterData"]),
    ...mapGetters("cMaster", { loader: "getLoader" }),
  },

  mounted() {
    this.expiry = (window as any).formatDate(this.expiry, "D");
  },
});
</script>
