<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        >
          <form @submit.prevent="handleSubmit()">
            <div>
              <div class="text-center">
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure want to
                    <span class="text-red-500">Delete</span> ?
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 flex gap-2">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="handleCancel()"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "deleteholiday",
  props: {
    holidays: {
      type: String,
    },
  },
  methods: {
    handleSubmit() {
      let json = {
        holidays: this.holidays,
      };
      this.$store.dispatch("settings/deleteHoliday", json).finally(() => {
        this.$store.commit("settings/setDeleteHolidayDialog", false);
      });
    },
    handleCancel() {
      this.$store.commit("settings/setDeleteHolidayDialog", false);
    },
  },
});
</script>
