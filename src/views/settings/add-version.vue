<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <form @submit.prevent="handleSubmit()">
                        <div>
                            <div class="">
                                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add version</h3>
                                <div class="mt-2 ">
                                    <label class="ml-2" for="Version ID">Version ID</label>
                                    <input placeholder="Enter version number" type="text" v-model="versionID" class="border w-full h-10 rounded focus:outline-0 px-4">

                                    <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                                        <span v-if="isSubmit && versionID == ''">Version number should be Eg. 1.0.1</span>
                                    </div>
                                </div>

                                <div class="">
                                    <Listbox as="div" v-model="os">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">OS</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <span class="block truncate">{{ os }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="(person , id) in osTypeList" :key="id" :value="person" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ person }}</span>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
                                   
                                </div>

                                <div class="mt-4">
                                    <Listbox as="div" v-model="deviceType">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">OS</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <span class="block truncate">{{ deviceType.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="(person , id) in deviceTypeList" :key="id" :value="person" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ person.name }}</span>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 flex gap-2">
                            <button type="button" class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer" @click="handleCancel()">Cancel</button>
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer" @click="handleSubmit()">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
export default defineComponent({
    setup() {
        const versionID = ref('')
        const os = ref('Android')
        const deviceType = ref({name:'Mobile', val:'MOB'})
        const osTypeList = ref(['Android', 'IOS'])
        const deviceTypeList = ref([{name:'Mobile', val:'MOB'}])
        const isSubmit = ref(false)
        return { versionID, os, deviceType,osTypeList,deviceTypeList,isSubmit }
    },
    props: ['cData'],
    components:{
        Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,CheckIcon, ChevronUpDownIcon
    },
    methods: {
        handleCancel() {
            this.$store.commit('version/setIsAddVersionDialog', false)
        },
        async handleSubmit() {
            
            let json = {
                "version": this.versionID,
                "type": this.deviceType.val,
                "os": this.os,
                "updateAvailable": "0"
            }
            if(this.versionID){
await this.$store.dispatch('version/addMobileVersion', json)
            this.handleCancel();
            this.isSubmit = false
            }else {
                this.isSubmit = true
            }
            
        }
    },
})
</script>

