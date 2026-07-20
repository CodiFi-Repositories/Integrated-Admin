<template>
  <div v-if="show" class="fixed inset-0 z-40">
    <div class="absolute inset-0 bg-black bg-opacity-30" @click="$emit('close')"></div>
    <div class="absolute right-0 top-0 h-full w-[320px] max-w-full bg-white shadow-lg flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b shrink-0">
        <p class="primaryColor text-sm font-semibold">Basket Name</p>
        <button type="button" class="secondary-color text-xl leading-none px-1 cursor-pointer"
          @click="$emit('close')">
          &times;
        </button>
      </div>

      <div class="p-4 shrink-0">
        <div class="flex items-center h-10 border rounded p-2">
          <input v-model="search" placeholder="Search..." class="w-full h-9 ml-1 text-xs outline-none" />
        </div>
      </div>

      <div class="flex-1 min-h-0 overflow-auto px-4">
        <label v-for="name in visibleNames" :key="name"
          class="flex items-center gap-3 py-2 text-sm primaryColor cursor-pointer">
          <input type="checkbox" :value="name" v-model="localSelected" class="w-4 h-4 cursor-pointer" />
          {{ name }}
        </label>
        <p v-if="!visibleNames.length" class="secondary-color text-sm py-2">
          No baskets found
        </p>
      </div>

      <div class="flex gap-3 p-4 border-t shrink-0">
        <button type="button" class="border primaryColor h-10 w-full cursor-pointer rounded text-xs"
          @click="reset()">
          Reset
        </button>
        <button type="button" class="negativeBackground text-white h-10 w-full cursor-pointer rounded text-xs"
          @click="submit()">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";

export default defineComponent({
  name: "basketFilterPanel",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    basketNames: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    selected: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["close", "apply"],
  setup() {
    const search = ref("");
    const localSelected = ref<string[]>([]);
    return {
      search,
      localSelected,
    };
  },
  computed: {
    visibleNames(): string[] {
      if (!this.search.trim()) {
        return this.basketNames;
      }
      const query = this.search.trim().toLowerCase();
      return this.basketNames.filter((name: string) =>
        name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    reset() {
      this.localSelected = [];
      this.$emit("apply", []);
    },
    submit() {
      this.$emit("apply", [...this.localSelected]);
      this.$emit("close");
    },
  },
  watch: {
    show(val: boolean) {
      if (val) {
        this.localSelected = [...this.selected];
        this.search = "";
      }
    },
  },
});
</script>
