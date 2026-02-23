<template>
    <div>
        <tab-menu @activeTab="changeTab" />
        <adminMsg v-if="validTab == 0" />
        <tradecall v-if="validTab == 1" />

    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import adminMsg from './admin-message.vue'
import tradecall from './TradeCalls.vue'
export default defineComponent({
    components: { adminMsg, tradecall },
    setup() {
        const validTab = ref()
        return { validTab }
    },
    methods: {
        changeTab(data: any) {
            this.validTab = data
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: data })
            this.$store.commit('setActivePageTab', data)

        }
    },
    created() {
        this.$store.commit('setActivePageTab', this.$store.state.queries['notify'].query.tab)
        this.changeTab(this.$store.state.queries['notify'].query.tab);
    },
},
)
</script>