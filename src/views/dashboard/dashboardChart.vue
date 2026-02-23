<template>
    <div id="echartsContainer" ref="echartsContainer"  class="pt-2 h-[400px] w-full flex relative " autoresize
      :options="USERLOGSCHARTDATA" > 
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { mapGetters } from 'vuex';
import noData from "../../components/no-data.vue";
import { defineComponent } from "vue";
import commonFunc from "../../mixins/commonFunc";

export default defineComponent({
  components: {
    noData,
  },
  mixins: [commonFunc],
  computed: {
    ...mapGetters("dash", { USERLOGSCHARTDATA: "GETUSERLOGSCHARTDATA" }),
  },
  data() {
    return {
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(this.$refs.echartsContainer);
      this.chart.setOption(this.USERLOGSCHARTDATA);
    },
  },
  created() {
    // this.$store.dispatch('dash/getVisitorsPerDay');
  },
});
</script>