<template>
  <div>
    <div class="flex items-center">
      <tab-menu @activeTab="changeTab" />
      <div class="flex h-10 w-10 pt-3">
        <CommonLoader v-if="loader"></CommonLoader>
      </div>
    </div>

    <!-- <button
        @click="downloadCsv()"
        type="submit"
        class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
      >
        <p>Download</p>
      </button> -->
    <contractMaster v-if="validTab == 0" />
    <newSymbols @newSymbol_header="setHeader" v-if="validTab == 2" />
    <deactivatedSymbols @deactivated_header="setHeader" v-if="validTab == 3" />
    <duplicateSymbols @duplicate_header="setHeader" v-if="validTab == 4" />
    <addNewScrip v-if="validTab == 1" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunc";
import contractMaster from "./contract-master.vue";
import newSymbols from "./new-symbols.vue";
import deactivatedSymbols from "./deactivated-symbols.vue";
import duplicateSymbols from "./duplicate-symbols.vue";
import addNewScrip from "./add_new_scrip.vue";
import CommonLoader from "../../components/commonLoader.vue";
export default defineComponent({
  components: {
    contractMaster,
    newSymbols,
    deactivatedSymbols,
    duplicateSymbols,
    addNewScrip,
    CommonLoader,
  },
  setup() {
    const validTab = ref(0);
    const header = ref([]);
    const activeTabData = ref([]);

    return { validTab, header, activeTabData };
  },
  mixins: [commonFunc],
  methods: {
    downloadCsv() {
      this.downloadUnicodeCSV(this.activeTabData, this.validTab, this.header);
    },
    setHeader(val: any) {
      this.header = val.header;
      this.activeTabData = val.data;
    },
    changeTab(data: any) {
      this.validTab = data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit('setActivePageTab', data)
      this.$store.commit('setQuries', { data: { tab: data }, action: 'change' })
    },

  },
  computed: {
    ...mapGetters("cMaster", { loader: "getLoader" }),
  },
  created() {
    this.$store.commit('setActivePageTab', this.$store.state.queries['contracts'].query.tab)
    this.changeTab(this.$store.state.queries['contracts'].query.tab);
  },
});
</script>
