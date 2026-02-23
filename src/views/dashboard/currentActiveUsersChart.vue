<template>
    <!-- <div>{{ DEVICE_TYPE_CHARTDATA.length }}</div> -->
    <!-- <div v-if="DEVICE_TYPE_CHARTDATA?.length != []"> -->
    <div id="echartsContainer" ref="echartsContainer" style="width: 100%; height: 
        100%; " class="pt-2 pb-2 " autoresize :options="DEVICE_TYPE_CHARTDATA"
        v-if="DEVICE_TYPE_CHARTDATA?.length != []">
    </div>
    <noData v-else></noData>
</template>
<script>
import * as echarts from 'echarts';
import { mapGetters, mapState } from 'vuex';
import noData from "../../components/no-data.vue";
import { defineComponent } from "vue";
import commonFunc from "../../mixins/commonFunc";

export default defineComponent({
    components: {
        noData,
    },
    mixins: [commonFunc],
    computed: {
        ...mapGetters("dash", { DEVICE_TYPE_CHARTDATA: "getDeviceTypeChartData" }),
        // ...mapState("dash", ["loader"]),
        // ...mapGetters("dash", [getUserCountDetails])

    },
    data() {
        return {
        };
    },
    async mounted() {
        //await this.$store.dispatch('dash/getUserCountDetails');
        this.renderChart();
        this.$refs.echartsContainer.addEventListener('mousewheel', this.handleMousewheel, { passive: true });
    },
    watch: {

    },
    methods: {
        renderChart() {
            this.chart = echarts.init(this.$refs.echartsContainer);
            this.chart.setOption(this.DEVICE_TYPE_CHARTDATA);
        },
        handleMousewheel(event) {

        }
    },
    async created() {
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        this.$refs.echartsContainer.removeEventListener('mousewheel', this.handleMousewheel);
    },
});
</script>