<template>
  <div class="p-4 h-full">
    <div class="card p-4 border rounded bg-white shadow-sm">
      <div class="gap-4 flex">
        <div>
          <label class="primaryColor pb-1 text-sm ml-2">Date</label>
          <VDatePicker :max-date="today" v-model="fromDate" is-required :popover="popover" :masks="{
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
        <!-- <div>
          <label class="primaryColor pb-1 text-sm ml-2">To Date</label>
          <VDatePicker :max-date="today" :min-date="fromDate" v-model="toDate" is-required :popover="popover" :masks="{
            input: 'DD/MM/YYYY',
            modelValue: 'DD/MM/YYYY',
          }" mode="date" :disabled-dates="!fromDate">
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
        </div> -->
        <div class="flex gap-3 items-end">
          <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader" @click="getDetails()">
            <p v-if="!getLoader">Submit</p>
            <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
              xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </button>

          <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs" type="button"
            v-if="getSipDetails?.length" @click="downloadUnicodeCSV(getSipDetails, 'SIP Details', header)">
            Download
          </button>
        </div>
      </div>
    </div>

    <div class="pt-4 rounded">
      <div class="card p-5 border rounded bg-white shadow-sm" v-if="getSipDetails?.length">
        <div>
          <div class="border rounded mt-2 overflow-auto">
            <table class="w-full overflow-auto">
              <thead class="text-[13px]">
                <tr class="border-b">
                  <th v-for="head in header" class="truncate border-r">
                    {{ head.name }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="(i, id) in showData" :key="id" class="border-b">
                  <td class="truncate border-r text-center">
                    {{ }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["userId"] }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i.quantity ? i.quantity : "-" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i.frequency }}
                  </td>
                  <!-- <td class="truncate border-r text-center">{{ i.Mandate }}</td> -->
                  <td class="truncate border-r text-center">
                    {{ i["installments"] ? i["installments"] : "-" }}
                  </td>
                  <td class="truncate border-r text-center">
                    {{ i["orderNo"] != "0" ? i["orderNo"] : "-" }}
                  </td>
                  <!-- <td class="truncate border-r text-center">
                    {{ i["Ref No"] }}
                  </td> -->
                  <!-- <td class="truncate border-r text-center">
                    {{ i["Trans Mode"] }}
                  </td> -->
                  <!-- <td class="truncate border-r text-center">
                    {{ i["Scheme"] }}
                  </td> -->
                  <td class="text-center border-r text-xs">
                    {{ i["orderStatus"] }}
                  </td>
                  <td class="text-center text-xs">
                    {{ i["initiatedBy"] != "0" ? i["initiatedBy"] : "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <commonPagination v-if="getSipDetails && getSipDetails.length" v-on:page-chg="getTableData"
            :tot-len="getSipDetails.length" :page-date="rowsPerPage" :row-count="rowsCount" />
        </div>
      </div>
      <noData v-if="getSipDetails?.length == 0"> </noData>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import commonFunc from "../../mixins/commonFunc";
import noData from "../../components/no-data.vue";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
export default defineComponent({
  components: {
    noData,
    Icons,
    commonPagination,
  },
  mixins: [commonFunc],
  name: "sip",
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    const submitClicked = ref();
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const header = ref([
      { name: "Created On", csvKey: "orderTime" },
      { name: "Client Code", csvKey: "Client Code" },
      { name: "Installment", csvKey: "Installment" },
      { name: "Frequency", csvKey: "Frequency" },
      // { name: "Mandate", csvKey: "Mandate" },
      { name: "No Of Installment", csvKey: "No Of Installment" },
      { name: "Order No", csvKey: "Order No" },
      // { name: "Ref No", csvKey: "Ref No" },
      // { name: "Trans Mode", csvKey: "Trans Mode" },
      // { name: "Scheme", csvKey: "Scheme" },
      { name: "Status", csvKey: "orderStatus" },
      { name: "Placed By", csvKey: "Placed By" },
    ]);

    const disabledDates = ref([
      {
        repeat: {
          weekdays: [1, 7],
        },
      },
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

    return {
      header,
      fromDate,
      toDate,
      popover,
      disabledDates,
      maxDateToDate,
      today,
      submitClicked,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  methods: {
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.getSipDetails.length : data.last;
      if (this.getSipDetails && this.getSipDetails.length > 0) {
        this.showData = this.getSipDetails.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    getDetails() {
      if (this.fromDate ) {
        let json: Object = {
          createdOn: (window as any).formatDate(new Date(this.fromDate), 'D'),
          // toDate: this.toDate,
        };

        this.$store.dispatch("reports/getSipDetails", json).finally(() => {
          var data = {
            from: 0,
            last: this.rowsCount,
            count: this.rowsCount,
          };
          this.getTableData(data);
        });
        this.submitClicked = true;
      } else {
        this.$notify({
          group: "auth",
          type: "error",
          title: `Select a from Date and To date`,
        });
      }
    },
  },
  computed: {
    ...mapGetters("reports", ["getSipDetails", "getLoader"]),
    ...mapState("accessLog", ["FeedbackDetails", "downloadLoader"]),
  },
  unmounted() {
    this.$store.commit("reports/setSipDetails", []);
  },
});
</script>
