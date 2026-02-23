<template>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-4">
                <div class=" ">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="text-lg font-semibold leading-6 text-gray-900">
                      Are you sure want to send Push Notification
                    </div>
                    <div class="mt-2 ">
                      <div class=" text-start text-base text-gray-500">
                        Please type <span style="font-weight: bold; color: black;">{{ CaptchaVal }}</span> to confirm ?
                      </div>
                    </div>
                    <div class="flex items-center pt-4">
                      <input
                        class=" appearance-none bg-transparent border border-black caret-blue-500 w-full text-gray-700 mr-3 py-2 px-4 rounded leading-tight focus:outline-none"
                        v-model="validate" @input="validateCaptcha()" type="text" placeholder="Enter Captcha"
                        aria-label="Full name" />

                    </div>
                    <div>
                      <div class="h-[15px] pl-[15px]">
                        <p :class="errorColor">
                          {{ error_message }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit"
                    class="inline-flex w-full justify-center disabled:bg-gray-300 disabled:text-white rounded-md negativeBackground px-6 py-3 text-sm font-semibold text-white shadow-sm hover:negativeBackground sm:ml-3 sm:w-auto"
                    @click="resetCache()" :disabled="!confirmCaptcha">
                    Confirm
                  </button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref="cancelButtonRef" @click="
    $store.commit('notify/setresetdialogue', false);
  open = false;
  ">
                    Cancel
                  </button>
                </div>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default defineComponent({
  name: "push_confirmation",
  setup() {
    const open = ref(true);
    const confirmCaptcha = ref(false);
    const CaptchaVal = ref('');
    const validate = ref('');
    const error_message = ref('');
    const hiddenValue = ref(true);
    const errorColor = ref('');
    return {
      open, CaptchaVal, validate, error_message, hiddenValue, errorColor, confirmCaptcha
    };
  },
  methods: {
    displayCaptcha() {
      this.CaptchaVal = this.getCapcha();
    },
    validateCaptcha() {

      this.hiddenValue = false;
      if (this.validate == this.CaptchaVal) {
        this.errorColor = "text-green-500";
        this.error_message = '';
        this.confirmCaptcha = true;

      } else {
        this.errorColor = "text-red-500";
        this.error_message = "Captcha is not valid";
        this.confirmCaptcha = false;
      }

    },

    resetCache() {
      // this.$store.dispatch("cMaster/resetCache",'true');
      // this.CaptchaVal = this.getCapcha();

      this.$emit('parentTrigger', '');
      this.$store.commit('notify/setresetdialogue', false);
      this.open = false;

    },
    getCapcha() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    //   openSettings() {
    //     let json = {
    //       value: this.confirmationdialogue == "off" ? 0 : 1,
    //     };
    //     this.$store.dispatch("settings/updateSettingsAction", json);
    //     this.$store.commit("settings/setconfirmationdialogue", "");
    //   },
  },
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  computed: {
    ...mapState("notify", ["setresetdialogue"]),

  },
  mounted() {
    this.displayCaptcha();
  }
});
</script>
<!-- ;$store.commit('settings/setconfirmationdialogue', '') -->