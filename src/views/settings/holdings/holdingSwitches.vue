<template>
  <section>
    <div class="pt-5 px-5 h-full">
      <div class="bg-white p-4 border rounded">
        <h1 class="pb-5">Holding Controls</h1>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <p class="text-[14px] min-w-[135px]">Holding Always On</p>
            <Switch
              @click="setIsUpdate()"
              v-model="isAlwaysOn"
              :class="isAlwaysOn ? 'bg-[#3B82F6]' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <!-- <span class="sr-only">Use setting</span> -->
              <span
                aria-hidden="true"
                :class="isAlwaysOn ? 'translate-x-6' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-[14px] min-w-[135px]">Holding Always Off</p>
            <Switch
              @click="setIsUpdate()"
              v-model="isAlwaysOff"
              :class="isAlwaysOff ? 'bg-[#3B82F6]' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <!-- <span class="sr-only">Use setting</span> -->
              <span
                aria-hidden="true"
                :class="isAlwaysOff ? 'translate-x-6' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-[14px] min-w-[135px]">Holding Check Timings</p>
            <Switch
              @click="setIsUpdate()"
              v-model="isCheckTimings"
              :class="isCheckTimings ? 'bg-[#3B82F6]' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <!-- <span class="sr-only">Use setting</span> -->
              <span
                aria-hidden="true"
                :class="isCheckTimings ? 'translate-x-6' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </div>
        </div>
        <div class="py-3">
          <button
            type="button"
            v-if="isUpdate"
            @click="updateHoldingSwitches()"
            class="inline-flex w-full justify-center rounded-md outline-none bg-blue-600 px-6 py-1 text-sm text-white shadow-sm sm:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Switch } from "@headlessui/vue";
import { mapGetters } from "vuex";

export default defineComponent({
  setup() {
    const isUpdate = ref(false);
    return {
      isUpdate,
    };
  },
  components: {
    Switch,
  },
  computed: {
    ...mapGetters("holdingControls", [
      "getIsAlwaysOn",
      "getIsAlwaysOff",
      "getIsCheckTimings",
    ]),
    isAlwaysOn: {
      get() {
        return this.getIsAlwaysOn;
      },
      set(val: any) {
        this.$store.commit("holdingControls/setIsAlwaysOn", val);
        if (val) {
          this.$store.commit("holdingControls/setIsAlwaysOff", !val);
          this.$store.commit("holdingControls/setIsCheckTimings", !val);
        } else {
          this.$store.commit("holdingControls/setIsAlwaysOff", !val);
        }
      },
    },
    isAlwaysOff: {
      get() {
        return this.getIsAlwaysOff;
      },
      set(val: any) {
        this.$store.commit("holdingControls/setIsAlwaysOff", val);
        if (val) {
          this.$store.commit("holdingControls/setIsAlwaysOn", !val);
          this.$store.commit("holdingControls/setIsCheckTimings", !val);
        } else {
          this.$store.commit("holdingControls/setIsAlwaysOn", !val);
        }
      },
    },
    isCheckTimings: {
      get() {
        return this.getIsCheckTimings;
      },
      set(val: any) {
        this.$store.commit("holdingControls/setIsCheckTimings", val);
        if (val) {
          this.$store.commit("holdingControls/setIsAlwaysOn", !val);
          this.$store.commit("holdingControls/setIsAlwaysOff", !val);
        } else {
          this.$store.commit("holdingControls/setIsAlwaysOn", !val);
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch("holdingControls/getHoldingControls");
  },
  methods: {
    setIsUpdate() {
      this.isUpdate = true;
    },
    updateHoldingSwitches() {
      this.$store.dispatch("holdingControls/updateholdingControls");
    },
  },
});
</script>
