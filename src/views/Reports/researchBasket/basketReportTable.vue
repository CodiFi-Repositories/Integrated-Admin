<template>
  <div class="pt-4 rounded flex-1 min-h-0 flex flex-col">
    <div class="card p-5 border rounded bg-white shadow-sm flex flex-col min-h-0" v-if="rows && rows.length">
      <div class="border rounded mt-2 overflow-auto min-h-0">
        <table class="w-full overflow-auto">
          <thead class="text-[13px] sticky top-0 bg-white">
            <tr class="border-b">
              <th v-for="head in header" :key="head.csvKey" class="truncate border-r px-2"
                :class="alignByKey[head.csvKey]">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in showData" :key="id" class="border-b">
              <td v-for="head in header" :key="head.csvKey" class="truncate border-r px-2"
                :class="alignByKey[head.csvKey]">
                {{ formatCell(i[head.csvKey]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between shrink-0">
        <p class="primaryColor text-sm ml-2 mt-4">Total Records : {{ filteredRows.length }}</p>
        <commonPagination v-on:page-chg="getTableData" :tot-len="filteredRows.length" :page-date="rowsPerPage"
          :row-count="rowsCount" />
      </div>
    </div>
    <noData v-if="rows && rows.length == 0"> </noData>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import noData from "../../../components/no-data.vue";
import commonPagination from "../../../components/commonPagination.vue";
import { TableHeader } from "./types";

export default defineComponent({
  name: "basketReportTable",
  components: {
    noData,
    commonPagination,
  },
  props: {
    header: {
      type: Array as PropType<TableHeader[]>,
      required: true,
    },
    rows: {
      type: Array as PropType<any[] | null>,
      default: null,
    },
    basketFilter: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup() {
    const rowsCount = ref(20);
    const showData = ref<any[]>([]);
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    return {
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  computed: {
    filteredRows(): any[] {
      if (!this.rows) {
        return [];
      }
      if (!this.basketFilter.length) {
        return this.rows;
      }
      return this.rows.filter((r: any) =>
        this.basketFilter.includes(r.basketName)
      );
    },
    // numeric columns align right, text columns align left
    alignByKey(): Record<string, string> {
      const map: Record<string, string> = {};
      for (const head of this.header) {
        const row: any = (this.rows || []).find(
          (r: any) => r[head.csvKey] != null
        );
        map[head.csvKey] =
          typeof row?.[head.csvKey] == "number" ? "text-right" : "text-left";
      }
      return map;
    },
  },
  methods: {
    formatCell(value: any) {
      if (typeof value == "number" && !Number.isInteger(value)) {
        return value.toFixed(2);
      }
      return value ?? "";
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.filteredRows.length : data.last;
      if (this.filteredRows.length > 0) {
        this.showData = this.filteredRows.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
  },
  watch: {
    filteredRows: {
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
});
</script>
