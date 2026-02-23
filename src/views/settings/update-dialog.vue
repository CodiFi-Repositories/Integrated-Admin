<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <form @submit.prevent="handleSubmit()">
                        <div>
                            <div class="text-center ">
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Are you sure want to <span class="text-green-500">Update</span> ?</p>
                                </div>
                                <div class="my-3 text-gray-500">
                                    Please type <span class="select-none font-semibold text-gray-900">{{ captcha }}</span> to confirm ?
                                </div>
                                <input type="text" placeholder="Enter captcha" class="h-8 bg-slate-100 rounded w-full px-4 focus:outline-none" :class="{ 'border border-green-600' : userInput == captcha}" v-model="userInput">
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 flex gap-2">
                            <button type="button" class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="handleCancel()">Cancel</button>
                            <button :disabled="userInput != captcha" :class="{ 'opacity-40' : userInput != captcha}" type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const versionID = ref('')
        const os = ref('Android')
        const deviceType = ref('MOB')
        const captcha = ref("")
        const userInput = ref()
        return { versionID, os, deviceType, captcha, userInput}
    },
    props: ['cData'],
    methods: {
        handleCancel() {
            this.$store.commit('version/setIsUpdateVersionDialog', false)
        },
        async handleSubmit() {
            let json = {
                "version": this.cData?.version,
                "updateAvailable": this.cData?.updateAvailable == 1 ? 0 : 1
            }
            await this.$store.dispatch('version/updateMobileVersion', json)
            this.handleCancel();
        },
        generateCaptcha() {
          let captcha = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          this.captcha = captcha;
        },
    },
    mounted() {
        this.generateCaptcha();
    },
})
</script>
