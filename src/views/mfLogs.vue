<template>
    <div class="p-4 h-full">
        <div class="card p-5 border rounded bg-white shadow-sm">
            <div class="mb-4 gap-2 flex flex-wrap w-full">
                <div class="gap-2 flex flex-wrap w-[50%]">
                    <div>
                        <label class="primaryColor pb-1 text-sm ml-2">From Date *</label>
                        <VDatePicker type="date" :max-date="new Date().toISOString().slice(0, 10)"
                            :min-date="getMinDate()" v-model="fromDate" is-required :popover="popover" :masks="{
                            input: 'DD-MM-YYYY',
                            modelValue: 'DD-MM-YYYY',
                        }" mode="date" is24hr :dateFormat="'DD-MM-YYYY'">
                            <template v-slot="{ togglePopover, inputValue, inputEvents }">
                                <div
                                    class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                                    <input :value="inputValue" placeholder="DD-MM-YYYY" v-on="inputEvents"
                                        class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                                    <button type="button"
                                        class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                                        @click="() => togglePopover()">
                                        <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                                    </button>
                                </div>
                            </template>
                        </VDatePicker>
                    </div>
                    <div>
                        <label class="primaryColor pb-1 text-sm ml-2">To Date *</label>
                        <VDatePicker type="datetime-local" :max-date="today" :min-date="fromDate" v-model="toDate"
                            is-required :popover="popover" :masks="{
                            input: 'DD-MM-YYYY',
                            modelValue: 'DD-MM-YYYY',
                        }" mode="date" :dateFormat="'DD-MM-YYYY'">
                            <template v-slot="{ togglePopover, inputValue, inputEvents }">
                                <div
                                    class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1">
                                    <input :value="inputValue" placeholder="DD-MM-YYYY" v-on="inputEvents"
                                        class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                                    <button type="button"
                                        class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                                        @click="() => togglePopover()">
                                        <Icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                                    </button>
                                </div>
                            </template>
                        </VDatePicker>
                    </div>
                    <div class="flex justify-end pt-6 gap-2">
                        <div class="min-w-[120px] h-10">
                            <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                                :disabled="ipo_Loader" @click="getReports({
                            'from': 0,
                            'last': rowsCount,
                            'count': rowsCount
                        })">
                                <p v-if="!ipo_Loader">Submit</p>
                                <svg v-if="ipo_Loader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                                    xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4">
                                    </circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex items-end justify-end flex-wrap w-[45%]" v-if="mfData.count && mfData.count > 0">
                    <button type="button" class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs">
                        <p>Download</p>
                    </button>
                </div> -->
            </div>


        </div>

        <div class="card mt-5  rounded bg-white shadow-sm" v-if="showData && showData.length > 0">
            <table class="w-full border rounded table-fixed h-full cursor-pointer">
                <thead>

                    <tr class="border-b border-[#ededed] text-[13px]">
                        <th v-for="head in headers" class="border-r" :class="head.class">
                            {{ head.name }}
                        </th>
                    </tr>
                </thead>
                <tbody class="h-[100px]">
                    <tr class="border-b border-[#ededed] text-sm" v-for="(item, index) in showData" :key="index">
                        <td class="truncate text-center border-r">
                            {{ item.orderNo }}
                        </td>
                        <td class="truncate text-center border-r">
                            {{ item.clientCode }}
                        </td>
                        <td class="truncate text-center border-r">
                            {{ item.schemeCd }}
                        </td>
                        <td class="text-center border-r">{{ item.schemeName }}</td>
                        <td class="truncate text-center border-r">
                            {{ item.orderStatus }}
                        </td>
                        <td class="text-center border-r">{{ item.buySell }}</td>
                        <td class="text-center border-r">{{ }}</td>
                        <td class="text-center border-r">{{ item.orderVal }}</td>
                        <!-- <td class="text-center border-r">{{ item.orderVal }}</td>
                        <td class="text-center border-r">{{ item.orderVal }}</td> -->

                    </tr>
                </tbody>
            </table>

            <commonPagination :totLen="mfData.count" :rowCount="rowsCount" :pageDate="rowPerPage"
                @page-chg="listenPageChange" />

        </div>
        <noData v-else> </noData>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'vuex';
