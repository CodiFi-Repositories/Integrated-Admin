<template>
  <div class="mb-[10px]">
    <tab-menu @activeTab="changeTab" />
  </div>
  <div class="overflow-y-hidden overscroll-contain">
    <div v-if="validTab == 0">
      <positions_upload></positions_upload>
    </div>
    <div v-if="validTab == 1">
      <holdings_upload></holdings_upload>
    </div>
    <div v-if="validTab == 2">
      <add_new_scrip></add_new_scrip>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import holdings_upload from "./holdings_upload.vue";
import add_new_scrip from "../contracts/add_new_scrip.vue";
// import positions_upload from './positions_upload.vue';
import positions_upload from "./positions_upload.vue";
export default defineComponent({
  setup() {
    const validTab = ref();
    return { validTab };
  },
  components: {
    holdings_upload,
    add_new_scrip,
    positions_upload,
  },
  methods: {
    changeTab(data: any) {
      this.validTab=data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit('setActivePageTab', data)
    },
  },
  mounted() {
    this.changeTab(0);
  },
});
</script>
<style>
.svgColor {
  fill: rgb(0, 150, 255);
}
</style>
