<template>
  <div>
    <Header />
    <div>
      <div class="flex flex-col lg:flex-row bg-[#f7f5f5]" style="height: calc(100vh - 56px)">
        <div
          class="border-r border-[#E0E0E0] w-[80px] cScrollbar hidden lg:block lg:h-[calc(100vh-56px)] h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden">

          <sidebar />
        </div>
        <div class="w-full lg:h-[calc(100vh-56px)] h-[calc(100vh-56px)] overflow-y-auto">
          <router-view />
          <confimDialog v-if="logoutCondition"></confimDialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/header.vue";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import commonIcon from "../components/commonicon.vue";
import confimDialog from "../components/confimDialog.vue";
import { mapState } from "vuex";
import sidebar from "../views/sidebar.vue"

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["logoutCondition"]),
  },

  components: {
    Header,
    CheckCircleIcon,
    commonIcon,
    confimDialog,
    sidebar,
  },
};
</script>
