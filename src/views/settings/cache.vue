<template>
    <div class="p-5 h-full">
        <div class="bg-white  border rounded">
            <div class="p-5">
                <div class="primaryColor font-bold ">Holdings</div>

                <div class="my-4 flex gap-3 items-end">
                    <div>
                        <p class="primaryColor pb-1 ml-2">User ID</p>
                        <input type="text" v-model="holdingsUserId" maxlength="10"
                            class="border max-w-[200px] h-10 rounded focus:outline-0 px-4">
                    </div>
                    <button type="button"
                        class="negativeBackground disabled:opacity-70 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded"
                        :disabled="!holdingsUserId" @click="reloadHoldings('reload')">Reload</button>
                    <button type="button"
                        class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                        @click="reloadHoldings('allreload')">Reload All</button>
                </div>
            </div>

            <div class="p-5">
                <div class="primaryColor font-bold ">Positions</div>

                <div class="my-4 flex gap-3 items-end">
                    <div>
                        <p class="primaryColor pb-1 ml-2">User ID</p>
                        <input type="text" v-model="positionUserId" maxlength="10"
                            class="border max-w-[200px] h-10 rounded focus:outline-0 px-4">
                    </div>
                    <button type="button"
                        class="negativeBackground disabled:opacity-70 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded"
                        :disabled="!positionUserId" @click="reloadPositions('reload')">Reload</button>
                    <button type="button"
                        class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                        @click="reloadPositions('allreload')">Reload All</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const holdingsUserId = ref('')
        const positionUserId = ref('')
        const CaptchaVal = ref('')
        const positionForm = ref(false)
        const holdingsForm = ref(false)
        const isFormValid = ref('')
        const changeValue = ref('')
        const isHoldings = ref('')

        return { holdingsUserId, positionUserId, CaptchaVal, positionForm, isFormValid, changeValue, holdingsForm, isHoldings }
    },
    methods: {
        reloadPositions(type: any) {
            this.CaptchaVal = this.getCapcha()
            this.positionForm = true
            this.isFormValid = ''
            this.changeValue = type
        },

        reloadHoldings(type: any) {
            this.holdingsForm = true
            this.CaptchaVal = this.getCapcha()
            this.isHoldings = ''
            this.changeValue = type
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

    },
})
</script>