<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        >
          <form @submit.prevent="handleSubmit()">
            <div>
              <div class="">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Add Session
                </h3>

                <div class="">
                  <Listbox as="div" v-model="preference">
                    <ListboxLabel
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Preference</ListboxLabel
                    >
                    <div class="relative mt-2">
                      <ListboxButton
                        :disabled="isModify"
                        class="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        :class="
                          isModify ? 'cursor-not-allowed' : 'cursor-pointer'
                        "
                      >
                        <span class="block truncate">{{ preference }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <ChevronUpDownIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </ListboxButton>

                      <transition
                        leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          <ListboxOption
                            as="template"
                            v-for="(person, id) in preferenceList"
                            :key="id"
                            :value="person"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-pointer select-none py-2 pl-3 pr-9',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate',
                                ]"
                                >{{ person }}</span
                              >

                              <span
                                v-if="selected"
                                :class="[
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                ]"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900 py-2"
                  >
                    Date *</label
                  >
                  <VDatePicker
                    type="date"
                    :max-date="new Date().toISOString().slice(0, 10)"
                    :min-date="getMinDate()"
                    v-model="fromDate"
                    is-required
                    :popover="popover"
                    :masks="{
                      input: 'DD-MM-YYYY',
                      modelValue: 'DD-MM-YYYY',
                    }"
                    mode="date"
                    is24hr
                    :dateFormat="'DD-MM-YYYY'"
                  >
                    <template
                      v-slot="{ togglePopover, inputValue, inputEvents }"
                    >
                      <div
                        class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1"
                      >
                        <input
                          :value="inputValue"
                          placeholder="DD-MM-YYYY"
                          v-on="inputEvents"
                          class="w-full h-9 ml-1 text-xs outline-none cursor-pointer"
                          readonly
                        />
                        <button
                          type="button"
                          class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                          @click="() => togglePopover()"
                        >
                          <!-- <icons
                            :name="'datePicker'"
                            class="w-5"
                            :color="'#ffffff'"
                          /> -->
                        </button>
                      </div>
                    </template>
                  </VDatePicker>
                </div>
                <div class="mt-2">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900 pb-2"
                    for="Version ID"
                    >Start Time *</label
                  >
                  <input
                    placeholder="HH:MM:SS"
                    type="text"
                    v-model="startTime"
                    class="border w-full h-[36px] rounded focus:outline-0 px-2 text-xs"
                    @keypress="keyPressColonNumeric($event)"
                  />

                  <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                    <span v-if="isSubmit && !isValidTimeFormat(startTime)"
                      >Start Time should be Eg. 12.00:01</span
                    >
                  </div>
                </div>
                <div class="mt-2">
                  <label
                    class="block text-sm font-medium leading-6 text-gray-900 pb-2"
                    for="Version ID"
                    >End Time *
                  </label>
                  <input
                    placeholder="HH:MM:SS"
                    type="text"
                    v-model="endTime"
                    class="border w-full h-[36px] rounded focus:outline-0 px-2 text-xs"
                    @keypress="keyPressColonNumeric($event)"
                  />

                  <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                    <span v-if="isSubmit && !isValidTimeFormat(endTime)"
                      >End Time should be Eg. 12.00:01</span
                    >
                  </div>
                </div>
                <!-- <div class="mt-4">
                  <Listbox as="div" v-model="deviceType">
                    <ListboxLabel
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >OS</ListboxLabel
                    >
                    <div class="relative mt-2">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <span class="block truncate">{{
                          deviceType.name
                        }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <ChevronUpDownIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </ListboxButton>

                      <transition
                        leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          <ListboxOption
                            as="template"
                            v-for="(person, id) in deviceTypeList"
                            :key="id"
                            :value="person"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate',
                                ]"
                                >{{ person.name }}</span
                              >

                              <span
                                v-if="selected"
                                :class="[
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                ]"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div> -->
              </div>
            </div>
            <div class="mt-5 sm:mt-6 flex gap-2">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                @click="handleCancel()"
              >
                Cancel
              </button>
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                @click="handleSubmit()"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
// import icons from "../../../components/icons.vue";
import { mapGetters } from "vuex";
export default defineComponent({
  setup() {
    const preference = ref("HOLDINGS");

    const preferenceList = ref([
      'HOLDINGS',
      'BSE'
    ]);
    const fromDate = ref(new Date());
    const isSubmit = ref(false);
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const startTime = ref("");
    const endTime = ref("");
    return {
      preference,
      preferenceList,
      isSubmit,
      fromDate,
      popover,
      startTime,
      endTime,
    };
  },
  props: ["holdingData", "isModify"],
  computed: {
    ...mapGetters(["getUserId"]),
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    ChevronUpDownIcon,
   // icons,
  },
  methods: {
    handleCancel() {
      this.$store.commit("holdingControls/setIsCreateSessionDialog", false);
    },
    formatToHoldingYMD(item: any) {
      let newDate = new Date(item);
      const date = newDate.getDate();
      let month: any = newDate.getMonth() + 1;
      month = Number(month) < 10 ? `0${month}` : month;
      const year = newDate.getFullYear();
      const formattedDate = `${year}-${month}-${Number(date) < 10 ? `0${date}` : date}`;
      return formattedDate;
    },
    async handleSubmit() {
      if (
        this.preference &&
        this.isValidTimeFormat(this.endTime) &&
        this.isValidTimeFormat(this.startTime)
      ) {
        let formattedDate = this.fromDate
          ? this.formatToHoldingYMD(this.fromDate)
          : this.fromDate;
        const json: any = {
          preference: this.preference,
          date: formattedDate,
          preferenceStart: this.startTime,
          preferenceEnd: this.endTime,
          createdBy: this.getUserId,
          updatedBy: this.getUserId,
        };
        if (this.isModify) {
          json.date = this.holdingData.date;
          json.updatedDate = formattedDate;
          this.$store.dispatch("holdingControls/updateSession", json);
        } else {
          this.$store.dispatch("holdingControls/createSession", json);
        }
        this.handleCancel();
        this.isSubmit = false;
      } else {
        this.isSubmit = true;
      }
    },
    getMinDate() {
      let date = new Date();
      let newMonth = date.getMonth() - 1;
      date.setMonth(newMonth);
      return date.toISOString().slice(0, 10);
    },
    isValidTimeFormat(str: any) {
      const regex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
      return regex.test(str);
    },
    keyPressColonNumeric(event: any) {
      var inp = String.fromCharCode(event.keyCode);
      if (event.keyCode != 13) {
        if (/[:0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
    },
  },
  mounted() {
    if (this.isModify) {
      this.preference = this.holdingData.preference;
      this.fromDate = this.holdingData.date;
      this.startTime = this.holdingData.preferenceStart;
      this.endTime = this.holdingData.preferenceEnd;
    }
  },
});
</script>
