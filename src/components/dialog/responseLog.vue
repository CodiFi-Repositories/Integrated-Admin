<template>
  <div>
    <TransitionRoot appear :show="getIsAccessLog" as="template">
      <Dialog as="div" class="relative z-10" @close="closeDialog()">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center  sm:p-0">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white  dark:bg-[#18181b] dark:text-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[650px] sm:p-6">

                <div class="mt-3 text-center sm:mt-0   sm:text-left">

                  <DialogTitle as="h3" class="text-base pb-2 font-medium leading-6 primaryColor ">
                    <div>
                      <div class="grid grid-cols-2">
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">User ID :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.user_id || getAccessRow?.userId }}
                          </div>
                        </div>
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">In_time :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.in_time || getAccessRow?.in_time }}
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="flex flex-wrap pb-4">
                          <div class="text-xs text-gray-500 mr-2">URL :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.uri || (getAccessRow?.url ?
                              (getAccessRow?.url).replace('https://Integrateduatrestapi.odinwave.com/', '') : getAccessRow?.url)
                            }}
                          </div>
                        </div>
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">Out_time :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.out_time }}
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">Method :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.method }}
                          </div>
                        </div>
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">elapsed_time :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.elapsed_time !== null ? getAccessRow?.elapsed_time : 'NA' }} </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">Module :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.module }}
                          </div>
                        </div>
                        <div class="flex pb-4">
                          <div class="text-xs text-gray-500 mr-2">device Ip :</div>
                          <div class="text-xs text-gray-900">
                            {{ getAccessRow?.deviceIp }}
                          </div>
                        </div>
                      </div>

                      <div class="flex pb-4 border-b">
                        <div class="text-xs text-gray-500 mr-2">Date :</div>
                        <div class="text-xs text-gray-900">
                          {{
                            getAccessRow?.created_on || getAccessRow?.createdOn
                          }}
                        </div>
                      </div>
                    </div>
                  </DialogTitle>
                </div>
                <div class="overflow-y-auto max-h-[300px] h-[300px] scrollModifty  ">
                  <div class="flex justify-between items-center mt-4 text-xs">
                    <p>Request Body:</p>
                    <button class="border px-4 h-8 rounded text-xs mr-2" @click="copyRequestBody()">
                      {{ copyText ? "Copy" : "Copied" }}
                    </button>
                  </div>
                  <JsonViewer class="!text-xs" :value="getValue('req')" />

                  <div class="flex justify-between items-center mt-6 text-xs">
                    <p>Response Body:</p>
                    <button class="border px-4 h-8 rounded text-xs  mr-2" @click="copyResponseBody()">
                      {{ copyTextRes ? "Copy" : "Copied" }}
                    </button>
                  </div>
                  <JsonViewer class="!text-xs" :value="getValue('res')" />
                </div>
                <div class="mt-5 sm:mt-4 flex justify-end gap-2 mr-2">
                  <button type="button" class="cancelBtn" id="depth_dialog_close_btn"
                    @click="closeDialog()">Close</button>
                </div>
              </DialogPanel>
            </TransitionChild>


          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
export default {
  data() {
    return {
      formateJSON: false,
      copyText: true,
      copyTextRes: true,
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("accessLog/setIsAccessLog", {
        isOpen: false,
        data: this.getAccessRow,
      });
    },
    copyRequestBody() {
      this.copyText = false;
      if (this.getAccessRow.req_body?.length > 0) {
        navigator.clipboard.writeText(this.getAccessRow.req_body);
      } else {
        navigator.clipboard.writeText(this.getAccessRow.reqBody);
      }
      var textarea = document.getElementById("jsonData");
      var ok = document.execCommand("copy");
      setInterval(() => {
        this.copyText = true; // Hide the text after 2 seconds
      }, 2000);
    },
    copyResponseBody() {
      this.copyTextRes = false;
      if (this.getAccessRow.res_body?.length > 0) {
        navigator.clipboard.writeText(this.getAccessRow.res_body);
      } else {
        navigator.clipboard.writeText(this.getAccessRow.resBody);
      }
      var textarea = document.getElementById("jsonDataRes");
      var ok = document.execCommand("copy");
      setInterval(() => {
        this.copyTextRes = true; // Hide the text after 2 seconds
      }, 2000);
    },

    getValue(type) {
      if (type == "req") {
        return this.getAccessLogType
          ? this.isJsonString(this.getAccessRow?.req_body)
          : this.isJsonString(this.getAccessRow?.reqBody);
      } else {
        return this.getAccessLogType
          ? this.isJsonString(this.getAccessRow?.res_body)
          : this.isJsonString(this.getAccessRow?.resBody);
      }
    },

    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return str;
      }
      return JSON.parse(str);
    },
  },
  computed: {
    ...mapGetters("accessLog", [
      "getIsAccessLog",
      "getLogDeatails",
      "getAccessRow",
      "getAccessLogType",
    ]),
  },

  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    JsonViewer,
  },
};
</script>
