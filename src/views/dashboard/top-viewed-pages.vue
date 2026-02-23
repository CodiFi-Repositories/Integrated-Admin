<template>
  <table   class="bg-white rounded w-full ">
    <thead class="border-b border-[#ededed]">
      <tr>
        <th class="text-xs text-left py-1 secondaryColor font-normal">URL</th>
        <th class="text-xs text-right py-1 secondaryColor font-normal">
          Count
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(i, id) in getTopViewedPagess"
        :key="id"
        class="border-b border-[#ededed] even:bg-gray-50 hover:bg-gray-50"
      >
        <td class="primaryColor text-sm py-2 text-left">{{ i.url }}</td>
        <td class="primaryColor text-sm py-2 text-right">{{ i.count }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  setup() {
    const userId = ref("");
    return { userId };
  },
  //   data() {
  //     this.$store.dispatch("dash/getTopViewedPages");
  //   },
  methods: {
    getWatchlistData() {},
  },
  computed: {
    ...mapGetters("dash", ["getTopViewedPagess"]),
    ...mapGetters("dash", { topViewsLoader : "getTopviewsLoader" }),
  },
  created() {
   
  },
});
</script>
