<template>
  <section>
    
    <div class="p-5 h-full">
      <div class="bg-white p-4 border rounded" v-if="getAmoHolidaysData.length">
         <h1 class="pb-5">Holiday </h1>
        <div class="border rounded mt-2" >
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="border-r text-center">
                  {{ head.name }}
                </th>
                <!-- <th class="border-r text-center">S.NO</th>
              <th class="border-r">Version</th>
              <th class="border-r">Device Type</th>
              <th class="border-r">OS</th>
              <th class="border-r">Update Available</th>
              <th class="border-r">Actions</th> -->
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(i, id) in getAmoHolidaysData"
                :key="id"
                class="border-b"
              >
                <td class="text-center border-r border-[#ededed]">
                  {{ i.holidays ? i.holidays : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.date ? i.date : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.day ? i.day : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.morningSession ? getHoliday(i.morningSession) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.eveningSession ? getHoliday(i.eveningSession) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{
                    i.settlementHoliday ? getHoliday(i.settlementHoliday) : "-"
                  }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.bcdHoliday ? getHoliday(i.bcdHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.bfoHoliday ? getHoliday(i.bfoHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.cdsHoliday ? getHoliday(i.cdsHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.mcxHoliday ? getHoliday(i.mcxHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.bseHoliday ? getHoliday(i.bseHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.nseHoliday ? getHoliday(i.nseHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.nfoHoliday ? getHoliday(i.nfoHoliday) : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.info ? i.info : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <commonPagination
          v-if="getAmoHolidaysData && getAmoHolidaysData.length"
          v-on:page-chg="getTableData"
          :tot-len="getAmoHolidaysData.length"
          :page-date="rowsPerPage"
          :row-count="rowsCount"
        /> -->
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  setup() {
    const header = ref([
      { name: "Holiday", csvKey: "holidays" },
      { name: "Date", csvKey: "date" },
      { name: "Day", csvKey: "day" },
      { name: "Morning Session", csvKey: "morningSession" },
      { name: "Evening Session", csvKey: "eveningSession" },
      { name: "Settlement Holiday", csvKey: "settlementHoliday" },
      { name: "BCD", csvKey: "bcdHoliday" },
      { name: "BFO", csvKey: "bfoHoliday" },
      { name: "CDS", csvKey: "cdsHoliday" },
      { name: "MCX", csvKey: "mcxHoliday" },
      { name: "BSE", csvKey: "bseHoliday" },
      { name: "NSE", csvKey: "nseHoliday" },
      { name: "NFO", csvKey: "nfoHoliday" },
      { name: "Info", csvKey: "info" },
    ]);
    return {
      header,
    };
  },
  computed: {
    ...mapGetters("amoControls", ["getAmoHolidaysData"]),
  },
  methods: {
    getHoliday(data: any) {
      let isHoliday = "No";
      if (data && Number(data) == 1) {
        isHoliday = "Yes";
      }
      return isHoliday;
    },
  },
});
</script>
