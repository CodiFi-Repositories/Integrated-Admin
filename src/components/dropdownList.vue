<template>
    <Listbox as="div" v-model="selected">
        <ListboxLabel class="pl-2">Select Exchange</ListboxLabel>
        <div class="relative">
            <ListboxButton
                class="relative w-[47%] cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded focus:outline-blue-500 sm:text-sm sm:leading-6">
                <span class="block truncate">{{ selected.name }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-[47%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="person in selectExch" :key="person.id" :value="person"
                        v-slot="{ active, selected }">
                        <li
                            :class="[active ? 'bg-blue-700 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ person.name
                            }}</span>

                            <span v-if="selected"
                                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
     
<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const selectExch = [
    { id: 1, name: 'NSE' },
    { id: 2, name: 'BSE' },
    { id: 3, name: 'NFO' },
    { id: 4, name: 'BFO' },
    { id: 5, name: 'CDS' },
    { id: 6, name: 'BCD' },
]

const selected = ref(selectExch[0])
</script>