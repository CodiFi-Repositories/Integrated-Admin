<template>
  <div class="p-5 h-full" v-if="!loader">
    <!--  -->
    <div class="pt-4 rounded">
      <div class="card p-5 border rounded bg-white shadow-sm" v-if="getEmailLogsDetails?.length">
        <form class="w-full flex justify-end pb-4">
          <div class="flex gap-2">
            <div class="[w-120px] h-10">
              <div class="flex pl-4 items-start">
                <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                  type="button" v-if="getEmailLogsDetails?.length" @click="
    downloadUnicodeCSV(getEmailLogsDetails, 'MailLogs', header)
    ">
                  Download
                </button>
              </div>
            </div>
          </div>
        </form>

        <!--  -->
        <div class="border ex rounded bg-white shadow-sm overflow-auto" v-if="getEmailLogsDetails?.length > 0">
          <table class="bg-white! w-full">
            <thead class="text-sm">
              <tr class="border-b">
                <th class="text-left border-r">E-Mail</th>
                <th class="text-left border-r">RequestLog</th>
                <th class="text-left border-r">ResponseLog</th>
                <th class="text-left border-r">Timeee</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, id) in showData" :key="id" class="border-b text-sm hover:bg-gray-100">
                <td class="text-left border-r">
                  {{ i?.emailId ? i?.emailId : "-" }}
                </td>
                <td class="text-left border-r">
                  <span>
                    {{ i?.reqLogSub ? i?.reqLogSub : "-" }}
                    <a v-if="i.reqLog" class="text-blue-500 cursor-pointer underline text-xs" @click="
    $store.commit('accessLog/setIsMailDial', true),
    (bindData = { data: i.reqLog, subject: i.reqLogSub })
    "></a>
                  </span>
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
        <commonPagination v-if="getEmailLogsDetails && getEmailLogsDetails.length" v-on:page-chg="getTableData"
          :tot-len="getEmailLogsDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
      </div>
    </div>
    <noData v-if="getEmailLogsDetails?.length == 0"></noData>
  </div>

  <mailViewDialogue v-if="isMailDial" :is-open="isMailDial" v-bind:show-data="bindData"
    v-on:mail-close="$store.commit('accessLog/setIsMailDial', false)" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState, mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/commonFunc";
import mailViewDialogue from "../mail/mailViewDialogue.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import commonPagination from "../../components/commonPagination.vue";

export default defineComponent({
  setup() {
    const header = ref([
      { name: "E-Mail", csvKey: "emailId" },
      { name: "RequestLog", csvKey: "reqLogSub" },
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
      rowsCount,
      page,
      pages,
      value,
      rowsPerPage,
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
        data.last == "" ? this.getEmailLogsDetails.length : data.last;
      if (this.getEmailLogsDetails && this.getEmailLogsDetails.length > 0) {
        this.showData = this.getEmailLogsDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
  },
  components: {
    noData,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    mailViewDialogue,
    commonPagination,
  },
  computed: {
    ...mapState("accessLog", ["isMailDial"]),
    ...mapGetters("accessLog", ["getEmailLogsDetails"]),
    ...mapGetters("accessLog", { loader: "getLoader" }),
  },
  mixins: [commonFunc],
  async created() {
    await this.$store.dispatch("accessLog/getEmailLogsData").finally(() => {
      var data = {
        from: this.firstIndex,
        last: this.rowsCount,
        count: this.rowsCount,
      };
      this.getTableData(data);
    });
  },
});
</script>
<style>
.maillogs table {
  border-collapse: collapse !important;
  margin: 0px !important;
}

.maillogs td,
.maillogs th {
  border: 0px solid grey !important;
  text-align: left !important;
  padding: 8px;
}

.maillogs th {
  background: white !important;
  color: black !important;
}

.maillogs a {
  color: rgb(59 130 246);
}
</style>
