<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="relative z-10 " >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="order-window max-w-lg h-full rounded-xl shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <form id="orderWindow" name="orderWindow" class="flex flex-col"
                                @submit.prevent="placeOrder()">
                                <div class="order-window max-w-lg h-full ">
                                    <div :class="orderType === 'buy' ? 'bg-blue-500' : 'bg-orange-500'"
                                        class="header-class">
                                        <div class="flex justify-between items-center p-4">
                                            <section class="flex flex-col">
                                                <div class="flex justify-start text-white text-sm">
                                                    {{ getContractInfo.formattedInsName }}
                                                </div>
                                                <div class="flex space-x-4"
                                                    v-if="Object.keys(getContractInfoFull.scrips).length == 2">
                                                    <div v-for="(exchangeData, exchange) in getContractInfoFull.scrips"
                                                        :key="exchange" class="flex items-start align-middle">
                                                        <input :id="`${exchangeData.exchange}_radio_btn`"
                                                            @change="logExchangeValue(exchangeData.exchange)"
                                                            name="radio_btn_group" type="radio"
                                                            :value="exchangeData.exchange" v-model="currentExchange"
                                                            class="cursor-pointer h-4 w-4 mt-1" />
                                                        <label :for="`${exchangeData.exchange}_radio_btn`"
                                                            class="pl-2 gap-1 cursor-pointer text-white" :class="{
                                                                'opacity-100': currentExchange === exchangeData.exchange,
                                                                'opacity-50': currentExchange !== exchangeData.exchange,
                                                            }">
                                                            <span class="text-sm mr-1">{{ exchangeData.exchange
                                                            }}</span>:
                                                            <span class="text-sm mr-1">{{ exchangeData?.pdc ?
                                                                parseFloat(exchangeData?.pdc).toFixed(2) :
                                                                exchangeData?.pdc }}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="flex space-x-[86px] pt-2" v-else>
                                                    <div class="flex items-start">
                                                        <section class="secondaryColor gap-1">
                                                            <span class="text-sm mr-1 text-white">{{ currentExchange
                                                            }}</span>
                                                            <span class="text-sm mr-1 text-white">{{
                                                                getContractInfo?.pdc ?
                                                                    parseFloat(getContractInfo?.pdc).toFixed(2) :
                                                                    getContractInfo?.pdc }}</span>
                                                            <!-- <span class="text-xs text-white mb-[1px]">{{
                                                            getContractInfo?.change }} ({{
                                                                getContractInfo?.cp
                                                            }}%)</span> -->
                                                        </section>
                                                    </div>
                                                </div>
                                            </section>
                                            <section
                                                class="relative inline-block w-9 align-middle select-none transition duration-200 ease-in">
                                                <input type="checkbox" id="toggle" class="hidden"
                                                    v-model="buySellRadio" />
                                                <label for="toggle"
                                                    class="overflow-hidden h-4 rounded-full cursor-pointer bg-[#00000061] transition-colors duration-200 ease-in flex items-center justify-center">
                                                    <span
                                                        class="absolute left-0 right-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in"
                                                        :class="{ 'translate-x-5': orderType === 'sell' }"></span>
                                                </label>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="border-b border-gray-200 bg-white">
                                        <div class="flex">
                                            <div class="flex-1 inline-flex items-center cursor-pointer"
                                                @click="showMore = false">
                                                <div v-for="(item, index) in orderTypeList" :key="index" :class="{
                                                    ' border-b-2 border-b-blue-600 text-blue-500 ': orderTab === index && orderType === 'buy',
                                                    ' border-b-2 border-b-orange-600 text-orange-500 ': orderTab === index && orderType === 'sell',
                                                    'hover:bg-gray-200': orderTab !== index
                                                }" class="px-4 py-2 transition-colors" @click="orderTab = index">
                                                    <span>{{ item }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="p-4 ">
                                            <div class="flex justify-between items-center">
                                                <div class="flex mb-2">
                                                    <div class="flex justify-between items-center gap-3 text-xs">
                                                        <template v-for="(item, i) in filteredProductItems" :key="i">
                                                            <div>
                                                                <button type="button"
                                                                    @click="selectedProductType = item" :class="{
                                                                        'bg-blue-500 text-white': selectedProductType === item && orderType === 'buy',
                                                                        'bg-orange-500 text-white': selectedProductType === item && orderType === 'sell',
                                                                        'bg-gray-200': selectedProductType !== item
                                                                    }" class="px-2 py-1 rounded h-[26px] w-[50px]">
                                                                    {{ item }}
                                                                </button>
                                                            </div>
                                                        </template>
                                                    </div>
                                                    <div class="ml-12 flex items-center gap-2">
                                                        <label class="cursor-pointer" for="range">Range</label>
                                                        <input class="h-4 w-4 accent-[#2563EB] cursor-pointer"
                                                            type="checkbox" name="range" id="range" v-model="isRange">
                                                    </div>
                                                </div>
                                                <div class="flex mb-2 text-sm">
                                                    <div class="inline-flex items-center gap-3 text-xs">
                                                        <div>
                                                            <label class="block text-gray-700 text-sm mb-1 text-start"
                                                                for="qty">Quantity</label>
                                                            <input id="qty" type="number" v-model="quantity"
                                                                @input="quantityValidation"
                                                                :min="getContractInfo.lotSize"
                                                                :step="getContractInfo.lotSize"
                                                                class="border border-gray-300 rounded p-2 w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Input Fields -->
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                                                <div>
                                                    <label class="block text-gray-700 text-sm mb-1 text-start"
                                                        for="price">Price</label>
                                                    <input id="price" type="number" v-model="price"
                                                        @input="priceValidation" :disabled="isPriceDisabled"
                                                        :step="getContractInfo.tickSize" :min="getContractInfo.tickSize"
                                                        class="border border-gray-300 rounded p-2 w-full"
                                                        @keypress="decimalAllowed($event)" />
                                                </div>
                                                <div>
                                                    <label class="block text-gray-700 text-sm mb-1 text-start"
                                                        for="targetPrice">
                                                        Target Price
                                                    </label>
                                                    <input id="targetPrice" type="number" v-model.number="targetPrice"
                                                        :disabled="isTriggerPriceDisabled"
                                                        class="border border-gray-300 rounded p-2 w-full"
                                                        :step="getContractInfo.tickSize" :min="getContractInfo.tickSize"
                                                        @keypress="decimalAllowed($event)"
                                                        @input="targetPriceValidation" />
                                                </div>
                                                <div>
                                                    <label class="block text-gray-700 text-sm mb-1 text-start"
                                                        for="Stoploss">Stoploss Price</label>
                                                    <input id="Stoploss" type="number" v-model="stoplossPrice"
                                                        :disabled="isPriceDisabled" :step="getContractInfo.tickSize"
                                                        :min="getContractInfo.tickSize"
                                                        class="border border-gray-300 rounded p-2 w-full"
                                                        @keypress="decimalAllowed($event)"
                                                        @input="stoplossPriceValiation" />
                                                </div>
                                            </div>
                                            <div v-if="isRange" class="text-[#888] text-left px-5">to</div>
                                            <div v-if="isRange" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                                <div>
                                                    <label class="block text-gray-700 text-sm mb-1 text-start"
                                                        for="price1">Price</label>
                                                    <input id="price1" type="number" v-model="price1"
                                                        :disabled="isPriceDisabled" :step="getContractInfo.tickSize"
                                                        :min="getContractInfo.tickSize"
                                                        class="border border-gray-300 rounded p-2 w-full"
                                                        @keypress="decimalAllowed($event)" @input="toPriceValidation" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Place Order Button -->
                                    <div class="flex justify-end p-4 gap-4 border-gray-200 bg-[#f3f3f3]">
                                        <button id="order_window_place_order_btn" type="submit"
                                            class="bg-blue-600 text-white py-2 px-4   w-[100px] rounded"
                                            :class="orderType === 'buy' ? 'bg-blue-500' : 'bg-orange-500'">
                                            {{ isModify ? 'Modify' : 'Add' }}
                                        </button>
                                        <button type="button" @click="close" id="order_window_btn"
                                            class="text-black py-2 px-4 border border-gray-300  rounded w-[100px]">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import { Dialog, TransitionChild, TransitionRoot, DialogPanel } from '@headlessui/vue';
