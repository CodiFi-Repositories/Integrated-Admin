<style>
.danger {
    border-left-color: #ec4c47;
}

.success {
    border-left-color: #47b881;
}

.info {
    border-left-color: orangered;
}

.buyToastColor {
    border-left-color: #2992ec;
}

.sellToastColor {
    border-left-color: #f75723;
}
</style>
<template>
    <div aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-20">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div v-for="(notify, index) of notificationData" :key="index"
                class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div v-if="notify.show">
                    <div class="p-4 border-l-[16px]" :class="notify.type">
                        <div class="flex items-start">  
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-bold primaryColor" v-if="notify.title">
                                    {{ notify.title }}
                                </p>
                                <p class="mt-1 text-sm font-medium secondaryColor" v-if="notify.message">
                                    {{ notify.message }}
                                </p>
                                <p class="mt-1 text-sm font-medium secondaryColor" v-if="notify.status">
                                    {{ notify.status }}
                                </p>
                                <p class="mt-1 text-sm font-medium text-gray-500" v-if="notify.comment">
                                    {{ notify.comment }}
                                </p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button type="button" @click="closeNotify(notify, index)"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return {
            cls: "success",
            timer: 4000,
            timeOut: "",
        };
    },
    components: {
        CheckCircleIcon,
        XMarkIcon,
    },

    computed: {
        ...mapState(["isNotify", "notification"]),
        ...mapGetters(["getNotification"]),
        notificationData: {
            get() {
                return this.getNotification;
            },
            set(val) {
                this.$store.commit("setNotification", val);
            },
        },
    },

    watch: {
        notification: {
            async handler(newValue, oldValue) {
                await clearTimeout(this.timeOut);
                this.timeOut = setInterval(() => {
                    for (var i = 0; i < newValue?.length; i++) {
                        this.closeNotify(newValue[i], i);
                    }
                }, 4000);
            },
            deep: true,
        },
    },

    methods: {
        closeNotify(data, index) {
            this.notificationData.splice(index, 1);
        },
    },
};
</script>
