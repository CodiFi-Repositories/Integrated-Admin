<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click.self="$emit('close')">
    <div class="bg-white rounded shadow-lg w-[700px] max-h-[80vh] flex flex-col">
      <div class="flex items-center justify-between px-5 py-3 border-b">
        <span class="font-semibold text-sm">SIP Order Details</span>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
      </div>

      <div class="flex border-b px-5">
        <button v-for="tab in ['Executed', 'Upcoming']" :key="tab"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div class="p-4">
        <div v-if="loading" class="flex justify-center items-center h-24">
          <svg class="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
        <template v-else>
          <div v-if="currentTabData.length" class="border rounded overflow-hidden">
            <div class="overflow-y-auto max-h-[185px]">
              <table class="w-full text-xs table-fixed">
                <thead class="sticky top-0 bg-gray-50 z-10">
                  <tr class="border-b">
                    <th class="w-1/5 px-3 py-2 text-left border-r">Qty</th>
                     <th class="w-1/5 px-3 py-2 text-left border-r">Symbol</th>
                    <th class="w-1/5 px-3 py-2 text-left border-r">Date</th>
                    <th class="w-1/5 px-3 py-2 text-left border-r">Status</th>
                    <th class="w-1/5 px-3 py-2 text-left border-r">Amount</th>
                    <th class="w-1/5 px-3 py-2 text-left">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in currentTabData" :key="idx" class="border-b">
                    <td class="w-1/5 px-3 py-2 border-r text-left">{{ row.qty || "" }}</td>
                    <td class="w-1/5 px-3 py-2 border-r text-left whitespace-nowrap">{{ row.symbol || "" }}</td>
                    <td class="w-1/5 px-3 py-2 border-r text-left">{{ row.date ? new Date(row.date).toLocaleDateString("en-GB") : "" }}</td>
                    <td class="w-1/5 px-3 py-2 border-r text-left">{{ row.status || "" }}</td>
                    <td class="w-1/5 px-3 py-2 border-r text-left">{{ row.price ? row.price : '' }}</td>
                    <td class="w-1/5 px-3 py-2 text-left ellipsis"
                      v-tippy="{ content: `${row?.message && row?.message != '-' ? row?.message : ''}` }">{{ row.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="text-center text-gray-400 py-8 text-sm">No records found</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "sipOrderDialog",
  props: {
    show: { type: Boolean, required: true },
    loading: { type: Boolean, default: false },
    executed: { type: Array, default: () => [] },
    upcoming: { type: Array, default: () => [] },
  },
  emits: ["close"],
  setup(props) {
    const activeTab = ref("Executed");

    watch(() => props.show, (val) => {
      if (val) activeTab.value = "Executed";
    });

    return { activeTab };
  },
  computed: {
    currentTabData(): any[] {
      if (this.activeTab === "Executed") return this.executed as any[];
      return this.upcoming as any[];
    },
  },
});
</script>