import { mapGetters, mapState } from "vuex";
import Icons from "../../components/icons.vue";


export default defineComponent({
    components: { Dialog, TransitionChild, TransitionRoot, Icons, DialogPanel },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        isModify: {
            type: Boolean,
            required: true,
        },
        scripData: {
            // type: [Object, String],
            required: true
        }
    },
    data() {
        return {
            nseBseRadioSwitch: 'NSE', // default selection
            orderType: 'buy', // default to buy
            orderTypeList: ['Regular'],
            orderTab: 0, // default tab
            showMore: false,
            quantity: '',
            priceval: '',
            triggerPriceval: '',
            modifyOrder: false, // modify flag
            isPrice: true, // whether price is editable
            isTrgPrice: true, // whether trigger price is editable
            isDisclosedQty: true, // whether disclosed quantity is editable
            showPriceItems: ['SL',],
            selectedPriceType: 'SL',
            selectedProductType: 'MIS',
            buySellRadio: false,
            selectedData: '',
            validityType: '',
            showValidityItems: ['DAY', 'IOC'],
            validityType: 'DAY',
            // isRange: false,
            triggerPrice: 0,
            price: 0,
            price1: 0,
            targetPrice: 0,
            targetPrice1: 0,
            stoplossPrice: 0,
            stoplossPrice1: 0,
        };
    },
    computed: {
        ...mapGetters("tradecall", ["getContractInfo", "getIsRange", "getContractInfoFull", "getCurrentExch"]),
        ...mapState('tradecall', ['scripsArray', 'selectedScrip']),

        filteredProductItems() {
            let productitems = this.getCurrentExch == "NSE" || this.getCurrentExch == "BSE" ? ["MIS", "CNC", "NRML"] : ["MIS", "NRML"]
            if (this.orderTypeList[this.orderTab] === 'Cover' || this.orderTypeList[this.orderTab] === 'Bracket') {
                return productitems.filter(item => item == 'MIS');
            }
            else {
                return productitems;
            }
        },

        isTriggerPriceDisabled() {
            return (this.selectedPriceType === 'Limit' || this.selectedPriceType === 'Market') ? true : false
        },

        isPriceDisabled() {
            return (this.selectedPriceType === 'Market' || this.selectedPriceType === 'SL-M') ? true : false;
        },

        isDisclosedQtyDisabled() {
            return this.selectedPriceType === 'Limit' || this.selectedPriceType === 'SL' || this.selectedPriceType === 'SL-M' || this.selectedPriceType === 'Market';
        },
        isRange: {
            get() {
                return this.getIsRange
            },
            set(value) {
                this.$store.commit("tradecall/setIsRange", value && value != '0' && value != null && value != undefined)
            }
        },
        currentExchange: {
            get() {
                return this.getCurrentExch
            },
            async set(value) {
                await this.$store.dispatch("tradecall/setCurrentExch", value);
            }
        }
    },
    watch: {
        buySellRadio: function (newValue) {
            this.orderType = newValue ? 'sell' : 'buy';
        }
    },
    methods: {
        close() {
            this.$store.commit('tradecall/setshowdialog', false)
        },
        placeOrder() {
            this.checkAllValidations()

            const qtyInputBox = document.querySelector("#qty");
            const priceInputBox = document.querySelector("#price");
            const stopLossPriceInputBox = (
                document.querySelector("#Stoploss")
            );
            const targetPriceInputBox = (
                document.querySelector("#targetPrice")
            );
            const priceInputBox1 = document.querySelector("#price1");

            const formIsValid = qtyInputBox?.checkValidity() && priceInputBox?.checkValidity() && stopLossPriceInputBox?.checkValidity() && targetPriceInputBox?.checkValidity() && this.isRange ? priceInputBox1?.checkValidity()  : true

            if (formIsValid) {
                let obj = {
                    "remarks": "",
                    "exchange": this.getContractInfo.exchange,
                    "token": this.getContractInfo.token,
                    "tags": "",
                    "qty": this.quantity.toString(),
                    "priceUpperBound": this.isRange ? this.price1.toString() : this.price.toString(),
                    "priceLowerBound": this.price.toString(),
                    "targetUpperBound": this.targetPrice,
                    "targetLowerBound": this.targetPrice,
                    "stoplossUpperBound": this.stoplossPrice,
                    "stoplossLowerBound": this.stoplossPrice,
                    "triggerPrice": this.triggerPrice.toString(),
                    "product": this.selectedProductType,
                    "tradingSymbol": this.getContractInfo.tradingSymbol,
                    "transType": this.orderType,
                    "priceType": this.selectedPriceType,
                    "orderType": "Regular",
                    "retention": "DAY",
                    "status": "open",
                    "researchCallId": 0,
                    "expiryDate": "",
                    "validity": "",
                    "formattedInsName": this.getContractInfo.formattedInsName,
                    "lotSize": this.getContractInfo.lotSize
                }
                this.$store.state.tradecall.scripsArray.push(obj)
             
                this.$emit('handleClose', obj);
            }
        },

        logExchangeValue(from) {
            let priceNormal = this.scripData && this.scripData.priceLowerBound ? this.scripData.priceLowerBound : this.scripData &&  this.scripData.priceUpperBound ? this.scripData.priceUpperBound : ''
            let targetNormal = this.scripData && this.scripData.targetLowerBound ? this.scripData.targetLowerBound : this.scripData && this.scripData.targetUpperBound  ? this.scripData.targetUpperBound  : ''
            let stoplossNormal = this.scripData && this.scripData.stoplossLowerBound ? this.scripData.stoplossLowerBound : this.scripData && this.scripData.stoplossUpperBound  ? this.scripData.stoplossUpperBound  : ''

            let ltp = this.getContractInfo.pdc ? parseFloat(this.getContractInfo.pdc).toFixed(2) : 0.00
            this.quantity = this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) ? this.scripData.qty : this.getContractInfo.lotSize
            this.price = this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) ? priceNormal: ltp
            this.price1 = this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) ? this.scripData.priceUpperBound : ltp
            this.targetPrice = this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) ? targetNormal : ltp
            this.stoplossPrice = this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) ? stoplossNormal : ltp
            if (this.isModify && (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange))) {
                this.buySellRadio = this.scripData && this.scripData.transType.toString().toLowerCase() == 'sell' ? true : false
            }
            if (from == "mounted" || (Object.keys(this.scripData).length > 0 && from == this.scripData.exchange)) {
                let isValidateRange = this.scripData.priceLowerBound == this.scripData.priceUpperBound
                this.isRange = !isValidateRange
            }
        },

        selectValidityType(item) {
            this.validityType = item;
        },

        getexchange(val) {
            if (this.getContractInfo) {
                let sodata = this.getContractInfo.filter((el) => el.exchange == val)
                return sodata[0]
            }
            else {
                return {
                    pdc: 0.00
                }
            }
        },

        floatSafeRemainder(val, step) {
            val = val ? val.toString() : "";
            step = step ? step.toString() : "";
            var valDecCount = val.includes(".")
                ? val.split(".")[1].length != null
                    ? val.split(".")[1].length
                    : 0
                : val.length;
            var stepDecCount = step.includes(".")
                ? step.split(".")[1].length != null
                    ? step.split(".")[1].length
                    : 0
                : step.length;
            var decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
            var valInt = decCount.toString().replaceAll(".", "");
            val ? (valInt = parseFloat(valInt).toFixed(decCount)) : "";
            var stepInt = decCount.toString().replaceAll(".", "");
            step ? (stepInt = parseFloat(stepInt).toFixed(decCount)) : "";
            return (valInt % stepInt) / Math.pow(10, decCount);
        },

        decimalAllowed(event) {
            const charCode = event.which ? event.which : event.keyCode;
            if ((charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) || (event.target.value.includes('.') && charCode === 46)) {
                event.preventDefault();
            }
        },

        quantityValidation(Event) {
            if (Event) this.quantityInputRestriction(Event)
            var qtyVal = parseFloat(this.quantity);
            var qtyLot = this.floatSafeRemainder(qtyVal, this.getContractInfo.lotSize);
            const qtyInputBox = document.querySelector("#qty");
            if (qtyInputBox) {
                if (this.quantity.toString() == "") {
                    qtyInputBox.setCustomValidity("Quantity cannot not be empty");
                } else if (qtyVal == 0) {
                    qtyInputBox.setCustomValidity("Quantity cannot be zero");
                } else if (qtyLot != 0 && this.getContractInfo.lotSize > 0) {
                    qtyInputBox.setCustomValidity("Quantity should be multiple of lot size. (" + this.getContractInfo.lotSize + ")");
                } else {
                    qtyInputBox.setCustomValidity("");
                }
            }
        },

        quantityInputRestriction(event) {
            const inputElement = event.target
            if (!inputElement) return
            const value = inputElement.value;
            const maxDigits = 10;
            if (value.length > maxDigits) {
                inputElement.value = value.slice(0, maxDigits);
            }
        },

        priceValidation() {
            const priceInputBox = document.querySelector("#price");
            var priceVal = parseFloat(this.price);
            var priceTick = this.floatSafeRemainder(priceVal, this.getContractInfo.tickSize);
            if (priceInputBox) {
                if (this.price.toString() == "") {
                    priceInputBox.setCustomValidity("Price cannot be Empty");
                } else if (priceVal == 0) {
                    priceInputBox.setCustomValidity(`Price cannot be zero`);
                } else if (priceTick != 0) {
                    priceInputBox.setCustomValidity(
                        `Price Should be multiple of Tick size ${this.getContractInfo.tickSize}`
                    );
                } else {
                    priceInputBox.setCustomValidity("");
                }
            } else {
                priceInputBox.setCustomValidity("");
            }
        },

        toPriceValidation() {
            const priceInputBox = document.querySelector("#price1");
            var priceVal = parseFloat(this.price1);
            var priceTick = this.floatSafeRemainder(priceVal, this.getContractInfo.tickSize);
            if (priceInputBox) {
                if (this.price1.toString() == "") {
                    priceInputBox.setCustomValidity("Price cannot be Empty");
                } else if (priceVal == 0) {
                    priceInputBox.setCustomValidity(`Price cannot be zero`);
                } else if (priceTick != 0) {
                    priceInputBox.setCustomValidity(
                        `Price Should be multiple of Tick size ${this.getContractInfo.tickSize}`
                    );
                } else {
                    priceInputBox.setCustomValidity("");
                }
            } else {
                priceInputBox.setCustomValidity("");
            }
        },

        async stoplossPriceValiation() {
            const stopLossPriceInputBox = (
                document.querySelector("#Stoploss")
            );
            var trigPriceVal = parseFloat(this.stoplossPrice);
            var ltp = this.price
            var trigTick = this.floatSafeRemainder(trigPriceVal, this.getContractInfo.tickSize);

            if (stopLossPriceInputBox) {
                if (this.stoplossPrice.toString() == "") {
                    stopLossPriceInputBox?.setCustomValidity("Stoploss Price cannot be Empty");
                } else if (trigPriceVal == 0) {
                    stopLossPriceInputBox?.setCustomValidity("Stoploss Price cannot be zero");
                } else if (this.orderType.toString().toUpperCase() == "BUY" && trigPriceVal > ltp) {
                    stopLossPriceInputBox?.setCustomValidity(`Stoploss Price should be less than Price`);
                } else if (this.orderType.toString().toUpperCase() == "SELL" && trigPriceVal < ltp) {
                    stopLossPriceInputBox?.setCustomValidity(`Stoploss Price should be more than Price`);
                }
                else if (trigTick != 0) {
                    stopLossPriceInputBox?.setCustomValidity(`Stoploss Should be multiple of Ticks ${this.getContractInfo.tickSize}`);
                } else {
                    stopLossPriceInputBox?.setCustomValidity("");
                }
                stopLossPriceInputBox.reportValidity()
            } else {
                stopLossPriceInputBox?.setCustomValidity("");
            }
        },

        async targetPriceValidation() {
            const targetPriceInputBox = (
                document.querySelector("#targetPrice")
            );
            var value = parseFloat(this.targetPrice);
            var ltp = this.price
            var targetTick = this.floatSafeRemainder(value, this.getContractInfo.tickSize);
            if (targetPriceInputBox) {
                if (this.targetPrice.toString() == "" || !this.targetPrice) {
                    targetPriceInputBox.setCustomValidity("Target Price Cannot be Empty");
                } else if (value == 0) {
                    targetPriceInputBox.setCustomValidity("Target Price should be greater than 0");
                } else if (targetTick != 0) {
                    targetPriceInputBox.setCustomValidity(`Target Price should be multiple of " + ${this.getContractInfo.tickSize}`);
                }
                else if (this.orderType && this.orderType.toString().toUpperCase() == "SELL" && value > ltp ) {
                    targetPriceInputBox?.setCustomValidity(`Target Price should be less than Price`);
                } else if (this.orderType && this.orderType.toString().toUpperCase() == "BUY" && value < ltp ) {
                    targetPriceInputBox?.setCustomValidity(`Target Price should be more than Price`);
                }
                else {
                    targetPriceInputBox.setCustomValidity("");
                }
                targetPriceInputBox.reportValidity()
            }
        },

        checkAllValidations() {
            this.quantityValidation()
            this.priceValidation()
            this.stoplossPriceValiation()
            this.targetPriceValidation()
            if (this.isRange) {
                this.toPriceValidation()
            }
        }
    },
    mounted() {
        this.currentExchange = this.isModify ? this.scripData.exchange : this.getContractInfo.exchange
        this.selectedProductType = this.isModify ? this.scripData.product : 'MIS' 
        this.logExchangeValue('mounted')
    }
});
</script>


<style scoped>
input:disabled {
    background-color: #f3f3f3;
    border: 1px solid #ccc;
    color: #666;
}

.order-window {
    max-width: 600px;
    background-color: white;
    border-radius: 8px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>