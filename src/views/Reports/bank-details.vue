<template>
  <div>
    <div class="p-4 h-full">
      <div class="card p-4 border rounded bg-white shadow-sm">
        <form @submit.prevent="submitData()" class="flex gap-4">
          <div>
            <p class="primaryColor pb pl-2">User ID</p>
            <input type="text" v-model="userId" maxlength="10"
              class="border min-w-[200px] h-10 rounded focus:outline-0 px-4" />
            <div class="h-4 ml-2 mt-2 text-red-500 text-xs">
              <span v-if="submitted && userId == ''">User ID is required</span>
            </div>
          </div>
          <div class="flex gap-2 items-center h-22">
            <div class="flex items-center">
              <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                :disabled="getLoader" @click="submitData()">
                <p v-if="!getLoader">Submit</p>
                <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                  xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </button>
            </div>
            <div v-if="getUserBankDetails?.length != 0" class="flex items-center">
              <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                :disabled="getLoader" @click="downloadCsv()" type="button">
                <p>Download</p>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- table -->
      <div class="pt-4 h-full">
        <div class="card p-5 border rounded bg-white shadow-sm" v-if="getUserBankDetails?.length > 0">
          <div class="border-top" id="tableData">
            <table class="w-full rounded-lg text-sm">
              <thead>
                <tr class="tableRow border-2 border-y-lightgray border-y-lightgray bg-white">
                  <th v-for="head in header" class="text-center border-r text-uppercase tableHeader blue lighten-5">
                    {{ head.name }}
                  </th>
                </tr>
              </thead>

              <tbody class="border-2 bg-white border-r border-y-stone-300">
                <tr v-for="(i, id) in showData" :key="id" class="tableRow border-y-indigo-500 border-r text-center">
                  <td class="text-center border-r">{{ id + 1 }}</td>
                  <td class="tableContent border-r text-center">
                    {{ i.clientname ? i.clientname : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.accNo ? i.accNo : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.bankName ? i.bankName : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.ifscode ? i.ifscode : 0 }}
                  </td>
                  <td class="tableContent border-r bor text-center">
                    {{ i.defaultAccBank ? "Primary" : "Secondary" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <commonPagination v-if="getUserBankDetails && getUserBankDetails.length" v-on:page-chg="getTableData"
            :tot-len="getUserBankDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
          <!-- table end -->
        </div>
        <noData v-else> </noData>
      </div>
      <!-- Coming soon -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/commonFunc";
import commonPagination from "../../components/commonPagination.vue";
export default defineComponent({
  components: {
    noData,
    commonPagination,
  },
  setup() {
    const userId = ref("");
    const submitted = ref(false);
    const header = ref([
      { name: "S.NO", csvKey: "sno" },
      { name: "Client Name", csvKey: "clientname" },
      { name: "A/c No", csvKey: "accNo" },
      { name: "Bank Name", csvKey: "bankName" },
      { name: "IFSC Code", csvKey: "ifscode" },
      { name: "Default", csvKey: "defaultAccBank" },
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
    return { userId, submitted, header, rowsCount, showData, rowsPerPage };
  },
  mixins: [commonFunc],
  methods: {
    downloadCsv() {
      this.downloadUnicodeCSV(
        this.getUserBankDetails,
        "Bank Details",
        this.header
      );
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex =
        data.last == "" ? this.getUserBankDetails.length : data.last;
      if (this.getUserBankDetails && this.getUserBankDetails.length > 0) {
        this.showData = this.getUserBankDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    getBankData() { },
    submitData() {
      if (!!this.userId) {
        this.submitted = false;
        this.$store
          .dispatch("reports/getUserBankDetails", this.userId)
          .finally(() => {
            var data = {
              from: 0,
              last: this.rowsCount,
              count: this.rowsCount,
            };
            this.getTableData(data);
          });
      } else {
        this.submitted = true;
      }
    },
    getUserDetailsApi() {
      this.submitted = true;
    },
  },
  computed: {
    ...mapGetters("reports", ["getUserBankDetails", "getLoader"]),
  },
  unmounted() {
    this.$store.commit("reports/setUserBankDetails", "");
  },
});
</script>