import Icons from "../components/icons.vue";
import commonPagination from '../components/commonPagination.vue'
import noData from '../components/no-data.vue'
export default defineComponent({
    name: 'ipo_logs',
    setup() {
        const today = new Date();
        const fromDate = ref();
        const toDate = ref();
        const popover = ref({
            visibility: "click",
            placement: "bottom-start",
        });
        const headers = ref([
            { name: 'Order No', class: 'text-center' },
            { name: 'Client Id', class: 'text-center' },
            { name: 'Scheme Code', class: 'text-center' },
            { name: 'Scheme Name', class: 'text-center' },
            { name: 'Status', class: 'text-center' },
            { name: 'Buy-Sell', class: 'text-center' },
            { name: 'Unit', class: 'text-center' },
            { name: 'Amount', class: 'text-center' }
        ])
        const rowsCount = ref(10)
        const lastCount = ref(10)
        const isBottom = ref(false)
        const rowPerPage = ref([
            { id: 1, option: 10 },
            { id: 2, option: 20 },
            { id: 3, option: 30 },
            { id: 4, option: 50 },
            { id: 5, option: "All" },
        ])
        const showData = ref<any>([])
        return {
            today, fromDate, toDate, popover, headers, rowsCount, isBottom, rowPerPage, showData, lastCount
        }
    },
    components: {
        commonPagination, Icons, noData
    },
    methods: {
        getMinDate() {
            let date = new Date();
            let newMonth = date.getMonth() - 1;
            date.setMonth(newMonth);
            return date.toISOString().slice(0, 10);
        },
        async setPreviousWeekDatetime() {
            const now = new Date();
            // now.setDate(now.getDate() - 7); // Subtract 7 days
            const year = now.getFullYear().toString().padStart(4, "0");
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const day = now.getDate().toString().padStart(2, "0");
            this.toDate = this.fromDate = new Date(`${year}-${month}-${day}`);
        },
        dateFormatter(date: any) {
            if (!date) return null;

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
        },
        async getReports(params: any) {
            await this.$store.dispatch('accessLog/callgetMfDetails', { startDate: this.dateFormatter(this.fromDate), endDate: this.dateFormatter(this.toDate), dataLimit: this.lastCount }).finally(async () => {
                await this.listenPageChange(params)
            })

        },
        async updateList(event: any) {
            let fromIndex = event.from;
            let lastIndex =
                event.last == "" ? this.mfData.mfOrderDetails.length : event.last;
            this.showData = this.mfData.mfOrderDetails.slice(fromIndex, lastIndex);
        },
        async listenPageChange(event: any) {
            this.rowsCount = event.count;
            this.lastCount = event.last
            if (this.mfData) {
                if (this.mfData.count > this.lastCount || (this.lastCount - this.rowsCount) < this.mfData.count) {
                    var exceptedCount: any = this.mfData.mfOrderDetails.length;
                    if (this.mfData.count > this.lastCount) {
                        exceptedCount = this.lastCount;
                    } else if ((this.lastCount - this.rowsCount) < this.mfData.count) {
                        exceptedCount = this.mfData.count;
                    }
                    if (exceptedCount <= this.mfData.mfOrderDetails.length) {
                        await this.updateList(event)
                    } else {
                        await this.getReports(event)
                    }
                }
            } else {
                this.showData = [];
            }

        }
    },
    computed: {
        ...mapState('accessLog', ['ipo_Loader', 'mfData'])
    },
    async mounted() {
        this.$store.commit('accessLog/setMfData', '')
        await this.setPreviousWeekDatetime()
    }
})
</script>