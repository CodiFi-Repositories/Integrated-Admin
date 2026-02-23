<template>
  <div class="p-5 h-full" v-if="!loader">
    <!--  -->
    <div class="pt-4 rounded">
      <div class="card p-5 border rounded bg-white shadow-sm" v-if="getDeactivatedSymbols?.length > 0">
        <form class="w-full flex justify-end pb-4">
          <div class="flex gap-2">
            <div class="[w-120px] h-10">
              <div class="flex pl-4 items-start">
                <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                  type="button" v-if="getDeactivatedSymbols?.length" @click="
    downloadUnicodeCSV(
      getDeactivatedSymbols,
      'Deactivated Symbols',
      header
    )
    ">
                  Download
                </button>
              </div>
            </div>
          </div>
        </form>
        <!--  -->

        <div class="border rounded bg-white shadow-sm" v-if="getDeactivatedSymbols?.length > 0">
          <table class="bg-white w-full my-2">
            <thead class="border-b border-[#ededed] text-sm">
              <tr>
                <th v-for="head in header" class="text-left">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, id) in showData" :key="id" class="border-b text-sm border-[#ededed] hover:bg-gray-100">
                <td class="text-left">
                  {{
    i?.exchSegment.toUpperCase()
      ? i?.exchSegment.toUpperCase()
      : "-"
  }}
                </td>
                <td class="text-left">
                  {{
      i?.groupName.toUpperCase()
        ? i?.groupName.toUpperCase()
        : "-"
    }}
                </td>
                <td class="text-left">
                  {{ i?.symbol.toUpperCase() ? i?.symbol.toUpperCase() : "-" }}
                </td>
                <td class="text-left">
                  {{
    i?.instrumentName.toUpperCase()
      ? i?.instrumentName.toUpperCase()
      : "-"
  }}
                </td>
                <td class="text-left">
                  {{ i?.token ? i?.token : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Coming soon -->
        </div>
        <commonPagination v-if="getDeactivatedSymbols && getDeactivatedSymbols.length" v-on:page-chg="getTableData"
          :tot-len="getDeactivatedSymbols.length" :page-date="rowsPerPage" :row-count="rowsCount" />
      </div>
    </div>
    <noData v-if="getDeactivatedSymbols?.length == 0"></noData>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/commonFunc";
import commonPagination from "../../components/commonPagination.vue";

export default defineComponent({
  setup() {
    const header = ref([
      { name: "Exchange Segment", csvKey: "exchSegment" },
      { name: "Group Name", csvKey: "groupName" },
      { name: "Symbol", csvKey: "symbol" },
      { name: "Instrument Name", csvKey: "instrumentName" },
      { name: "Token", csvKey: "token" },
    ]);
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
    return { header, rowsCount, rowsPerPage, showData };
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.getDeactivatedSymbols.length : data.last;
      if (this.getDeactivatedSymbols && this.getDeactivatedSymbols.length > 0) {
        this.showData = this.getDeactivatedSymbols.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
  },
  computed: {
    ...mapGetters("cMaster", ["getDeactivatedSymbols"]),
    ...mapGetters("cMaster", { loader: "getLoader" }),
  },
  components: {
    noData,
    commonPagination,
  },
  mixins: [commonFunc],
  created() {
    this.$emit("deactivated_header", {
      header: this.header,
      data: this.getDeactivatedSymbols,
    });
    this.$store.dispatch("cMaster/getDeactivatedSymbols").finally(() => {
      var data = {
        from: 0,
        last: this.rowsCount,
        count: this.rowsCount,
      };
      this.getTableData(data);
    });
  },
});
</script>
