<template>
  <div>
    <tab-menu @activeTab="changeTab" />
    <!-- <holdings v-if="validTab == 'Holdings'" />
    <positions v-if="validTab == 'Positions'" /> -->
    <!-- <payoutReport v-if="validTab == 0" /> -->
    <!-- <edis v-if="validTab == 1" /> -->
    <marketWatch v-if="validTab == 0" />
    <!-- <bankDetails v-if="validTab == 1" /> -->
    <!-- <Feedback v-if="validTab == 2" /> -->
    <!-- <Sip v-if="validTab == 1" /> -->
    <!-- <loanDetails v-if="validTab == 5" /> -->
    <orderCount v-if="validTab == 2" />
     <SipDashboard v-if="validTab == 1" />
    <!-- <fileUploadDetails v-if="validTab == 4" />
    <positionAvg v-if="validTab == 5" />
    <paymentLogs v-if="validTab == 6" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import payoutReport from "./payout.vue";
import holdings from "./holdings.vue";
import positions from "./positions.vue";
import edis from "./edis.vue";
import marketWatch from "./market-watch.vue";
import bankDetails from "./bank-details.vue";
import Feedback from "../Reports/feedback.vue";
import Sip from "./sip.vue";
import loanDetails from "./loan-details/loan-details.vue";
import orderCount from "./orderCount.vue";
import fileUploadDetails from "./fileUploadDetails.vue";
import positionAvg from "./positionAvg.vue";
import paymentLogs from "./paymentLogs.vue";
import SipDashboard from "./sipLogs.vue";

export default defineComponent({
  setup() {
    const validTab = ref(0);
    return { validTab };
  },
  components: {
    payoutReport,
    holdings,
    positions,
    edis,
    marketWatch,
    bankDetails,
    Feedback,
    Sip,
    loanDetails,
    orderCount,
    fileUploadDetails,
    positionAvg,
    paymentLogs,
    SipDashboard
  },
  methods: {
    changeTab(data: any) {
      this.validTab = data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit("setActivePageTab", data);
      this.$store.commit("setQuries", {
        data: { tab: data },
        action: "change",
      });
    },
  },
  created() {
    this.$store.commit(
      "setActivePageTab",
      this.$store.state.queries["report"].query.tab
    );
    this.changeTab(this.$store.state.queries["report"].query.tab);
  },
});
</script>
