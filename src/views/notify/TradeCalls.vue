<template>
  <div class="m-4 px-4 py-6 bg-white rounded border">
    <div class="w-full gap-10 max-w-[1024px] mx-auto">
      <p class="text-sm font-bold mb-4 primaryColor">
        {{ editaddtrade ? "Edit" : "Add" }}
      </p>
      <section class="w-full mb-4 relative">
        <div
          class="flex items-center border rounded-full py-2 px-4 max-w-2xl justify-center mx-auto"
          :class="{
            'bg-gray-100 cursor-not-allowed': tableshowdata,
            'bg-gray-50': !tableshowdata,
          }"
        >
          <span v-html="searchSvg"></span>
          <input
            type="search"
            :disabled="tableshowdata ? true : false"
            v-model="search"
            placeholder="Search and Add Instruments"
            class="border-none outline-none placeholder:text-xs pl-1 w-full bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            @input="searchInput()"
          />
        </div>
        <p v-if="scripErrorMsg" class="text-red-600 text-xs flex">
          {{ scripErrorMsg }}
        </p>
        <div
          v-if="search.length > 0"
          class="absolute lg:left-[17%] z-10 w-full bg-white border rounded-lg overflow-y-auto mt-2 max-h-[350px] max-w-2xl mx-auto"
        >
          <ul class="overflow-auto">
            <li
              v-for="(item, index) in searchList"
              :key="index"
              class="flex justify-between px-2 py-3 border-b cursor-pointer hover:bg-slate-50"
              @click="
                searchRowClick({ exch: item.exchange, token: item.token })
              "
            >
              <span class="text-sm">{{ item.formattedInsName }}</span>
              <button
                class="px-2 py-1 text-[11px] rounded w-[38px] text-white"
                :class="[
                  item.exchange == 'NSE'
                    ? 'bg-green-500'
                    : item.exchange == 'BSE'
                    ? 'bg-red-500'
                    : 'bg-[#a3a7ab]',
                ]"
              >
                {{ item.exchange }}
              </button>
            </li>
          </ul>
        </div>

        <div class="border rounded-lg mt-4" v-if="tableshowdata">
          <table class="w-full">
            <thead class="">
              <tr>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-left border-r"
                >
                  ScripName
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-center border-r"
                >
                  Transaction Type
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-center border-r"
                >
                  Order Type
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-center border-r"
                >
                  Product Type
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Qty
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Price
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Trg.Price
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Stoploss
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-[14px] border-t">
                <td class="whitespace-nowrap px-3 text-left border-r">
                  {{
                    tableshowdata.formattedInsName ||
                    tableshowdata.tradingSymbol ||
                    "NA"
                  }}
                  <span class="text-xs">{{ tableshowdata.exchange }}</span>
                </td>
                <td class="whitespace-nowrap px-3 text-center border-r capitalize">
                  {{ tableshowdata.transType }}
                </td>
                <td class="whitespace-nowrap px-3 text-center border-r">
                  {{ tableshowdata.orderType || "-" }}
                </td>
                <td class="whitespace-nowrap px-3 text-center border-r">
                  {{ tableshowdata.product || "-" }}
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ tableshowdata.qty || "0" }}
                </td>
                <td  class="whitespace-nowrap px-3 text-right border-r">
                  <p v-if="tableshowdata.priceUpperBound && !tableshowdata.priceLowerBound">
                     {{ tableshowdata.priceUpperBound  }}
                 
                  </p>
                  <p v-else-if="tableshowdata.priceUpperBound && tableshowdata.priceLowerBound && getIsRange">
                    {{ tableshowdata.priceLowerBound }} 
                  
                     <span
                    v-if="
                      tableshowdata.priceUpperBound &&
                      tableshowdata.priceUpperBound != '0'
                    "
                  >
                    to {{ tableshowdata.priceUpperBound }}
                  </span>
                  </p>
                  <p v-else-if="!tableshowdata.priceUpperBound && tableshowdata.priceLowerBound">{{ tableshowdata.priceLowerBound }}</p>
                    <p v-else-if="tableshowdata.priceUpperBound && tableshowdata.priceLowerBound && !getIsRange">
                    {{ tableshowdata.priceLowerBound }} 
                  </p>
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ tableshowdata.targetUpperBound ? tableshowdata.targetUpperBound : tableshowdata.targetLowerBound ? tableshowdata.targetLowerBound : '-' }}
                  <span v-if="tableshowdata.targetUpperBound">
                    <!-- to {{ tableshowdata.targetUpperBound }} -->
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  <!-- {{ tableshowdata.stoplossLowerBound }} -->
                     {{ tableshowdata.stoplossUpperBound ? tableshowdata.stoplossUpperBound : tableshowdata.stoplossLowerBound ? tableshowdata.stoplossLowerBound : '-' }}
                  <span v-if="tableshowdata.stoplossUpperBound">
                    <!-- to {{ tableshowdata.stopLossUpperBound }} -->
                  </span>
                </td>
                <td class="text-center whitespace-nowrap px-3 cursor-pointer">
                  <div class="flex gap-4 justify-center">
                    <a @click="editScrip(tableshowdata)">
                      <icons :name="'editicon'" />
                    </a>
                    <a @click="tableshowdata = ''">
                      <icons :name="'delete'" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="my-3 w-1/2" v-if="editaddtrade">
          <div class="text-sm pb-1">Status</div>
          <select
            class="bg-[#F1F3F6] w-1/3 h-8 rounded text-xs font-medium flex items-center justify-center"
            name="statusSelect"
            id="statusSelect"
            v-model="statusSelect"
          >
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
        </div>
        <div class="my-6 w-1/2" v-if="editaddtrade & (statusSelect == 'close')">
          <div class="text-sm pb-1">Remarks</div>
          <textarea
            type="text"
            v-model="remarks"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888]"
            placeholder="Enter Remarks"
            rows="4"
          >
          </textarea>
        </div>

        <!-- <div v-else class="text-center py-8">No scrips added</div> -->
      </section>

      <div class="border-b border-[#e1e1e1] my-8" v-if="tableshowdata"></div>

      <section
        v-if="!editaddtrade"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div class="flex flex-col">
          <div class="pb-3 text-sm">User Type</div>
          <div class="flex gap-8">
            <section class="flex items-center gap-2">
              <input
                id="allRadio"
                type="radio"
                v-model="userType"
                class="h-4 w-4 cursor-pointer accent-blue-700"
                value="all"
                @change="userErrorMsg = userId = ''"
              />
              <label
                for="allRadio"
                class="block text-xs font-medium leading-6 text-[#888] cursor-pointer"
              >
                All
              </label>
            </section>
            <section class="flex items-center gap-2">
              <input
                id="indRadio"
                type="radio"
                v-model="userType"
                class="h-4 w-4 cursor-pointer pl-4 accent-blue-700"
                value="individual"
                @change="userErrorMsg = userId = ''"
              />
              <label
                for="indRadio"
                class="block text-xs font-medium leading-6 text-[#888] cursor-pointer"
              >
                Individual
              </label>
            </section>
          </div>
        </div>
        <div>
          <div class="mb-4" v-if="userType == 'individual'">
            <div class="text-sm pb-1">
              User ID
              <span class="text-[#888] ml-2"
                >( Ex: 10234,12049,76543 )
                <span class="text-red-600">*</span></span
              >
            </div>
            <input
              type="text"
              v-model="userId"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter User ID"
              @input="
                userId = userId.toUpperCase();
                userErrorMsg = '';
              "
            />
            <div class="min-h-[14px]">
              <span v-if="userErrorMsg" class="text-xs text-red-600">
                {{ userErrorMsg }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm pb-1">Title</div>
          <input
            type="text"
            v-model="titleName"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
            placeholder="Enter Title Name"
          />
        </div>
        <div class="flex flex-col">
          <div class="text-sm pb-1">
            Basket Name <span class="text-red-600">*</span>
          </div>
          <input
            type="text"
            v-model="basketName"
            @input="basketErrMsg = ''"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
            placeholder="Enter Basket Name"
          />
          <div class="min-h-[14px]">
            <span v-if="basketErrMsg" class="text-xs text-red-600">{{
              basketErrMsg
            }}</span>
          </div>
        </div>
        <div class="w-full">
          <div class="text-sm pb-1">Short Description</div>
          <textarea
            type="text"
            v-model="shortDescription"
            @input="shortDesErrMsg = ''"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888]"
            placeholder="Enter Short Description"
            rows="4"
          >
          </textarea>
          <div class="min-h-[14px]">
            <span v-if="shortDesErrMsg" class="text-xs text-red-600">{{
              shortDesErrMsg
            }}</span>
          </div>
        </div>
        <div class="w-full">
          <div class="text-sm pb-1">Long Description</div>
          <textarea
            type="text"
            v-model="longDescription"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] ml-0"
            placeholder="Enter Long Description"
            rows="4"
          >
          </textarea>
        </div>
        <div class="mb-6 w-full">
          <div class="text-sm pb-1">Remarks</div>
          <textarea
            type="text"
            v-model="remarks"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888]"
            placeholder="Enter Remarks"
            rows="4"
          >
          </textarea>
        </div>
        <div class="mb-6 w-full">
          <div>
            <div class="text-sm pb-1">
              Select Channel <span class="text-red-600">*</span>
            </div>
            <Listbox v-model="sendPush" multiple>
              <div class="relative">
                <ListboxButton
                  class="h-10 flex items-center justify-between w-full border border-[#DCDDDEB2] rounded p-3 text-secondaryColor relative"
                >
                  <div
                    class="flex items-center text-xs truncate font-normal text-[#888]"
                  >
                    {{
                      sendPush && sendPush.length > 0
                        ? sendPush.toString()
                        : "Select Option"
                    }}
                  </div>
                  <icons :name="'downArrow'" class="text-secondaryColor" />
                </ListboxButton>
                <ListboxOptions
                  class="absolute bottom-[50px] mt-1 w-full bg-white shadow-lg rounded-md py-1 overflow-auto focus:outline-none text-sm z-10"
                >
                  <ListboxOption
                    v-for="person in pushNotifyList"
                    :value="person"
                    class="cursor-pointer flex select-none relative py-2 pl-2 pr-4 hover:bg-gray-100 text-sm"
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      class="mr-2 p-2 cursor-pointer"
                      :checked="
                        (sendPush && sendPush.includes(person)) ||
                        sendPush.includes('All')
                          ? true
                          : false
                      "
                      @input="sendPushErrorMsg = ''"
                    />
                    <span
                      class="block truncate"
                      :class="
                        sendPush && sendPush.includes(person)
                          ? 'font-semibold'
                          : 'font-normal'
                      "
                    >
                      {{ person }}
                    </span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
            <div class="my-2 w-full">
              <div v-if="sendPush.length > 0">
                <!-- <div class=" pb-1 text-sm whitespace-nowrap">Push Notification Title</div> -->
                <input
                  type="text"
                  v-model="pushNotification"
                  @input="sendPushErrorMsg = ''"
                  class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-8"
                  placeholder="Enter Push Notification Title"
                />
              </div>
            </div>
            <p
              v-if="sendPushErrorMsg"
              class="min-h-[14px] text-red-600 text-xs"
            >
              {{ sendPushErrorMsg }}
            </p>
          </div>
        </div>
        <div class="flex mb-6 space-x-6 w-full">
          <div class="w-1/2">
            <div v-if="banks.length > 0">
              <label class="block text-sm pb-1"
                >Category <span class="text-red-600">*</span></label
              >
              <div class="relative">
                <Listbox v-model="Category" @update:modelValue="handleChange">
                  <div class="relative">
                    <ListboxButton
                      class="h-10 flex items-center justify-between w-full border border-[#DCDDDEB2] rounded p-3 text-secondaryColor relative"
                    >
                      <div class="flex items-center">
                        <span class="text-xs font-normal text-[#888]">
                          {{ Category || "Select Category" }}
                        </span>
                      </div>
                      <icons :name="'downArrow'" class="text-secondaryColor" />
                    </ListboxButton>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enter-from="transform scale-95 opacity-0"
                      enter-to="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leave-from="transform scale-100 opacity-100"
                      leave-to="transform scale-95 opacity-0"
                    >
                      <ListboxOptions
                        class="absolute mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm z-10"
                      >
                        <ListboxOption
                          v-for="(bank, index) in banks"
                          :key="index"
                          :value="bank"
                          @click="Category != 'Others' ? (otherVal = '') : ''"
                          @change="cataOtherErrMsg = ''"
                          class="cursor-pointer select-none relative py-2 pl-2 pr-4 hover:bg-gray-100 text-left"
                        >
                          <span
                            class="block truncate"
                            :class="
                              Category === bank
                                ? 'font-semibold'
                                : 'font-normal'
                            "
                          >
                            {{ bank }}
                          </span>
                        </ListboxOption>
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
                <input
                  id="reject_content"
                  autocomplete="off"
                  class="w-full border rounded my-2 p-2 text-xs text-[#888] h-8"
                  v-if="Category === 'Others'"
                  v-model="otherVal"
                  @input="cataOtherErrMsg = ''"
                />
                <div class="min-h-[14px]">
                  <span v-if="cataOtherErrMsg" class="text-xs text-red-600">{{
                    cataOtherErrMsg
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div v-if="SubCategoryoption.length > 0">
              <label class="block text-sm pb-1"
                >Sub Category <span class="text-red-600">*</span></label
              >
              <div class="relative">
                <Listbox
                  v-model="SubCategory"
                  @update:modelValue="handleSubTabChange"
                >
                  <div class="relative">
                    <ListboxButton
                      class="h-10 flex items-center justify-between w-full border border-[#DCDDDEB2] rounded p-3 text-secondaryColor relative"
                    >
                      <div class="flex items-center">
                        <!-- Bank Icon -->
                        <span class="text-xs font-normal text-[#888]">
                          {{ SubCategory || "Select Sub Category" }}
                        </span>
                      </div>
                      <!-- Chevron Icon -->
                      <icons :name="'downArrow'" class="text-secondaryColor" />
                    </ListboxButton>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enter-from="transform scale-95 opacity-0"
                      enter-to="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leave-from="transform scale-100 opacity-100"
                      leave-to="transform scale-95 opacity-0"
                    >
                      <ListboxOptions
                        class="absolute mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm z-10"
                      >
                        <ListboxOption
                          v-for="(subCat, index) in SubCategoryoption"
                          :key="index"
                          @click="
                            SubCategory != 'Others'
                              ? (othersCategory = '')
                              : '';
                            otherSubCataErrMsg = '';
                          "
                          :value="subCat"
                          class="cursor-pointer select-none relative py-2 pl-2 pr-4 hover:bg-gray-100"
                        >
                          <span
                            class="block truncate"
                            :class="
                              SubCategory === subCat
                                ? 'font-semibold'
                                : 'font-normal'
                            "
                          >
                            {{ subCat }}
                          </span>
                        </ListboxOption>
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
                <input
                  id="reject_content"
                  autocomplete="off"
                  class="w-full border rounded my-2 p-2 text-xs text-[#888] h-8"
                  v-if="SubCategory === 'Others'"
                  v-model="othersCategory"
                  @input="otherSubCataErrMsg = ''"
                />
                <span v-if="otherSubCataErrMsg" class="text-xs text-red-600">{{
                  otherSubCataErrMsg
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mb-6 space-x-6 w-full">
          <div class="w-1/2">
            <div v-if="SpeclizationTagoption.length > 0">
              <label class="block text-sm pb-1">Speclization Tag</label>
              <div class="relative">
                <Listbox v-model="SpeclizationTag">
                  <div class="relative">
                    <ListboxButton
                      class="h-10 flex items-center justify-between w-full border border-[#DCDDDEB2] rounded p-3 text-secondaryColor relative"
                    >
                      <div class="flex items-center">
                        <span class="text-xs font-normal text-[#888]">
                          {{ SpeclizationTag || " Select SpeclizationTag" }}
                        </span>
                      </div>
                      <icons :name="'downArrow'" class="text-secondaryColor" />
                    </ListboxButton>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enter-from="transform scale-95 opacity-0"
                      enter-to="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leave-from="transform scale-100 opacity-100"
                      leave-to="transform scale-95 opacity-0"
                    >
                      <ListboxOptions
                        class="absolute mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm z-10"
                      >
                        <ListboxOption
                          v-for="(spectag, index) in SpeclizationTagoption"
                          :key="index"
                          @click="
                            SpeclizationTag = spectag;
                            SpeclizationTag != 'Others'
                              ? (otherSpeclizationTag = '')
                              : '';
                            spacizationOtherErrMsg = '';
                          "
                          class="cursor-pointer select-none relative py-2 pl-2 pr-4 hover:bg-gray-100"
                        >
                          <span
                            class="block truncate"
                            :class="
                              SpeclizationTag === spectag
                                ? 'font-semibold'
                                : 'font-normal'
                            "
                          >
                            {{ spectag }}
                          </span>
                        </ListboxOption>
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
                <input
                  id="reject_content"
                  autocomplete="off"
                  class="w-full border rounded my-2 p-2 text-xs text-[#888] h-8"
                  v-if="SpeclizationTag == 'Others'"
                  v-model="otherSpeclizationTag"
                  @input="spacizationOtherErrMsg = ''"
                />
                <div class="min-h-[14px]">
                  <span
                    v-if="spacizationOtherErrMsg"
                    class="text-xs text-red-600"
                    >{{ spacizationOtherErrMsg }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <label class="primaryColor pb-1 text-sm"
              >Validity Date <span class="text-red-600">*</span></label
            >
            <VDatePicker
              :min-date="today"
              v-model="fromDate"
              is-required
              :popover="popover"
              :masks="{
                input: 'DD/MM/YYYY',
                modelValue: 'DD/MM/YYYY',
              }"
              mode="date"
            >
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div
                  class="flex items-center justify-between h-10 border rounded cursor-pointer p-2"
                >
                  <input
                    :value="inputValue"
                    placeholder="DD/MM/YYYY"
                    v-on="inputEvents"
                    class="h-9 ml-1 outline-none cursor-pointer placeholder:text-xs text-xs text-[#888]"
                    readonly
                  />
                  <button
                    type="button"
                    class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                    @click="() => togglePopover()"
                  >
                    <icons
                      :name="'datePicker'"
                      class="w-5"
                      :color="'#ffffff'"
                    />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-sm pb-1">Research Team</div>
          <input
            type="text"
            v-model="researchTeam"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
            placeholder="Enter Research Team"
          />
        </div>
      </section>
    </div>

    <div class="flex justify-end mt-6 gap-4">
      <button
        :disabled="btnLoader"
        type="submit"
        class="bg-[#005CB9] disabled:opacity-75 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded text-xs"
        @click="validationForm()"
      >
        <span v-if="!getApiLoader">Submit</span>
        <btnLoader v-else />
      </button>
      <div>
        <button
          class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded"
          @click="handleCancelClick"
        >
          Cancel
        </button>
      </div>
    </div>
    <orderwindow
      v-if="showorderwindow"
      :scripData="tableshowdata"
      :isModify="edit == 'true' && tableshowdata != ''"
      :isOpen="showorderwindow"
      @handleClose="getdata"
    />
    <preview
      :createParam="createParam"
      :isModify="edit == 'true'"
      @cancel="handleCancelClick"
    />
  </div>
</template>

<script>
import orderwindow from "./Order_window.vue";
import preview from "./preview.vue";
import { mapGetters, mapState } from "vuex";
import { defineComponent, ref } from "vue";
import Icons from "../../components/icons.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

export default defineComponent({
  emits: ["close"],

  components: {
    orderwindow,
    Icons,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    preview,
  },
  data() {
    return {
      userType: "all",
      userId: "",
      basketName: "Research Call",
      fromDate: new Date().toISOString().substr(0, 10),
      sendPush: [],
      pushNotification: "",
      search: "",
      btnLoader: false,
      tableshowdata: "",
      Category: "Equity",
      SubCategory: "Intraday",
      remarks: "",
      SpeclizationTag: "",
      popover: {
        visibility: "click",
        placement: "bottom-start",
      },

      banks: ["Equity", "Derivatives", "Commodity", "Others"],
      equityOption: ["Intraday", "Delivery", "BTST", "MTF", "Weekly"],
      equityOptionAll: [
        "Intraday",
        "Delivery",
        "BTST",
        "MTF",
        "Weekly",
        "Others",
      ],
      derivativeOption: ["Stock", "Index", "Strategies"],
      SubCategoryoption: [],
      SpeclizationTagoption: [],

      speclizationTagForIndex: [
        "Positional",
        "ABM Maverick Stock",
        "Pick Of the Week",
        "Pick Of the Month",
        "Special Trade",
        "Option Portfolio",
        "Others",
      ],
      speclizationTagForAll: [
        "Positional",
        "ABM Maverick Stock",
        "Pick Of the Week",
        "Pick Of the Month",
        "Special Trade",
        "Others",
      ],
      speclizationTagForDel: [
        "ABM Maverick Stock",
        "Pick Of the Week",
        "Pick Of the Month",
        "Special Trade",
        "Others",
      ],
      speclizationTagForStock: ["T20 Stock Option", "Others"],
      speclizationTagForStrategies: [
        "Stock Option Spread",
        "Index Option Spread",
        "Stock Combo Strategy",
        "Index Combo Strategy",
        "Others",
      ],
      otherVal: "", // Store the "Others" value
      othersCategory: "",
      today: new Date().toISOString().substr(0, 10),
      otherSpeclizationTag: "",
      titleName: "",
      shortDescription: "",
      longDescription: "",
      pushNotifyList: ["All", "Push Notification", "SMS", "E-mail", "Whatsapp"],
      userErrorMsg: "",
      basketErrMsg: "",
      shortDesErrMsg: "",
      cataOtherErrMsg: "",
      pushNotiyTitleErrMsg: "",
      spacizationOtherErrMsg: "",
      otherSubCataErrMsg: "",
      searchSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-[#888]">
  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
</svg>`,
      isOpen: false,
      createParam: {},
      edit: "false",
      statusSelect: "open",
      isDataModified: false,
      researchTeam: "",
      sendPushErrorMsg: "",
      scripErrorMsg: "",
    };
  },
  computed: {
    ...mapState("tradecall", [
      "searchList",
      "scripsArray",
      "showorderwindow",
      "editaddtrade",
    ]),
    ...mapGetters("tradecall", [
      "getContractInfo",
      "getPreviewData",
      "getApiLoader",
      'getIsRange'
    ]),

    capitalize(val) {
      return val ? val.charAt(0).toUpperCase() + val.slice(1) : "";
    },
  },
  watch: {
    search: function (newValue) {
      newValue = newValue.trim();
      clearTimeout(this.timerId);
      if (newValue && newValue.length > 1) {
        this.timerId = setTimeout(() => {
          this.callSearch(newValue);
        }, 500);
      }
    },
    tableshowdata: function (oldValue, newValue) {
      if (
        oldValue &&
        Object.keys(oldValue).length > 1 &&
        newValue &&
        Object.keys(newValue).length > 1 &&
        oldValue.token != newValue.token &&
        oldValue.exchange != newValue.exchange
      ) {
        this.isDataModified = true;
      }
    },
  },
  methods: {
    handleCancelClick() {
      this.$emit("cancel");
      this.$router.push("/research");
    },
    async searchRowClick(json) {
      this.search = "";
      this.scripErrorMsg = "";
      await this.$store.dispatch("tradecall/getContract", { data: json });
    },

    getdata(data) {
      
      this.$store.commit("tradecall/setshowdialog", false);
      this.tableshowdata = data;

      if (data.exchange) {
        this.Category =
          data.exchange == "NSE" || data.exchange == "BSE"
            ? "Equity"
            : data.exchange == "NFO" || data.exchange == "BFO"
            ? "Derivatives"
            : "Commodity";
      }
    },
    dateFormatter(date) {
      if (!date) return null;
      let curdate = new Date(date);
      const year = curdate.getFullYear();
      const month = (curdate.getMonth() + 1).toString().padStart(2, "0");
      const day = curdate.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    callSearch(value) {
      var temp = {
        value: value.toString().toUpperCase(),
      };
      clearTimeout(this.timerId);
      this.$store.dispatch("tradecall/getSearchList", temp);
    },
    async validationForm() {
      if (this.sendPush.length < 1) {
        this.sendPushErrorMsg = "Please select any channel";
      }
      if (this.sendPush.length > 0 && this.pushNotification == "") {
        this.sendPushErrorMsg = "Please enter push notification title";
      }
      if (this.Category.length < 1) {
        this.cataOtherErrMsg = "Please select any category";
      }

      if (this.userId == "" && this.userType == "individual") {
        this.userErrorMsg = "User Id is required";
      }
      if (!this.tableshowdata) {
        this.scripErrorMsg = "Please select any scrip";
      }
      if (!this.editaddtrade) {
        if (
          this.basketName &&
          ((this.userType == "individual" && this.userId) ||
            this.userType == "all") &&
          ((this.Category == "Others" && this.otherVal) ||
            this.Category != "Others") &&
          this.sendPush &&
          this.sendPush.length > 0 &&
          this.pushNotification &&
          this.tableshowdata &&
          ((this.SubCategory === "Others" && this.othersCategory) ||
            this.SubCategory != "Others")
        ) {
          let userIdArr = this.userId
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id);
          let json = {
            scripCount: "",
            basketName: this.basketName,
            userId: this.userType == "all" ? ["all"] : userIdArr,
            channels:
              this.sendPush[0] == "All"
                ? this.pushNotifyList.filter((el) => el != "All")
                : this.sendPush,
            expiryDate: this.dateFormatter(this.fromDate),
            title: this.titleName == "" ? this.basketName : this.titleName,
            category: this.Category == "Others" ? this.otherVal : this.Category,
            subCategory:
              this.SubCategory == "Others"
                ? this.othersCategory
                : this.SubCategory,
            shortDescription: this.shortDescription,
            longDescription: this.longDescription,
            createdBy: this.researchTeam,
            source: "",
            tags:
              this.SpeclizationTag == "Others"
                ? this.otherSpeclizationTag
                : this.SpeclizationTag,
            sendpushNotification: 1,
            pushNotificationTitle: this.pushNotification,
            publish: "y",
            scrips: [this.tableshowdata],
          };
          this.$store.commit("tradecall/setIsPreview", true);
          this.createParam = json;
          await this.$store.dispatch("tradecall/tradeCallPreview", json);
        } else {
          this.$store.commit(
            "setNotification",
            {
              title: "",
              message: "Please fill mandatory fields",
              status: "",
              comment: "",
              type: "danger",
              show: true,
              key: new Date().getTime(),
            },
            { root: true }
          );
        }
      } else {
        let json = {
          scripCount: "",
          basketName: "",
          userId: this.userType == "all" ? ["all"] : [""],
          channels: ["Push Notification", "SMS", "E-mail", "Whatsapp"],
          expiryDate: "2024-12-24",
          title: "",
          category: "",
          subCategory: "",
          shortDescription: "",
          longDescription: this.remarks,
          createdBy: this.researchTeam,
          source: "",
          tags: "",
          sendpushNotification: 1,
          pushNotificationTitle: "",
          publish: "y",
          scrips: [
            {
              ...this.tableshowdata,
              remarks: this.statusSelect == "close" ? this.remarks : undefined,
            },
          ],
          status: this.statusSelect,
        };
        // this.$store.commit("tradecall/setIsPreview", true)
        this.createParam = json;
        await this.$store.dispatch("tradecall/tradeCallPreview", json);
      }
    },
    setEditData() {
      if (this.currentData) {
        this.titleName = this.currentData.description;
        this.Category = this.currentData.category;
        this.SubCategory = this.currentData.subCategory;
        this.shortDescription = this.currentData.shortDesc;
        this.longDescription = this.currentData.description;
        this.SpeclizationTag = this.currentData.speclizationTag;

        this.statusSelect = this.currentData.status
          ? this.currentData.status.toLowerCase()
          : "";
      }
    },
    searchInput() {
      this.search = this.search.toUpperCase();
      this.$store.commit("tradecall/setSearchList", []);
    },

    scriptEditData(item, from) {
      this.edit = "true";
      this.tableshowdata = item;
      if (from && from == "initial") {
        this.tableshowdata.stoplossLowerBound = item.stopLossLowerBound;
        this.tableshowdata.stoplossUpperBound = item.stopLossUpperBound;
      }
      this.isDataModified = false;
    },
    async editScrip(item) {  
      this.scriptEditData(item, "edit");
      await this.searchRowClick({ exch: item.exchange, token: item.token });
      this.$store.commit("tradecall/setshowdialog", true);
    },

    handleChange(event) {
      if (event == "Derivatives") {
        this.SubCategoryoption = this.derivativeOption;
      } else if (event == "Equity") {
        this.SubCategoryoption = this.equityOption;
      } else {
        this.SubCategoryoption = this.equityOptionAll;
      }
      this.SubCategory = this.SubCategoryoption[0];
      this.handleSubTabChange(this.SubCategory);
    },
    handleSubTabChange(event) {
      if (event == "Delivery") {
        this.SpeclizationTagoption = this.speclizationTagForDel;
      } else if (event == "Stock") {
        this.SpeclizationTagoption = this.speclizationTagForStock;
      } else if (event == "Strategies") {
        this.SpeclizationTagoption = this.speclizationTagForStrategies;
      } else if (event == "Index") {
        this.SpeclizationTagoption = this.speclizationTagForIndex;
      } else {
        this.SpeclizationTagoption = this.speclizationTagForAll;
      }
      // this.SpeclizationTag = this.SpeclizationTagoption[0]
      this.SpeclizationTag = "";
    },
  },
  // unmounted() {
  //         this.$store.commit("tradecall/seteditaddtrade", false);
  //     },
  mounted() {
    let currentEditData = JSON.parse(
      localStorage.getItem("researchcallEditData")
    );
    if (
      Object.keys(this.$route.query).length > 0 &&
      this.$route.query.edit == "true"
    ) {
      if (currentEditData && currentEditData != "") {
        this.currentData = currentEditData;
        this.setEditData();
        this.scriptEditData(this.currentData.scripdetails[0], "initial");
      } else {
        this.handleCancelClick();
      }
    } else {
      this.SubCategoryoption = this.equityOption;
      this.SpeclizationTagoption = this.speclizationTagForAll;
      this.edit = "false";
    }
  },
  
});
</script>

<style scoped>
.text-primary {
  color: #3b82f6;
}

.capitalize-input {
  text-transform: capitalize;
}
</style>
