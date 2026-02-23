<style>
select option {
  max-width: 100px !important;
  white-space: normal !important;
}
</style>
<template>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-10 " @close="sentRemarks('close')" >
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel
                  class="w-full max-w-lg transform rounded radius p-6 text-left align-middle bg-white">
                  <DialogTitle as="h3" class="text-base pb-2 font-medium leading-6 primaryColor">
                   <div class="grid">
                    <div >
                      <Listbox as="div" v-model="status">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Status</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white min-h-[32px] py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <span class="block ">{{ status }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="(person , id) in statusList" :key="id" :value="person" v-slot="{ active, remarks }">
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
              <span :class="[status ? 'font-semibold' : 'font-normal', 'block ']">{{ person }}</span>

              <span v-if="remarks" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
  </div>
                    <label for="reject_content" id="reject_content_label">Remarks</label>
                      <textarea rows="5" name="" id="reject_content" class="w-full border rounded my-2 p-2" v-model="remarks" autofocus></textarea>

    
                   </div>
                  </DialogTitle>
  
                  <div class="mt-8 flex justify-end gap-2">
                    <button type="button" class="negativeBackground text-white h-10  w-[120px] cursor-pointer rounded text-xs" id="logout_btn" @click="sentRemarks('call')">
                      <span v-if="!rejectionLoader">Confirm</span>
                      <svg v-else
            class="animate-spin h-5 w-5 text-white flex mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
                    </button>
                    <button type="button" class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded" id="logout_cancel_btn" @click="sentRemarks('close')" >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { mapGetters, mapState } from 'vuex'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
export default {
  emits:['send-remarks'],
  name: 'reject-dialog',
  components:{
      Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon
  },
  data(){
    return {
      remarks : '',
      status: ''
    }
  },
  props:{
    isOpen: {
      type: Boolean
    },
    actualData: {
        type : Object
    }
  },
  computed: {
        ...mapState('tradecall', ['statusList', 'rejectionLoader'])
    },
  methods:{
    sentRemarks(key){
      let isOpen = false
      key == 'close' ? this.remarks = '' : ''
      key == 'call' && !this.remarks ? isOpen = true : ''
      this.$emit('send-remarks', {remarks:  this.remarks, status: this.status, isOpen: isOpen})
    }
  },
  mounted(){ this.remarks = ''
  this.status = this.actualData.status
  }
}
</script>