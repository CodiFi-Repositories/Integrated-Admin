<template>
  <div class="p-5 h-full">
    <div class="bg-white p-4 border rounded">
      <div class="flex justify-end items-center">
        <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs mr-4" type="button"
          v-if="holidays?.length" @click="downloadUnicodeCSV(holidays, 'Holidays', header)">
          <span>Download</span>
        </button>
        <button type="button" class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
          @click="addHolidays()">
          <span v-if="!getLoader">Add Holiday</span>
          <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto" xmlns="http://www.w3.org/2000/svg"
            fill="#fffff" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
      </div>

      <div class="border rounded mt-2" v-if="holidays.length">
        <table class="w-full">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th v-for="head in header" class="border-r text-center">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in showData" :key="id" class="border-b">
              <td class="text-center border-r border-[#ededed]">
                {{ i.date }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.holidays }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.sessions }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.exchanges }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                <span v-html="deleteSvg" @click="openDialog(i.holidays)"></span>

                <!-- <input
                    autocomplete="off"
                    class="negativeBackground hover:negativeBackground text-white h-10 w-[120px] cursor-pointer rounded"
                    type="submit"
                    value="Delete"
                  /> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <commonPagination v-if="holidays && holidays.length" v-on:page-chg="getTableData" :tot-len="holidays.length"
        :page-date="rowsPerPage" :row-count="rowsCount" />
    </div>
    <deleteHoliday :holidays="deleteHolidayKey" v-if="deleteHolidayDialog"></deleteHoliday>
  </div>
</template>

<script lang="ts">
import commonPagination from "../../components/commonPagination.vue";
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import deleteHoliday from "./delete-holiday.vue";
import commonFunc from "../../mixins/commonFunc";
export default defineComponent({
  name: "tradingSession",
  mixins: [commonFunc],
  setup() {
    const header = ref([
      { name: "Date", csvKey: "date" },
      { name: "Event", csvKey: "holidays" },
      { name: "Sessions", csvKey: "sessions" },
      { name: "Exchanges ", csvKey: "exchanges" },
      { name: "Action" },
    ]);
    const getLoader = ref(false);
    const rowsCount = ref(20);
    const showData = ref();
    const rowsPerPage = ref([
      { id: 0, option: 5 },
      { id: 1, option: 10 },
      { id: 2, option: 20 },
      { id: 3, option: "All" },
    ]);
    const deleteHolidayKey = ref("");
    const deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-auto cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
`;
    return {
      header,
      rowsCount,
      showData,
      rowsPerPage,
      getLoader,
      deleteHolidayKey,
      deleteSvg,
    };
  },
  components: {
    commonPagination,
    deleteHoliday,
  },
  async created() {
    await this.$store.dispatch("settings/getHoliday").finally(() => {
      let data = { count: 0, last: 0, from: 0 };
      data.count = this.rowsCount;
      data.last = this.rowsCount;
      data.from = 0;
      this.getTableData(data);
    });
  },
  computed: {
    ...mapState("settings", ["holidays", "deleteHolidayDialog"]),
  },
  watch: {
    holidays: {
      handler() {
        // Call your method here
        let data = { count: 0, last: 0, from: 0 };
        data.count = this.rowsCount;
        data.last = this.rowsCount;
        data.from = 0;
        this.getTableData(data);
      },
      immediate: true, // This triggers the handler immediately during component initialization
    },
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.holidays.length : data.last;
      if (this.holidays && this.holidays.length > 0) {
        this.showData = this.holidays.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    addHolidays() {
      this.$router.push("/addholiday");
    },
    openDialog(val: any) {
      this.deleteHolidayKey = val;
      this.$store.commit("settings/setDeleteHolidayDialog", true);
    },
  },
});
</script>
