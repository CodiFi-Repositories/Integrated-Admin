<template>
  <div>
    <div class="flex gap-4 justify-between items-end pl-4 pr-8">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center mx-4 mt-4" id="loanTabs">
        <li class="mr-2" role="presentation" v-for="(b, id) in loanTabs" :key="id" @click="changeActive(id)">
          <button class="inline-block px-3 pb-2 rounded-t-lg text-xs" type="button" :class="id == validTab
          ? 'border-b-2 text-[#005CB9] border-[#005CB9]'
          : 'text-[#4b5563] hover:text-[#005CB9] border-gray-100'
          ">
            {{ b.name }}
          </button>
        </li>
      </ul>
      <!-- <button
        type="button"
        v-if="getCurrentLoanData.length"
        class="negativeBackground text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
        @click="downloadCsv()"
      >
        Download
      </button> -->
      <!-- <a v-if="getCurrentLoanData.length" class="cursor-pointer text-xs underline text-blue-500"
        @click="downloadCsv()">Download</a> -->
    </div>
    <housingLoan @housing_header="setHeader" v-if="validTab == 0" />
    <propertyLoan @property_header="setHeader" v-else-if="validTab == 1" />
    <enterpriseLoan @enterprise_header="setHeader" v-else-if="validTab == 2" />
    <securityLoan @security_header="setHeader" v-else-if="validTab == 3" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import housingLoan from "./housing-loan.vue";
import propertyLoan from "./property-loan.vue";
import enterpriseLoan from "./enterprise-loan.vue";
import securityLoan from "./security-loan.vue";
import commonFunc from "../../../mixins/commonFunc";
export default defineComponent({
  mixins: [commonFunc],
  components: { housingLoan, propertyLoan, enterpriseLoan, securityLoan },
  name: "loan-details",
  setup() {
    const validTab = ref(0);
    const loanTabs = [
      { name: "Housing", id: 0, active: true },
      { name: "Property", id: 1, active: false },
      { name: "Medium Enterprises", id: 2, active: false },
      { name: "Securities", id: 3, active: false },
    ];
    const header = ref([]);
    return { validTab, loanTabs, header };
  },
  methods: {
    setHeader(data: any) {
      this.header = data;
    },
    // downloadCsv() {
    //   if (this.validTab == 0) {
    //     this.downloadUnicodeCSV(
    //       this.getCurrentLoanData,
    //       "Housing",
    //       this.header
    //     );
    //   } else if (this.validTab == 1) {
    //     this.downloadUnicodeCSV(
    //       this.getCurrentLoanData,
    //       "Property",
    //       this.header
    //     );
    //   } else if (this.validTab == 2) {
    //     this.downloadUnicodeCSV(
    //       this.getCurrentLoanData,
    //       "Medium Enterprises",
    //       this.header
    //     );
    //   } else if (this.validTab == 3) {
    //     this.downloadUnicodeCSV(
    //       this.getCurrentLoanData,
    //       "Securities",
    //       this.header
    //     );
    //   }
    // },
    changeActive(data: any) {
      this.validTab = data;
      this.$store.commit("setQuries", {
        data: { sTab1: data },
        action: "change",
      });
      this.validTab = data;
      // this.loanTabs.forEach((el: any) => {
      //   el.active = data.id === el.id;
      // });
    },
  },
  computed: {
    ...mapGetters("reports", ["getCurrentLoanData"]),
  },
  created() {
    this.validTab = this.$store.state.queries["report"].query.sTab1;
  },
});
</script>
