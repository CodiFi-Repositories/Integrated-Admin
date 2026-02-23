<template>
  <div class="flex items-center mt-2">
    <tab-menu @activeTab="changeTab" />
    <div class="flex h-10 w-10 pt-3" >
      <CommonLoader v-if="loader" ></CommonLoader>
       </div>
  </div>
  <userStatus v-if="validTab == 0" />
  
     <activeUserDetails v-else />
      
 
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import userStatus from "./user-status.vue";
import activeUserDetails from "./active-user-details.vue";
import CommonLoader from "../../components/commonLoader.vue";
export default defineComponent({
  components: { userStatus, activeUserDetails, CommonLoader },
  setup() {
    const validTab = ref(0);
    return { validTab };
  },
  methods: {
    changeTab(data: any) {
      this.validTab =data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit('setActivePageTab', data)
      this.$store.commit('setQuries', {data: {tab:data}, action: 'change'})      
    },
  },
  computed:{
    ...mapGetters("dash",{ loader : "getLoader" }),

  },
  created() {
    this.$store.commit('setActivePageTab', this.$store.state.queries['dashboard'].query.tab)
    this.changeTab(this.$store.state.queries['dashboard'].query.tab);
  },
});
</script>
