<template>
  <div class="p-5 h-full" v-if="!loader">
    <!--  -->
    <div class="pt-4 rounded">
      <div class="card p-5 border rounded bg-white shadow-sm" v-if="getSmsLogsDetails?.length">
        <form class="w-full flex justify-end pb-4">
          <div class="flex gap-2">
            <div class="[w-120px] h-10">
              <div class="flex pl-4 items-start">
                <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                  type="button" v-if="getSmsLogsDetails?.length" @click="
    downloadUnicodeCSV(getSmsLogsDetails, 'SMSLogs', header)
    ">
                  Download
                </button>
              </div>
            </div>
          </div>
        </form>

        <!--  -->
        <div class="border rounded bg-white shadow-sm overflow-auto" v-if="getSmsLogsDetails?.length > 0">
          <table class="bg-white w-full">
            <thead class="border-b text-sm">
              <tr>
                <th class="text-left border-r">Mobile No</th>
                <th class="text-left border-r">Request Log</th>
                <th class="text-left border-r">Response Log</th>
                <th class="text-left border-r">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, id) in showData" :key="id" class="border-b text-sm hover:bg-gray-100">
                <td class="text-left border-r">
                  {{ i?.mobileNumber ? i?.mobileNumber : "-" }}
                </td>
                <td class="text-left border-r">
                  {{ i?.reqLog ? i?.reqLog : "-" }}
                </td>
                <td class="text-left border-r">
                  {{ i?.responseLog ? i?.responseLog : "-" }}
                </td>
                <td class="text-left border-r">
                  {{ i?.createdOn ? i?.createdOn : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Coming soon -->

        <commonPagination v-if="getSmsLogsDetails && getSmsLogsDetails.length" v-on:page-chg="getTableData"
          :tot-len="getSmsLogsDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
      </div>
    </div>
    <noData v-if="getSmsLogsDetails?.length == 0"></noData>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/commonFunc";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
export default defineComponent({
  setup() {
    const header = ref([
      { name: "MobileNo", csvKey: "mobileNumber" },
      { name: "RequestLog", csvKey: "reqLog" },
      { name: "ResponseLog", csvKey: "responseLog" },
      { name: "Time", csvKey: "createdOn" },
    ]);
    const rowsPerPage = ref([
      { id: 1, option: 10 },
      { id: 2, option: 20 },
      { id: 3, option: 30 },
      { id: 4, option: 50 },
      { id: 5, option: "All" },
    ]);
    const rowsCount = ref(20);
    const page = ref(1);
    const pages = ref(2);
    const value = ref("");
    const bindData = ref();
    const firstIndex = ref(0);
    const showData = ref();
    return {
      header,
      rowsPerPage,
      rowsCount,
      page,
      pages,
      value,
      bindData,
      firstIndex,
      showData,
    };
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.getSmsLogsDetails.length : data.last;
      if (this.getSmsLogsDetails && this.getSmsLogsDetails.length > 0) {
        this.showData = this.getSmsLogsDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
  },
  components: { noData, Icons, commonPagination },
  mixins: [commonFunc],
  computed: {
    ...mapGetters("accessLog", ["getSmsLogsDetails"]),
    ...mapGetters("accessLog", { loader: "getLoader" }),
  },
  created() {
    this.$store.dispatch("accessLog/getSmsLogsData").finally(() => {
      var data = {
        from: this.firstIndex,
        last: this.rowsCount,
        count: this.rowsCount,
      };

      this.getTableData(data);
    });
    this.$emit("smslogs_header", {
      header: this.header,
    });
    this.$store.dispatch("accessLog/getSmsLogsData");
  },
});
</script>
