<template>
  <div>
    <tab-menu @activeTab="changeTab" />
    <version v-if="validTab == 0" />
    <cache v-if="validTab == 1" />
    <product v-if="validTab == 2" />
    <!-- <tradingSession v-if="validTab == 3" /> -->
    <holdingControls v-if="validTab == 3"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import version from "./version.vue";
import cache from "./cache.vue";
import product from "./product.vue";
import tradingSession from "./tradingSession.vue";
import holdingControls from "./holdings/holdingControls.vue";
export default defineComponent({
  components: { version, cache, product, tradingSession, holdingControls },
  setup() {
    const validTab = ref(0);
    return { validTab };
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
  // mounted() {
  //   this.changeTab({ name: "Version", id: "0" });
  // },
  created() {
    this.$store.commit(
      "setActivePageTab",
      this.$store.state.queries["settings"].query.tab
    );
    this.changeTab(this.$store.state.queries["settings"].query.tab);

    if (this.$route.query && this.$route.query.key == "holiday") {
      this.validTab = 3;
      this.$store.commit("setActivePageTab", 3);
      this.changeTab(3);
    }
  },
});
</script>
