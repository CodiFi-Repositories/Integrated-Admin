<template>
  <div class="w-full flex-wrap" v-if="!loader">
    <div
      class="py-2 min-w-full sm:px-3 lg:px-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  grid grid-cols-12 rounded w-[100%]">
      <div class="break-after-column justify-between flex flex-wrap rounded bg-white w-full">
        <div class="pl-[15px] mt-[20px]">
          <p class="text-sm font-bold mb-4 primaryColor">Add New Scrip</p>
        </div>
        <p class="pr-3 mt-4 items-end">
          <button class="text-blue-500" @click="resetFormData">Reset</button>
        </p>
      </div>
      <div
        class="col-span-8 bg-white sm:pl-[20px] md:pr-[130px] md:pl-[130px] lg:pl-[200px] lg:pr-[200px] sm:cols-span-1 md:cols-span-3">
        <div class="h-[80%] mt-2 ">
          <form id="form" class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-3"
            @submit.prevent="summitradio()">
            <div class="pb">
              <label class="primaryColor pl-2" for="">Symbol Name *</label>
              <input type="text" ref="userID" id="logsId" v-model="symbolName" autocomplete="off"
                placeholder="Enter Symbol Name"
                class="border font-light w-full h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />

            </div>


            <div class="h-4">
              <p v-if="symbolName == ''" :hidden="hiddenValue" class="h-4 ml-2 mt-2 text-red-500 text-xs">
                Symbol Name is required*
              </p>
            </div>
            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1 ">
              <div>
                <label class="primaryColor flex justify-start pl-2" for="">Token *</label>
                <input type="number" ref="userID" id="logsId" v-model="tokenValue" autocomplete="off"
                  placeholder="Enter Token"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] justify-left col-span-1">
                  <p v-if="tokenValue == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Token is required*
                  </p>
                </div>
              </div>

              <div>
                <label class="primaryColor flex justify-start pl-2" for="">
                  <div class="pl">Select Exchange *</div>
                </label>
                <Listbox as="div" v-model="selectExchange"
                  class="w-full h-10 rounded col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500 ">
                  <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full h-10 cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded  sm:text-sm sm:leading-6 focus:border-blue-500 hover:border-black focus:caret-blue-500">
                      <span class="block truncate">{{ selectExchange.name }}</span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                        <ListboxOption as="template" v-for="stock in selectExch" :key="stock.id" :value="stock"
                          v-slot="{ active, selectExchange }">
                          <li
                            :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                            <span :class="[selectExchange ? 'font-semibold' : 'font-normal', 'block truncate']">{{
    stock.name
  }}</span>

                            <span v-if="selectExchange"
                              :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                              <CheckIcon class="h-5 w-5 " aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>

            </div>
            <div class="pb gap-4 pt-4 w-full grid md:grid-cols-2 sm:grid-cols-1 ">

              <div class="">
                <label class="text-md font-small  primaryColor flex justify-start pl-2" for="">Strike Price *</label>
                <input type="number" ref="userID" id="logsId" autocomplete="off" v-model="strikeprizeFrom"
                  placeholder="Enter strike price"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] col-span-1">
                  <p v-if="strikeprizeFrom == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Strike price is required*
                  </p>
                </div>
              </div>



              <div class="">
                <label class="text-md font-small  primaryColor flex justify-start pl-2" for="">
                  <div class="pl">Previous Day Close *</div>
                </label>
                <input type="number" ref="userID" id="logsId" autocomplete="off" v-model="pdc"
                  placeholder="Enter Previous Day Close"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="pdc == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    PDC is required*
                  </p>
                </div>
              </div>

            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="text-md font-small  primaryColor flex justify-start ml-2" for="">Lot Size *</label>
                <input type="number" ref="userID" id="logsId" v-model="lotSize" autocomplete="off"
                  placeholder="Enter Lot Size"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] col-span-1">
                  <p v-if="lotSize == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Lot Size is required*
                  </p>
                </div>
              </div>
              <div>
                <label class="text-md font-small  primaryColor flex justify-start ml-2" for="">
                  <div class="pl">Tick Size *</div>
                </label>


                <input type="number" ref="userID" id="logsId" v-model="tickSize" autocomplete="off"
                  placeholder="Enter Tick Size"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] pl-[5px]">
                  <p v-if="tickSize == ''" :hidden="hiddenValue" class="text-[12px] ml-1 mt-1 text-red-500">
                    Tick Size is required*
                  </p>
                </div>
              </div>
            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">

              <div>
                <label class="text-md font-small  primaryColor flex justify-start  ml-2" for="">Freeze Quantity
                  *</label>
                <input type="number" ref="userID" id="logsId" v-model="freezequantity" autocomplete="off"
                  placeholder="Enter Freeze Quantity"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="freezequantity == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    freeze Quantity is required*
                  </p>
                </div>
              </div>
              <div>
                <label class="text-md font-small  primaryColor flex justify-start ml" for="">
                  <div class="pl-2"> Instrument Name *</div>
                </label>
                <input type="text" ref="userID" id="logsId" v-model="instrumentname" autocomplete="off"
                  placeholder="Enter Instrument Name"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="instrumentname == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Instrument Name is required*
                  </p>
                </div>
              </div>
            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="primaryColor flex justify-start ml-2" for="">Token *</label>
                <input type="number" ref="userID" id="logsId" v-model="tokenValue" autocomplete="off"
                  placeholder="Enter Token"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="tokenValue == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Token is required*
                  </p>
                </div>
              </div>
              <div>
                <label class="primaryColor flex justify-start ml-2" for="">
                  <div class="">Select Option Type *</div>
                </label>
                <Listbox as="div" v-model="optiontype"
                  class="w-full h-10 rounded col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500 ">
                  <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full h-10 cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded  sm:text-sm sm:leading-6 focus:border-blue-500 hover:border-black focus:caret-blue-500">
                      <span class="block truncate">{{ optiontype.name }}</span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                        <ListboxOption as="template" v-for="stock in selectOption" :key="stock.id" :value="stock"
                          v-slot="{ active, optiontype }">
                          <li
                            :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                            <span :class="[optiontype ? 'font-semibold' : 'font-normal', 'block truncate']">{{
    stock.name
  }}</span>

                            <span v-if="optiontype"
                              :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                              <CheckIcon class="h-5 w-5 " aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>

            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="primaryColor flex justify-start ml-2" for="">Alter Token *</label>
                <input type="number" ref="userID" id="logsId" v-model="altertoken" autocomplete="off"
                  placeholder="Enter Alter Token"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="altertoken == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                    Alter Token is required*
                  </p>
                </div>
              </div>
              <div>
                <label class="primaryColor flex justify-start ml-2" for="">
                  <div class="pl-2">Select Instrument Type *</div>
                </label>
                <Listbox as="div" v-model="instrumenttype"
                  class="w-full h-10 rounded col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500 ">
                  <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full h-10 cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded  sm:text-sm sm:leading-6 focus:border-blue-500 hover:border-black focus:caret-blue-500">
                      <span class="block truncate">{{ instrumenttype.name }}</span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                        <ListboxOption as="template" v-for="stock in selectInstrument" :key="stock.id" :value="stock"
                          v-slot="{ active, instrumenttype }">
                          <li
                            :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                            <span :class="[instrumenttype ? 'font-semibold' : 'font-normal', 'block truncate']">{{
    stock.name
  }}</span>

                            <span v-if="instrumenttype"
                              :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                              <CheckIcon class="h-5 w-5 " aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>

              </div>
            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="text-md font-small primaryColor flex justify-start ml-2" for="">Formatted instrument
                  Name *</label>
                <input type="text" ref="userID" id="logsId" v-model="formattedinsname" autocomplete="off"
                  placeholder="Enter Formatted Instrument Name"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <p v-if="formattedinsname == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                  Formatted Instrument Name is required*
                </p>
              </div>

              <div>
                <label class="text-md font-small  primaryColor flex justify-start pl-1" for="">
                  <div class="pl-2"> ISIN *</div>
                </label>
                <input type="text" ref="userID" id="logsId" v-model="ISIN" autocomplete="off" placeholder="Enter ISIN"
                  class="border font-light w-full h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <div class="h-[15px] ">
                  <p v-if="ISIN == ''" :hidden="hiddenValue" class="text-[12px] ml-2 text-red-500">
                    ISIN is required*
                  </p>
                </div>
              </div>
            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="text-md font-small  primaryColor flex justify-start ml-2" for="">Trading Symbol
                  *</label>
                <input type="text" ref="userID" id="logsId" autocomplete="off" v-model="tradingsymbol"
                  placeholder="Enter Trading Symbol"
                  class="border font-light h-10 w-full rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <p v-if="tradingsymbol == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                  Trading symbol is required*
                </p>
              </div>
              <div>
                <label class="text-md font-small primaryColor flex justify-start ml" for="">
                  <div class="pl-2">Company Name *</div>
                </label>
                <input type="text" ref="userID" id="logsId" v-model="companyName" autocomplete="off"
                  placeholder="Enter Company Name"
                  class="border font-light h-10 w-full rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
                <p v-if="companyName == ''" :hidden="hiddenValue" class="text-[12px] ml-2 mt-1 text-red-500">
                  Company Name is required*
                </p>
              </div>

            </div>

            <div class="pb gap-4 pt-4 w-full  grid md:grid-cols-2 sm:grid-cols-1">
              <div>
                <label class="primaryColor flex justify-start ml-2 " for="">Expiry Date</label>
                <div class="flex justify-between pb-1 cursor-pointer ">
                  <!-- <input :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'" v-model="expirydate"
                class="border w-[47%] justify-start h-10 rounded focus:outline-0 px-4 text-xs  col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                :max="new Date().toISOString().slice(0, 10)" /> -->
                  <VDatePicker :max-date="today" v-model="expirydate" is-required :popover="popover" :masks="{
    input: 'DD/MM/YYYY', // Updated format here
    modelValue: 'DD/MM/YYYY', // Updated format here
  }" mode="date">
                    <template v-slot="{ togglePopover, inputValue, inputEvents }">
                      <div class="flex items-center justify-between h-10 w-full  border rounded ">
                        <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
                          class="w-full h-full p-2 text-xs outline-none cursor-pointer" readonly />
                        <button type="button"
                          class="flex pr-3 justify-center items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                          @click="() => togglePopover()">
                          <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                        </button>
                      </div>
                    </template>
                  </VDatePicker>

                  <!-- <select v-model="exchangesegment"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500">
                <option class="selectExchangeColor" value="nse_fo" selected>
                  nse_fo
                </option>


                <option value="cde_fo">cde_fo</option>

              </select> -->





                </div>

              </div>
              <div>
                <label class="primaryColor flex justify-start ml-2" for="">
                  <div class="">Select Exchange Segment *</div>

                </label>
                <Listbox as="div" v-model="exchangesegment"
                  class="w-full h-10 rounded col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500 ">
                  <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full  h-10 cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded  sm:text-sm sm:leading-6 focus:border-blue-500 hover:border-black focus:caret-blue-500">
                      <span class="block truncate">{{ exchangesegment.name }}</span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm">
                        <ListboxOption as="template" v-for="stock in exchSegment" :key="stock.id" :value="stock"
                          v-slot="{ active, exchangesegment }">
                          <li
                            :class="[active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                            <span :class="[exchangesegment ? 'font-semibold' : 'font-normal', 'block truncate']">{{
    stock.name
  }}</span>

                            <span v-if="exchangesegment"
                              :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                              <CheckIcon class="h-5 w-5 " aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>

              </div>
            </div>

            <div class="pb pt-4 w-full grid md:grid-cols-1 sm:grid-cols-1">
              <label class="text-md font-small mb-1 primaryColor flex justify-start ml-1" for="">
                <div class="pl-2">Week Tag</div>
              </label>
              <div class=" columns-2 flex justify-start gap-x-2">

                <label class=" pt-2 align-center cursor-pointer">
                  <input type="radio" name="weektag" v-model="weektag" value="W"
                    class="display-block w-[30px] p-3 cursor-pointer">W</label>
                <label class=" pt-2 align-center cursor-pointer">
                  <input type="radio" name="weektag" v-model="weektag" value="M"
                    class="display-block w-[30px] p-3 cursor-pointer">M</label>
                <label class=" pt-2 align-center cursor-pointer">
                  <input type="radio" name="weektag" v-model="weektag" value="Y"
                    class="cursor-pointer display-block w-[30px] p-3">
                  Y</label>
              </div>
            </div>



            <div class="grid grid-cols-5 pb-4 pt-4">
              <div>
                <div class="flex items-center justify-end pb-4 pt-4 pr-2">
                  <input v-model="buttonCondition" id="default-radio-1" type="checkbox" value="" autocomplete="off"
                    name="default-radio"
                    class=" cursor-pointer w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <div class="col-span-3 pt-3">
                <label for="default-radio-1"
                  class="text-left text-xs text-red-500 dark:text-gray-300 cursor-pointer">Use
                  with
                  caution-reload contract/script cache</label>
              </div>
              <div class="flex rounded justify-end pt-2">
                <button :disabled="!buttonCondition"
                  :class="!buttonCondition ? '' : 'negativeBackground hover:negativeBackground text-white'"
                  class="h-10 w-[120px] border rounded " @click="reset_confirmation()">
                  Reset
                </button>
              </div>
            </div>
          </form>
          <div class="h-[14px]"></div>
        </div>
      </div>
      <div class="break-before-column col-span-2 bg-white flex align-top rounded justify-end">

      </div>
    </div>
    <div class="h-full flex items-top justify-end p-4 w-[100%]">
      <div class="mr-3 mt-1">
        <input v-on:click="resetFormData"
          class="bg-white-500 hover:bg-black-700 text-black border border-black  h-10 w-[120px] cursor-pointer rounded"
          type="submit" autocomplete="off" value="Cancel" />
      </div>
      <div class="mr-1 mt-1">
        <input v-on:click="validateFileValue()" autocomplete="off"
          class="negativeBackground hover:negativeBackground text-white h-10 w-[120px] cursor-pointer rounded"
          type="submit" value="Submit" />
      </div>
    </div>

    <reset_confirmation v-if="resetdialogue == true"></reset_confirmation>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState, mapGetters } from "vuex";
