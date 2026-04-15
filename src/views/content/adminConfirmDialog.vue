<template>
  <TransitionRoot as="template" :show="isAdminDeleteDialog">
    <Dialog as="div" class="relative z-10" @close="closeDialog()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-medium leading-6 text-gray-900"
                      >Are you sure you want to delete?
                    </DialogTitle>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  @click="confirm()"
                  class="inline-flex w-full justify-center rounded-md outline-none bg-blue-600 px-6 py-3 text-sm text-white shadow-sm sm:ml-3 sm:w-auto"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  ref="cancelButtonRef"
                  @click="closeDialog()"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { mapState } from "vuex";
export default {
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },

  computed: {
    ...mapState("content", ["isAdminDeleteDialog", "adminWatchlist"]),
  },
  props: {
    selectedCheckbox: {
      type: Array as any,
    },
    currentScrip: {
      type: Object as any,
    },
    isMultiDelete: {
      type: Boolean,
    },
    activeTab: {
      type: Number as any,
    },
  },
  emits: ["resetValues"],
  methods: {
    closeDialog() {
      this.$store.commit("content/setIsAdminDeleteDialog", false);
      this.resetCheckbox();
    },
    async resetCheckbox() {
      this.$emit("resetValues", "");
    },
    confirm() { 
      let scripsIds: any = [];
      if (this.isMultiDelete) {
        this.selectedCheckbox.forEach((el: any) => {
          let json = {
            token: el.token,
            exchange: el.exchange,
          }
          scripsIds.push(json);
        });
      } else {
        scripsIds = [{
            token: this.currentScrip.token,
            exchange: this.currentScrip.exchange,
          } ];
      }

      let json = {
        mwId: this.adminWatchlist[this.activeTab]?.mwId,
        mwName: this.adminWatchlist[this.activeTab]?.mwName,
        "predefined": "true",
        "isDefault": "false",
        scrips: scripsIds,
      };

      this.$store.dispatch("content/deleteScrips", json);

      this.closeDialog();
    },
  },
};
</script>
