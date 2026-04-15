<template>
  <div class="flex gap-3 items-center">
    <tab-menu @activeTab="changeTab" />
    <figure>
      <CommonLoader v-if="getLoader" />
    </figure>
  </div>

  <adminWatch v-if="validTab == 0" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import adminWatch from "./adminWatchlist.vue";
import { mapGetters } from "vuex";
import CommonLoader from "../../components/commonLoader.vue";
export default defineComponent({
  methods: {
    changeTab(_: any) {},
  },
  computed: {
    ...mapGetters("content", ["getLoader"]),
  },
  components: {
    adminWatch,
    CommonLoader,
  },
  setup() {
    const validTab = ref(0);
    return {
      validTab,
    };
  },
});
</script>