import reset_confirmation from "../contracts/reset_confirmation.vue";
import dropdownList from "../../components/dropdownList.vue"
import Icons from "../../components/icons.vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
export default defineComponent({
  name: "add-new-scrip",
  setup() {
    const symbolName = ref("");
    const tokenValue = ref("");

    const strikeprizeFrom = ref("");
    const pdc = ref("");

    const freezequantity = ref("");
    const formattedinsname = ref("");

    // const instrumenttype = ref('OPTIDX');
    // const exchangesegment = ref('nse_fo');
    const altertoken = ref('');
    const lotSize = ref("");
    const tickSize = ref("");
    const ISIN = ref("");
    const instrumentname = ref("");
    const tradingsymbol = ref("");
    const companyName = ref("");
    const buttonCondition = ref(false);
    const buttonColor = ref("green");
    const errorMessage = ref("");
    const hiddenValue = ref(true);
    const validTab = ref("");
    const weektag = ref('');
    const weektagvalid = ref('');
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const today = new Date();
    const expirydate = ref(today);
    const toDate = ref(today);
    const maxDateToDate = ref("");
    let prevFromDate = ref(today);
    let prevToDate = ref(today);
    const selectExch = [
      { id: 1, name: 'NSE' },
      { id: 2, name: 'BSE' },
      { id: 3, name: 'NFO' },
      { id: 4, name: 'BFO' },
      { id: 5, name: 'CDS' },
      { id: 6, name: 'BCD' },
    ];
    const selectExchange = ref(selectExch[0]);
    const selectOption = [
      { id: 1, name: 'CE' },
      { is: 2, name: 'PE' }
    ];
    const optiontype = ref(selectOption[0]);
    const selectInstrument = [
      { id: 1, name: "OPTIDX" },
      { id: 2, name: "FUTCUR" },
      { id: 3, name: "FUTCOM" },
      { id: 4, name: "OPTCOM" },
      { id: 5, name: "OPTCUR" },
      { id: 6, name: "OPTSTK" },
      { id: 7, name: "FUTSTK" },
      { id: 8, name: "FUTIDX" },
    ];
    const instrumenttype = ref(selectInstrument[0]);
    const exchSegment = [
      { id: 1, name: "nse_fo" },
      { id: 2, name: "cde_fo" },
    ];

    const exchangesegment = ref(exchSegment[0]);



    return {
      buttonCondition,
      buttonColor,
      symbolName,
      tokenValue,
      selectExchange,
      strikeprizeFrom,
      pdc,
      lotSize,
      freezequantity,
      optiontype,
      formattedinsname,
      instrumentname,
      instrumenttype,
      exchangesegment,
      altertoken,
      ISIN,
      tickSize,
      tradingsymbol,
      companyName,
      errorMessage,
      hiddenValue,

      validTab,
      weektag,
      weektagvalid,
      popover,
      today,
      expirydate,
      toDate,
      maxDateToDate,
      prevFromDate,
      prevToDate,
      selectExch,
      selectOption,
      selectInstrument,
      exchSegment,
      // active,



    };

  },
  components: {
    reset_confirmation, Icons, dropdownList, Listbox, ListboxButton, ListboxOption, ListboxOptions, ChevronUpDownIcon, CheckIcon,
  },
  methods: {
    ///Check if all the input fields are filled.
    async submitHandle() {
      this.hiddenValue = true;

      let json = {
        symbol: this.symbolName.toUpperCase(),
        token: this.tokenValue,
        exch: this.selectExchange.name.toString().toUpperCase(),
        strike_price: this.strikeprizeFrom,
        trading_symbol: this.tradingsymbol.toUpperCase(),
        pdc: this.pdc,
        freeze_qty: this.freezequantity,
        instrument_name: this.instrumentname.toUpperCase(),
        formatted_ins_name: this.formattedinsname.toUpperCase(),
        isin: this.ISIN,
        instrument_type: this.instrumenttype.name.toString().toUpperCase(),
        alter_token: this.altertoken,
        exchange_segment: this.exchangesegment.name,
        expiry_date: this.expirydate.toDateString().replace("T", " "),
        week_tag: this.weektag,

        option_type: this.optiontype.name.toString().toUpperCase(),
        lot_size: this.lotSize,
        tick_size: this.tickSize,

        company_name: this.companyName.toUpperCase(),
      };
      await this.$store.dispatch("accessLog/sendNewScript", json).then((res: any) => {
        if (res) {
          this.resetFormData();
        }
      });

    },
    validateFileValue() {
      this.hiddenValue = false;
      if (
        this.symbolName == "" ||
        this.tokenValue == "" ||
        // this.selectExchange == "" ||
        // this.exchangesegment == "" ||

        this.pdc == "" ||
        // this.instrumenttype == "" ||
        this.tickSize == "" ||
        this.formattedinsname == "" ||
        this.ISIN == "" ||
        this.instrumentname == "" ||
        this.companyName == "" ||
        this.tradingsymbol == ""
      ) {
        this.errorMessage = "You must add File here to submit";
      } else {
        this.errorMessage = "All files added";
        this.submitHandle();
      }
    },

    summitradio() {
      if (this.weektag) {
        this.weektagvalid = this.weektag;
        this.submitHandle();

      }
    },

    reset_confirmation() {
      this.$store.commit("cMaster/setresetdialogue", true);
    },

    resetFormData() {
      (this.symbolName = ""),
        (this.tokenValue = ""),
        (this.selectExchange = this.selectExch[0]),
        (this.exchangesegment = this.exchSegment[0]),
        (this.strikeprizeFrom = ""),
        (this.pdc = ""),
        (this.lotSize = ""),
        (this.freezequantity = ""),
        (this.formattedinsname = ""),
        (this.ISIN = ""),
        (this.weektag = ""),
        (this.optiontype = this.selectOption[0]),
        (this.instrumentname = ""),
        (this.instrumenttype = this.selectInstrument[0]),
        (this.tickSize = ""),
        (this.companyName = ""),
        (this.tradingsymbol = "")
    },


    setCurrentDatetime() {
      this.expirydate = new Date()

    },

    dateFormatter(date: any) {
      if (!date) return null;

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  computed: {
    ...mapState("cMaster", ["resetdialogue"]),
    ...mapGetters("cMaster", { loader: "getLoader" }),
    getTime() {
      let arr = [];
      for (let i = 1; i <= 24; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  beforeMount() {
    this.setCurrentDatetime();

  },
  // created() {
  //   this.$store.dispatch(this);
  // },
});
</script>
<style>
.svgColor {
  fill: rgb(0, 150, 255);
}

.selectExchangeColor {
  color: #7f7f7f;
}
</style>
