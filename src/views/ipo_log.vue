<template>
  <div class="p-4 h-full">
    <div class="card p-5 border rounded bg-white shadow-sm">
      <div class="mb-4 gap-2 flex flex-wrap ">
        <div class="gap-2 flex flex-wrap w-[50%]">
          <div>
            <label class="primaryColor pb-1 text-sm ml-2">From Date *</label>
            <VDatePicker type="date" :max-date="new Date().toISOString().slice(0, 10)" :min-date="getMinDate()"
              v-model="fromDate" is-required :popover="popover" :masks="{
              input: 'DD-MM-YYYY',
              modelValue: 'DD-MM-YYYY',
            }" mode="date" is24hr :dateFormat="'DD-MM-YYYY'">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                  <input :value="inputValue" placeholder="DD-MM-YYYY" v-on="inputEvents"
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
            <label class="primaryColor pb-1 text-sm ml-2">To Date *</label>
            <VDatePicker type="datetime-local" :max-date="today" :min-date="fromDate" v-model="toDate" is-required
              :popover="popover" :masks="{
              input: 'DD-MM-YYYY',
              modelValue: 'DD-MM-YYYY',
            }" mode="date" :dateFormat="'DD-MM-YYYY'">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
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
          <div class="flex justify-end pt-6 gap-2">
            <div class="min-w-[120px] h-10">
              <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                :disabled="ipo_Loader" @click="getReports()">
                <p v-if="!ipo_Loader">Submit</p>
                <svg v-if="ipo_Loader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                  xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex w-full items-end justify-end w-[49%]" v-if="ipoData.count && ipoData.count > 0">
          <input type="search" v-model="search" placeholder="Search" maxlength="10" @blur="search = ''"
            class="border font-light min-w-[200px] mr-4 h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
          <!-- <button type="button" class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs">
            <p>Download</p>
          </button> -->
        </div>
      </div>


    </div>

    <div class="card mt-5  rounded bg-white shadow-sm" v-if="showData && showData.length > 0">
      <table class="w-full border rounded table-fixed h-full cursor-pointer">
        <thead>

          <tr class="border-b border-[#ededed] text-[13px]">
            <th v-for="head in headers" class="border-r" :class="head.class">
              {{ head.name }}
            </th>
          </tr>
        </thead>
        <tbody class="h-[100px]">
          <tr class="border-b border-[#ededed] text-sm" v-for="(item, index) in getSearchData" :key="index">
            <td class="truncate text-center border-r">
              {{ item.userId ? item.userId : 'NA' }}
            </td>
            <td class="truncate text-center border-r">
              {{ item.scripId ? item.scripId : 'NA' }}
            </td>
            <td class="truncate text-center border-r">
              {{ item.applicationNo ? item.applicationNo : 'NA' }}
            </td>
            <td class="truncate text-center border-r">{{ item.category ? item.category : 'NA' }}</td>
            <td class="truncate text-center border-r">
              {{ item.chequeAmount ? item.chequeAmount : 'NA' }}
            </td>
            <td class="text-center">{{ item.statusCode || item.statusMessage ? `${item.statusCode} -
              ${item.statusMessage}` :
              'NA' }}</td>
          </tr>
        </tbody>
      </table>

      <commonPagination :totLen="ipoData.count" :rowCount="rowsCount" :pageDate="rowPerPage"
        @page-chg="listenPageChange" />

    </div>
    <noData v-else> </noData>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import Icons from "../components/icons.vue";
import commonPagination from '../components/commonPagination.vue'
import noData from '../components/no-data.vue'
export default defineComponent({
  name: 'ipo_logs',
  setup() {
    const today = new Date();
    const fromDate = ref();
    const toDate = ref();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const headers = ref([
      { name: 'userId', class: 'text-center' },
      { name: 'Scrip Name', class: 'text-center' },
      { name: 'Application No.', class: 'text-center' },
      { name: 'Category', class: 'text-center' },
      { name: 'Amount', class: 'text-center' },
      { name: 'Status', class: 'text-center' }
    ])
    const rowsCount = ref(10)
    const isBottom = ref(false)
    const rowPerPage = ref([
      { id: 1, option: 10 },
      { id: 2, option: 20 },
      { id: 3, option: 30 },
      { id: 4, option: 50 },
      { id: 5, option: "All" },
    ])
    const showData = ref<any>([])
    const search = ref<any>('')
    return {
      today, fromDate, toDate, popover, headers, rowsCount, isBottom, rowPerPage, showData, search
    }
  },
  components: {
    commonPagination, Icons, noData
  },
  methods: {
    getMinDate() {
      let date = new Date();
      let newMonth = date.getMonth() - 1;
      date.setMonth(newMonth);
      return date.toISOString().slice(0, 10);
    },
    async setPreviousWeekDatetime() {
      const now = new Date();
      // now.setDate(now.getDate() - 7); // Subtract 7 days
      const year = now.getFullYear().toString().padStart(4, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      this.toDate = this.fromDate = new Date(`${year}-${month}-${day}`);
    },
    dateFormatter(date: any) {
      if (!date) return null;

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      //   const hours = date.getHours().toString().padStart(2, "0");
      //   const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    async getReports() {
      await this.$store.dispatch('accessLog/getIPOlist', { startDate: this.dateFormatter(this.fromDate), endDate: this.dateFormatter(this.toDate) }).finally(() => {
        this.listenPageChange({
          "from": 0,
          "last": 10,
          "count": 10
        })
      })

    },
    listenPageChange(event: any) {
      this.rowsCount = event.count;

      if (this.ipoData && this.ipoData.ipoOrderDetails.length > 0) {
        let fromIndex = event.from;
        let lastIndex =
          event.last == "" ? this.ipoData.ipoOrderDetails.length : event.last;
        this.showData = this.ipoData.ipoOrderDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    }
  },
  computed: {
    ...mapState('accessLog', ['ipo_Loader', 'ipoData']),

    getSearchData() {
      return this.showData.filter((user: any) =>
        (user.userId).toLowerCase().includes(this.search.toLowerCase()) || (user.scripId).toLowerCase().includes(this.search.toLowerCase()) || (user.applicationNo).toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  async mounted() {
    this.$store.commit('accessLog/setIpoData', '')
    await this.setPreviousWeekDatetime()
    await this.getReports()
  }
})
</script>