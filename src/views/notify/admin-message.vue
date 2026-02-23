<template>
    <div class="w-full overflow-hidden p-4">

        <form @submit.prevent="submitHandle()">
            <div class="min-w-full sm:p-3 lg:p-4 grid grid-cols-12 w-[100%] bg-white rounded border">
                <div class="break-after-column col-span-3 ">
                    <div class="">
                        <p class="text-sm font-bold mb-4 primaryColor">
                            Push Notification
                        </p>
                    </div>
                </div>
                <div class="col-span-5 bg-white pl-[20px]">
                    <div class="mb-5 flex flex-col">
                        <fieldset>
                            <div class="mb-2 text-sm ">
                                User Type
                            </div>
                            <legend class="sr-only text-sm">User Type</legend>
                            <div class="space-y-4 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
                                <div v-for="item in userTypes" :key="item.id" class="flex items-center cursor-pointer">
                                    <input v-model="userType" :value="item.value" :id="item.id"
                                        name="notification-method" @change="switchRadio()" type="radio"
                                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" />
                                    <label :for="item.id"
                                        class="ml-3 block text-sm font-medium leading-6 text-gray-900 cursor-pointer">{{
            item.title }}</label>
                                </div>
                            </div>
                        </fieldset>

                        <div class="mt-4" v-if="userType == 'individual'">
                            <div class="pb-1 text-sm ml-2">User ID <span class="ml-1 text-xs">( Ex: 10234,12049,76543
                                    )</span>
                            </div>
                            <input type="text"
                                class="border w-full h-10 rounded focus:outline-0 px-4 max-w-[350px] text-xs"
                                v-model="userId">

                            <div class="h-4 mb-2 mt-1 text-red-500 text-xs ml-2">
                                <span v-if="submitted && userId == ''">User ID is required</span>
                            </div>
                        </div>

                        <div>
                            <div class="pb-1 text-sm ml-2">Heading</div>
                            <input type="text"
                                class="border w-full h-10 rounded focus:outline-0 px-4 max-w-[350px] text-xs"
                                v-model="heading">
                            <div class="h-4 mb-2 mt-1 text-red-500 text-xs ml-2">
                                <span v-if="submitted && heading == ''">Heading is required</span>
                            </div>
                        </div>

                        <div>
                            <div class="pb-1 text-sm ml-2">Message</div>
                            <textarea id="adminMsg" rows="5"
                                class="border w-full rounded focus:outline-0 p-2 max-w-[350px] text-xs"
                                v-model="message" placeholder="Enter the template message"></textarea>
                            <div class="h-4 mb-2 text-red-500 text-xs ml-2">
                                <span v-if="submitted && message == ''">Message is required</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-4 bg-white"></div>
            </div>
            <div class="h-full flex items-top justify-end w-[100%] gap-4">
                <div class="mt-[10px]">
                    <button type="button" class="border h-10 w-[120px] cursor-pointer rounded text-xs">Cancel</button>
                </div>
                <div class="mt-[10px]">
                    <button type="submit"
                        class=" bg-[#005CB9]  text-white h-10 w-[120px] cursor-pointer rounded text-xs">
                        <p v-if="!getLoader">Submit</p>
                        <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                            xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </form>
        <Push_Confirmation @parentTrigger="actionTrigger" v-if="resetdialogue == true"></Push_Confirmation>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters, mapState } from 'vuex';
import Push_Confirmation from './push_Confirmation.vue';
export default defineComponent({
    components: { Push_Confirmation },
    setup() {
        const items = ref(["General Info", "Info with Link"])
        const template = ref('General Info')
        const userId = ref('')
        const heading = ref('')
        const message = ref('')
        const userTypes = ref([
            { id: 'individual', title: 'Individual', value: 'individual' },
            { id: 'all', title: 'All', value: 'all' },
        ])
        const userType = ref('individual')
        const submitted = ref(false)
        const CaptchaVal = ref('');
        const messageFromChild = ref('');
        return { items, template, userId, heading, message, userTypes, userType, submitted, CaptchaVal, messageFromChild }
    },
    computed: {
        ...mapGetters('notify', ['getLoader']),
        ...mapState("notify", ["resetdialogue"]),
    },
    methods: {
        // handleCustomEvent(message:any){
        //  this.messageFromChild = message;
        //  this.submitHandle();
        // },


        async submitHandle() {

            this.submitted = true
            if (this.validateForms()) {

            }
        },
        switchRadio() {
            if (this.userType == 'individual') {
                this.userId = ''
                this.heading = ''
                this.message = ''
            } if (this.userType == 'all') {
                this.heading = ''
                this.message = ''
            } else { }
        },
        resetFields() {
            this.submitted = false
            this.userId = ''
            this.heading = ''
            this.message = ''
            this.userType = 'individual'
        },
        validateForms() {
            if (this.userType == 'individual') {
                this.userId != '' && this.heading != '' && this.message != '' ? this.reset_confirmation() : ''

            } if (this.userType == 'all') {
                return this.heading != '' && this.message != '' ? this.reset_confirmation() : ''
            } else {

            }
        },
        async actionTrigger() {
            let json = {
                "message": this.message,
                "messageType": this.template == 'General Info' ? 'Info' : 'Link',
                "userType": this.userType,
                "title": this.heading,
                "userId": !this.userId ? [] : this.userId.split(",")
            }
            await this.$store.dispatch('notify/sendPushNotification', json)
            this.resetFields();
        },
        reset_confirmation() {
            this.$store.commit("notify/setresetdialogue", true);
            //   this.CaptchaVal = this.getCapcha();
        },
        //  getCapcha(){
        //   var result = "";
        //   var characters =
        //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        //   var charactersLength = characters.length;
        //   for (var i = 0; i < 6; i++) {
        //   result += characters.charAt(
        //   Math.floor(Math.random() * charactersLength)
        //  );
        //  }
        //   return result;
        // },

    },
})
</script>