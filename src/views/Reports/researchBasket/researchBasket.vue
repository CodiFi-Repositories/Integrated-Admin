<template>
  <div class="p-4 flex-1 min-h-0 flex flex-col">
    <div class="mb-4 shrink-0">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="researchBasketTab">
        <li class="mr-2" role="presentation" v-for="(b, id) in basketTabs" :key="id" @click="changeActive(id)">
          <button class="inline-block px-3 pb-2 rounded-t-lg" type="button" :class="activeBasketTab == id
            ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#005CB9] dark:border-[#005CB9]'
            : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
            ">
            {{ b.name }}
          </button>
        </li>
      </ul>
    </div>
    <consolidatedBasket v-if="activeBasketTab == 0" />
    <daywiseBasket v-if="activeBasketTab == 1" />
    <corporateAction v-if="activeBasketTab == 2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import consolidatedBasket from "./consolidatedBasket.vue";
import daywiseBasket from "./daywiseBasket.vue";
import corporateAction from "./corporateAction.vue";

export default defineComponent({
  name: "researchBasket",
  components: {
    consolidatedBasket,
    daywiseBasket,
    corporateAction,
  },
  setup() {
    const basketTabs = ref([
      { name: "Consolidated", id: 0 },
      { name: "Daywise", id: 1 },
      { name: "Corporate Action", id: 2 },
    ]);
    return { basketTabs };
  },
  computed: {
    ...mapState("reports", ["activeBasketTab"]),
  },
  methods: {
    changeActive(id: any) {
      this.$store.commit("reports/setBasketActiveTab", id);
    },
  },
});
</script>
