<template>
    <div class="p-4 h-full">
        <!-- <div class="card p-4">
            <form @submit.prevent="getEdisData()" class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
                <div>
                    <p class="primaryColor pb-1">Date</p>
                    <input type="date" v-model="date" :min="date" :max="new Date().toISOString().split('T')[0]" class="border w-full h-10 rounded focus:outline-0 px-4">
                </div>
                <div class="flex items-end">
                    <button type="submit" class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs" >
                        <p>Submit</p>
                    </button>
                </div>
            </form>
        </div> -->
        Coming soon
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const date = ref('')
        return { date }
    },
    methods: {
        getEdisData() { }
    },
})
</script>