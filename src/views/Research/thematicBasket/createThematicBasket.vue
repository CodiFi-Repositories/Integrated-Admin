<template>
  <div class="m-4 px-4 py-6 bg-white rounded border">
    <div class="w-full gap-10 max-w-[1024px] mx-auto">
      <p class="text-sm font-bold mb-4 primaryColor">
        {{ editThematicBasket ? "Edit" : "Add" }}
      </p>
      <section class="w-full mb-4 relative">
        <div
          class="flex items-center border rounded-full py-2 px-4 max-w-2xl justify-center mx-auto"
          :class="tableshowdata && tableshowdata.length > 9 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'"
        
        >
          <span v-html="searchSvg"></span>
          <input
            type="search"
            :disabled="tableshowdata && tableshowdata.length > 9"
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
              v-for="(item, index) in getSearchList()"
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

        <div
          class="border rounded-lg mt-4"
          v-if="tableshowdata && tableshowdata.length > 0"
        >
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
                  Price Type
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
                  Total
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Weightage
                </th>
                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-right border-r"
                >
                  Market. Cap
                </th>

                <th
                  class="px-3 text-[#888] text-[13px] font-medium text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, id) in tableshowdata"
                class="text-[14px] border-t"
              >
                <td class="whitespace-nowrap px-3 text-left border-r">
                  {{ item.formattedInsName || item.tradingSymbol || "NA" }}
                  <span class="text-xs">{{ item.exchange }}</span>
                </td>
                <td
                  class="whitespace-nowrap px-3 text-center border-r capitalize"
                >
                  {{ item.transType }}
                </td>
                <td class="whitespace-nowrap px-3 text-center border-r">
                  {{ item.orderType || "-" }}
                </td>
                <td class="whitespace-nowrap px-3 text-center border-r">
                  {{ item.priceType || "-" }}
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ item.qty || "0" }}
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ item.price || "0" }}
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{
                    (Number(item.qty) * Number(item.price)).toFixed(2) || "0"
                  }}
                </td>
                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ getWeightage(item) || "0" }}
                </td>

                <td class="whitespace-nowrap px-3 text-right border-r">
                  {{ item.exposure || "0" }}
                </td>

                <td class="text-center whitespace-nowrap px-3 cursor-pointer">
                  <div class="flex gap-4 justify-center">
                    <a @click="editScrip(item, id)">
                      <icons :name="'editicon'" />
                    </a>
                    <a @click="deleteScrip(id)">
                      <icons :name="'delete'" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pt-3 text-base font-semibold">
          Min. Investment: {{ getTotalAmount() }}
        </p>
        <!-- <div v-else class="text-center py-8">No scrips added</div> -->
      </section>

      <div  class="border-b border-[#e1e1e1] my-8" v-if="tableshowdata"></div>

      <section   v-if="!editThematicBasket" class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <!-- <div class="flex flex-col"> -->
        <!-- <div class="text-sm pb-1">Benchmark</div>
          <input
            type="text"
            v-model="benchMark"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
            placeholder="Enter the"
          /> -->
        <!-- </div> -->
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
        <div class="flex flex-col">
          <div class="mb-4">
            <div class="text-sm pb-1">
              Analyst Name <span class="text-red-600">*</span>
            </div>
            <input
              type="text"
              v-model="analystName"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter analyst name"
              @input="analystErrMsg = ''"
            />
            <div class="min-h-[14px]">
              <span v-if="analystErrMsg" class="text-xs text-red-600">{{
                analystErrMsg
              }}</span>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="text-sm pb-1">
            Short Description <span class="text-red-600">*</span>
          </div>
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
          <div class="text-sm pb-1">
            Long Description <span class="text-red-600">*</span>
          </div>
          <textarea
            type="text"
            v-model="longDescription"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] ml-0"
            placeholder="Enter Long Description"
            rows="4"
            @input="longDescErrMsg = ''"
          >
          </textarea>
          <div class="min-h-[14px]">
            <span v-if="longDescErrMsg" class="text-xs text-red-600">{{
              longDescErrMsg
            }}</span>
          </div>
        </div>
        <!-- <div class="mb-6 w-full"> -->
        <!-- <div class="text-sm pb-1">Remarks</div>
          <textarea
            type="text"
            v-model="remarks"
            class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888]"
            placeholder="Enter Remarks"
            rows="4"
          >
          </textarea> -->
        <!-- </div> -->

        <!-- <div class="w-full flex mb-6 space-x-6"> -->
        <!-- <div class="w-1/2">
            <label class="text-sm pb-1"
              >Investment Duration <span class="text-red-600">*</span></label
            >
            <input
              type="text"
              v-model="investmentDuration"
              @input="investmentDurationErrMsg = ''"
              class="border h-10 p-2 rounded w-full placeholder:text-xs text-xs text-[#888]"
              placeholder="Enter Push Notification Title"
            />
          </div> -->
        <!-- <div class="w-1/2">
            <label class="text-sm pb-1">
              Investment Frequency <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              v-model="reviewFrequency"
              @input="reviewFrequencyErrMsg = ''"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter review frequency"
            />
          </div> -->
        <!-- </div> -->
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
                <Listbox v-model="SubCategory">
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
              <label class="block text-sm pb-1"
                >Specialization Tag <span class="text-red-600">*</span></label
              >
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
            <label class="text-sm pb-1">
              Risk Level <span class="text-red-600">*</span></label
            >
            <!-- <input
              type="text"
              v-model="risk"
              @input="riskErrMsg = ''"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter Risk Level"
            /> -->
            <Listbox v-model="risk">
              <div class="relative">
                <ListboxButton
                  class="h-10 flex items-center justify-between w-full border border-[#DCDDDEB2] rounded p-3 text-secondaryColor relative"
                >
                  <div class="flex items-center">
                    <span class="text-xs font-normal text-[#888]">
                      {{ risk || " Select Risk Level" }}
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
                      v-for="(riskOption, index) in riskOptions"
                      :key="index"
                      @click="
                        risk = riskOption;

                        riskErrMsg = '';
                      "
                      class="cursor-pointer select-none relative py-2 pl-2 pr-4 hover:bg-gray-100"
                    >
                      <span
                        class="block truncate"
                        :class="
                          risk === riskOption ? 'font-semibold' : 'font-normal'
                        "
                      >
                        {{ riskOption }}
                      </span>
                    </ListboxOption>
                  </ListboxOptions>
                </Transition>
              </div>
            </Listbox>
            <div class="min-h-[14px]">
              <span v-if="riskErrMsg" class="text-xs text-red-600">{{
                riskErrMsg
              }}</span>
            </div>
          </div>
          <!-- <div class="w-1/2">
            <label class="text-sm pb-1">Draft</label>
            <input
              type="text"
              v-model="draft"
              @input="draftErrMsg = ''"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter Yes/No"
            />
          </div> -->
        </div>

        <div class="w-full flex mb-6 space-x-6">
          <!-- <div class="w-1/2">
            <label class="text-sm pb-1"> Rating </label>
            <input
              type="text"
              v-model="rating"
              @input="ratingErrorMsg = ''"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
              placeholder="Enter Rating"
            />
          </div> -->
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
                      @input="pushNotificationErrMsg = ''"
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
              <div>
                <div class="pb-1 text-sm whitespace-nowrap">
                  Push Notification Title <span class="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  v-model="pushNotification"
                  @input="pushNotificationErrMsg = ''"
                  class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-10"
                  placeholder="Enter Push Notification Title"
                />
                <div class="min-h-[14px]">
                  <span
                    v-if="pushNotificationErrMsg"
                    class="text-xs text-red-600"
                    >{{ pushNotificationErrMsg }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="w-full flex mb-6 space-x-6">
          <div>
            <label class="text-sm pb-1">Scheduled </label>
            <input
              type="text"
              v-model="scheduled"
              @input="scheduledErrMsg = ''"
              class="border p-2 rounded w-full placeholder:text-xs text-xs text-[#888] h-8"
              placeholder="Enter Yes/No"
            />
          </div>
        </div> -->
      </section>
    </div>

    <div class="flex justify-end mt-6 gap-4">
      <button
        :disabled="btnLoader"
        type="submit"
        class="bg-[#005CB9] disabled:opacity-75 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded text-xs"
        @click="validationForm()"
      >
        <span>Submit</span>
        <!-- <btnLoader v-else /> -->
      </button>
      <div>
        <button
          class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded"
          @click="handleCancelClick()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <thematicBasketOw
    :is-open="showOrderWindow"
    v-if="showOrderWindow"
    :scrip-data="modifyScrip"
    :isModify="!!modifyScrip"
    @handleClose="getdata"
    :modifyIndex="modifyIndex"
  />
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { defineComponent, ref } from "vue";
import Icons from "../../../components/icons.vue";
import thematicBasketOw from "./thematicBasketOw.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

export default defineComponent({
  emits: ["close"],

  components: {
    Icons,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    thematicBasketOw,
  },
  data() {
    return {
      userType: "all",
      userId: "",
      basketName: "Research Basket",
      pushNotification: "",
      search: "",
      btnLoader: false,
      tableshowdata: [],
      Category: "Equity",
      SubCategory: "Intraday",

      SpeclizationTag: "",
      popover: {
        visibility: "click",
        placement: "bottom-start",
      },

      banks: ["Equity", "Derivatives", "Commodities", "ETF", 'Others'],
      equityOption: ["Intraday", "Delivery", "BTST", "MTF", "Weekly", 'Index',
        "Others"],
      equityOptionAll: [
        "Intraday",
        "Delivery",
        "BTST",
        "MTF",
        "Weekly",
        'Index',
        "Others",
      ],
      derivativeOption: ["Stock", "Index", "Strategies", 'Others'],
    SubCategoryoption: [],

      SpeclizationTagoption: [
        'Recommended',
        "Exclusive",
        "Growth",
        "Quantitative",
        "Technical Analysis",
        'Top Down',
        'Pick of the Week',
        'Pick of the Month',
        'ABM Maverick Stock',
        'Positional',
        'Special Trade T20',
        'Stock Option',
        'Option Portfolio',
        'Others'

      ],

      speclizationTagForStock: ["T20 Stock Option", "Others"],

      riskOptions: ["Conservative", "Moderate", "Aggressive"],
      otherVal: "", // Store the "Others" value
      othersCategory: "",
      today: new Date().toISOString().substr(0, 10),
      otherSpeclizationTag: "",

      shortDescription: "",
      longDescription: "",
      userErrorMsg: "",
      basketErrMsg: "",
      shortDesErrMsg: "",
      cataOtherErrMsg: "",
      spacizationOtherErrMsg: "",
      otherSubCataErrMsg: "",
      searchSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-[#888]">
  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
</svg>`,
      isOpen: false,
      createParam: {},
      edit: "false",
      isDataModified: false,

      scripErrorMsg: "",
      investmentDuration: "",
      target: "",
      risk: 'Conservative',
      rating: "",
      draft: "0",
      scheduled: "0",
      benchMark: "NIFTY",
      reviewFrequency: "",
      modifyScrip: "",
      modifyIndex: -1,
      currentData: "",
      analystName: "",
      sendPush: [],
      pushNotifyList: ["All", "Push Notification", "SMS", "E-mail", "Whatsapp"],
      pushNotificationErrMsg: "",
      longDescErrMsg: "",
      riskErrMsg: "",
      analystErrMsg: "",
    };
  },
  computed: {
    ...mapState("thematicBasket", [
      "editThematicBasket",
      "showOrderWindow",
      "scripsArray",
      "selectedThematicBasket",
      "selectedThematicBasketScrips",
    ]),
    ...mapState("tradecall", ["searchList"]),
    ...mapGetters("thematicBasket", ["getSelectedThematicBasketScrips"]),
    capitalize(val) {
      return val ? val.charAt(0).toUpperCase() + val.slice(1) : "";
    },
    computedBasketScrips() {
      return this.selectedThematicBasketScrips;
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
    computedBasketScrips(oldValue, newValue) {
      this.tableshowdata = newValue.scrips;
    },
  },
  methods: {
    handleCancelClick() {
      this.$store.commit("thematicBasket/setIsCreateThematicBasket", false);
      this.$router.push("/research");
    },
    async searchRowClick(json) {
      this.search = "";
      this.scripErrorMsg = "";
      json.from = "thematicBasket";
      await this.$store.dispatch("tradecall/getContract", { data: json });
    },

    getdata(data) {
      this.$store.commit("thematicBasket/setshowdialog", false);
      if (!!this.modifyScrip) {
        this.tableshowdata[this.modifyIndex] = data;
      } else {
        this.tableshowdata.push(data);
      }
      this.modifyScrip = "";
      this.modifyIndex = -1;
      // if (data.exchange) {
      //   this.Category =
      //     data.exchange == "NSE" || data.exchange == "BSE"
      //       ? "Equity"
      //       : data.exchange == "NFO" || data.exchange == "BFO"
      //       ? "Derivatives"
      //       : "Commodity";
      // }
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
        this.pushNotificationErrMsg = "Please select any channel";
      }
      if (this.Category.length < 1) {
        this.cataOtherErrMsg = "Please select any category";
      }

      if (this.userId == "" && this.userType == "individual") {
        this.userErrorMsg = "User Id is required";
      }
      if (
        !this.tableshowdata ||
        (this.tableshowdata && this.tableshowdata.length == 0)
      ) {
        this.scripErrorMsg = "Please select any scrip";
      }
      if (!this.risk) {
        this.riskErrMsg = "Please select any risk level";
      }
      if (!this.longDescription) {
        this.longDescErrMsg = "Please enter description";
      }
      if (!this.shortDescription) {
        this.shortDesErrMsg = "Please enter description";
      }
      if (!this.pushNotification && this.sendPush.length > 0) {
        this.pushNotificationErrMsg = "Please enter push notification title";
      }
      if (!this.analystName) {
        this.analystErrMsg = "Please enter analyst name";
      }
      if (!this.SpeclizationTag  ) {
        this.spacizationOtherErrMsg = "Please select any tag";
      }
      if( this.SpeclizationTag === 'Others' && !this.otherSpeclizationTag) {
          this.spacizationOtherErrMsg = "Tag cannot be empty";
      }

      if (
      (  this.basketName &&
        ((this.userType == "individual" && this.userId) ||
          this.userType == "all") &&
        ((this.Category == "Others" && this.otherVal) ||
          this.Category != "Others") &&
        this.tableshowdata && this.tableshowdata.length > 0 &&
        this.risk &&
          this.sendPush &&
          this.sendPush.length > 0 &&
        this.pushNotification &&
        this.shortDescription &&
        this.analystName &&
        ((this.SpeclizationTag ==='Others' && this.otherSpeclizationTag) || this.SpeclizationTag && this.SpeclizationTag != 'Others') &&
        ((this.SubCategory === "Others" && this.othersCategory) ||
          this.SubCategory != "Others") && !this.editThematicBasket) || ( this.tableshowdata && this.tableshowdata.length > 0 && this.editThematicBasket)
      ) {
        let userIdArr = this.userId
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id);
        let json = {
          userType: this.userType == "all" ? "ALL" : this.userType, //mandatory (individual,ALL)
          userId: this.userType == "all" ? ["ALL"] : userIdArr, //mandatory (List of userIds)
          basketType: "thematic", //mandatory
          category: this.Category == "Others" ? this.otherVal : this.Category,
          subCategory:
            this.SubCategory == "Others"
              ? this.othersCategory
              : this.SubCategory,
          basketName: this.basketName, //mandatory
          shortDescription: this.shortDescription,
          longDescription: this.longDescription,
          pushNotificationTitle: this.pushNotification, //mandatory
          tag:    this.SpeclizationTag == "Others"
              ? this.otherSpeclizationTag
              : this.SpeclizationTag,
          riskLevel: this.risk, //mandatory  if not give null
          benchmark: "NIFTY50", //mandatory if not give null
          investmentDuration: "Minimum 1 Year", //mandatory if not give null
          reviewFrequency: "Every Quarter", //mandatory if not give null
          analystName: this.analystName, //mandatory
          isDraft: "0", //mandatory if not used send as 0
          is_scheduled: "0", //mandatory if not used send as 0
          scrips: this.tableshowdata,
          channels:
              this.sendPush[0] == "All"
                ? this.pushNotifyList.filter((el) => el != "All")
                : this.sendPush,
        };
        if (this.editThematicBasket) {
          json.basketId = this.selectedThematicBasket.basketId;
        }

        this.createParam = json;
        this.editThematicBasket
          ? await this.$store.dispatch(
              "thematicBasket/modifyThematicBasket",
              json
            )
          : await this.$store.dispatch(
              "thematicBasket/createThematicBasket",
              json
            );
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

      // else {
      //   let json = {
      //     userType: this.userType == "all" ? "ALL" : this.userType, //mandatory (individual,ALL)
      //     basketType: "thematic",

      //     basketName: this.basketName,
      //     userId: this.userType == "all" ? ["ALL"] : userIdArr, //mandatory (List of userIds)

      //     category: this.Category == "Others" ? this.otherVal : this.Category,
      //     subCategory:
      //       this.SubCategory == "Others"
      //         ? this.othersCategory
      //         : this.SubCategory,
      //     shortDescription: this.shortDescription,
      //     longDescription: this.longDescription,

      //     scrips: this.tableshowdata,
      //     tag: this.SpeclizationTag,
      //     riskLevel: this.risk,
      //     benchmark: this.benchMark,
      //     investmentDuration: this.investmentDuration,
      //     reviewFrequency: this.reviewFrequency,
      //     analystName: this.analystName,
      //     isDraft: this.isDraft == "Yes" ? "1" : "0",
      //     is_scheduled: this.is_scheduled == "Yes" ? "1" : "0",
      //     script: this.scripsArr,
      //     basketId: this.selectedThematicBasket.basketId,
      //   };
      //   // this.$store.commit("tradecall/setIsPreview", true)
      //   this.createParam = json;
      //   await this.$store.dispatch("thematicBasket/modifyThematicBasket", json);
      // }
    },
    setEditData() {
      if (this.currentData) {
        this.basketName = this.currentData.basketName;
        if(this.banks.includes(this.currentData.category)){
         
          this.Category = this.currentData.category;
        } else {
           this.Category = 'Others'
          this.otherVal = this.currentData.category;
        }
        
        this.handleChange(this.Category);
          if(this.SubCategoryoption.includes(this.currentData.subCategory)){
         
         this.SubCategory = this.currentData.subCategory;
        } else {
           this.SubCategory = 'Others'
          this.othersCategory = this.currentData.subCategory;
        }
        
        
        this.shortDescription = this.currentData.shortDescription
          ? this.currentData.shortDescription
          : this.shortDescription;
        this.longDescription = this.currentData.longDescription
          ? this.currentData.longDescription
          : this.longDescription;
          if(this.SpeclizationTagoption.includes(this.currentData.tag)) {
             this.SpeclizationTag = this.currentData.tag
          } else {
            this.SpeclizationTag = 'Others';
            this.otherSpeclizationTag = this.currentData.tag
          }
      
        this.risk = this.currentData.riskLevel
          ? this.currentData.riskLevel
          : this.riskLevel;
        this.benchMark = this.currentData.benchmark
          ? this.currentData.benchmark
          : this.benchMark;
        this.investmentDuration = this.currentData.investmentDuration
          ? this.currentData.investmentDuration
          : this.investmentDuration;
        this.reviewFrequency = this.currentData.reviewFrequency
          ? this.currentData.reviewFrequency
          : this.reviewFrequency;
        this.draft = this.currentData.isDraft
          ? this.currentData.isDraft
          : this.draft;
        this.scheduled = this.currentData.is_scheduled
          ? this.currentData.is_scheduled
          : this.scheduled;
        this.analystName = this.currentData.analystName
          ? this.currentData.analystName
          : this.analystName;

        this.pushNotification = this.currentData.pushNotification
          ? this.currentData.pushNotification
          : this.pushNotification;
        this.tableshowdata =
          this.selectedThematicBasketScrips &&
          this.selectedThematicBasketScrips.scrips
            ? this.selectedThematicBasketScrips.scrips
            : this.tableshowdata;
      }
    },
    searchInput() {
      this.search = this.search.toUpperCase();
      this.$store.commit("tradecall/setSearchList", []);
    },

    async editScrip(item, index) {
      this.modifyScrip = item;
      this.modifyIndex = index;
      await this.searchRowClick({ exch: item.exchange, token: item.token });

      this.$store.commit("thematicBasket/setshowdialog", true);
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
    },

    deleteScrip(id) {
      this.tableshowdata.splice(id, 1);
    },
    getWeightage(selected) {
      const totalAmount =
        this.tableshowdata && this.tableshowdata.length > 0
          ? this.tableshowdata.reduce(
              (sum, item) => sum + Number(item.qty) * Number(item.price),
              0
            )
          : 0;
      const weightage =
        ((Number(selected.qty) * Number(selected.price)) / totalAmount) * 100;
      return weightage ? `${weightage.toFixed(2)}%` : "-";
    },
    getTotalAmount() {
      let totalAmount =
        this.tableshowdata && this.tableshowdata.length > 0
          ? this.tableshowdata.reduce(
              (sum, item) => sum + Number(item.qty) * Number(item.price),
              0
            )
          : 0;
      totalAmount = Number(totalAmount) ?  Number(totalAmount).toFixed(2) : '0.00'
      return totalAmount;
    },
    getSearchList(){
      return this.searchList && this.searchList.length > 0 ? this.searchList.filter((el)=> el.exchange == 'NSE' || el.exchange == 'BSE') : []
    }
  },
  // unmounted() {
  //         this.$store.commit("tradecall/seteditThematicBasket", false);
  //     },
  async mounted() {
    let currentEditData = this.selectedThematicBasket;
    if (
      Object.keys(this.$route.query).length > 0 &&
      this.$route.query.editThematic == "true"
    ) {
      if (currentEditData && currentEditData != "") {
        this.currentData = currentEditData;

        this.setEditData();
      } else {
        // this.handleCancelClick();
      }
    } else {
      this.SubCategoryoption = this.equityOption;
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
