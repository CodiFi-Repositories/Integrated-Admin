<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-base font-medium text-gray-900 ml-2 ">
                                Preview : 
                            </DialogTitle>
                            <div class="mt-2">
                                <textarea rows="5" v-model="previewData" class="text-sm text-gray-500 w-full p-3 font-semibold border  rounded-lg">
                                </textarea>
                            </div>
                            <div class="mt-4 flex justify-end">
                                <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-[#FCC6C9] px-4 py-2 text-sm font-medium text-[#005CB9]" @click="submitCall">
                                    <span v-if="!loader">Send</span>
                                    <btnLoader v-else/>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useStore } from 'vuex';
const store = useStore()
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    createParam: {
        type: Object,
        required: true
    },
    isModify: {
        type: Boolean,
        required:true
    }
})

const isOpen = computed(() => store.getters["tradecall/getIsPreview"])
const loader = computed(() => store.getters["tradecall/getApiLoader"])
const previewData = computed({
    get: () => store.getters["tradecall/getPreviewData"],
    set: (value) => {
        store.commit("tradecall/setPreviewData", value)
    }
})

const emit = defineEmits(["cancel"])
const closeModal = async() => {
    store.commit("tradecall/setIsPreview", false)
}

const submitCall = async () => {
    if (props.isModify) {
        let currentEditData = JSON.parse(localStorage.getItem("researchcallEditData")!);
        let json: any = {}
        json.shortDescription = previewData.value
        json.status = props.createParam.status
        json.researchcallId = currentEditData.researchCallId
        json.scrips = props.createParam.scrips
        await store.dispatch("tradecall/tradeCallModify", json)

    } else {
        let json: any = props.createParam
        json.shortDescription = previewData.value
        json.longDescription = previewData.value
        await store.dispatch("tradecall/tradeCallCreate", json)
    }
    store.commit("tradecall/setbasketdetails", [])
    emit('cancel')
    closeModal()
    router.push("/research")
}

</script>