<template>
  <section>
    <div class="p-4" v-if="!isCreateThematicBasket">
      <div class="card px-3 pt-2 border rounded bg-white shadow-sm">
        <div class="gap-4 flex flex-wrap">
          <div>
            <label class="primaryColor pb-1 text-sm ml-2">From Date *</label>
            <VDatePicker
              type="date"
              :max-date="toDate"
              v-model="fromDate"
              :popover="popover"
              @input="fromErrorMsg = ''"
              :masks="{
                input: 'DD-MM-YYYY',
                modelValue: 'YYYY-MM-DD',
              }"
              mode="date"
            >
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div
                  class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1"
                >
                  <input
                    :value="inputValue"
                    placeholder="DD-MM-YYYY"
                    v-on="inputEvents"
                    class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer"
                    readonly
                  />
                  <button
                    type="button"
                    class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                    @click="togglePopover"
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
            <div class="h-5">
              <span
                v-if="fromErrorMsg && !fromDate"
                class="text-xs text-red-600"
                >{{ fromErrorMsg }}</span
              >
            </div>
          </div>

          <div>
            <label class="primaryColor pb-1 text-sm ml-2">To Date *</label>
            <VDatePicker
              type="date"
              :min-date="fromDate"
              v-model="toDate"
              @input="toErrorMsg = ''"
              :popover="popover"
              :masks="{
                input: 'DD-MM-YYYY',
                modelValue: 'YYYY-MM-DD',
              }"
              mode="date"
            >
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div
                  class="flex items-center justify-between min-w-[200px] h-10 cursor-pointer border rounded p-1"
                >
                  <input
                    :value="inputValue"
                    placeholder="DD-MM-YYYY"
                    v-on="inputEvents"
                    class="min-w-[150px] h-9 ml-1 text-xs outline-none cursor-pointer"
                    readonly
                  />
                  <button
                    type="button"
                    class="flex justify-center mr-2 items-center bg-accent-100 hover:bg-accent-200 text-accent-700"
                    @click="togglePopover"
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
            <div class="h-5">
              <span v-if="toErrorMsg && !toDate" class="text-xs text-red-600">{{
                toErrorMsg
              }}</span>
            </div>
          </div>

          <!-- <div class="min-w-[200px]">
            <label class="block text-sm pb-1">Status</label>
            <div class="relative">
              <Listbox v-model="Status">
                <div class="relative">
                  <ListboxButton
                    class="flex items-center justify-between w-full h-[42px] border border-[#DCDDDEB2] rounded p-3 text-secondaryColor"
                  >
                    <div class="flex items-center">
                      <span class="text-sm font-normal capitalize">
                        {{ Status }}
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
                        v-for="(subCat, index) in [
                          ...statusoption,
                          ...statusList,
                        ]"
                        :key="index"
                        :value="subCat"
                        class="cursor-pointer select-none relative py-2 pl-2 pr-4 hover:bg-gray-100"
                      >
                        <span
                          class="block truncate capitalize"
                          :class="{
                            'font-semibold text-[#005CB9]': Status === subCat,
                          }"
                        >
                          {{ subCat }}
                        </span>
                      </ListboxOption>
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
              <div></div>
            </div>
          </div> -->

          <div class="flex mt-1 items-center">
            <button
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
              :disabled="getLoader"
              type="button"
              @click="handleSubmit()"
            >
              <p v-if="!getLoader">Submit</p>
              <svg
                v-if="getLoader"
                class="animate-spin h-5 w-5 text-white flex mx-auto disabled:opacity-75"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fffff"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#fffff"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-4"
              @click="addtrade()"
            >
              <p>Add Basket</p>
            </button>
            <div class="download" v-if="getThematicBasketList.length > 0">
              <button
                type="button"
                @click="
                  downloadUnicodeCSV(
                    getThematicBasketList,
                    'Thematic Basket',
                    headers
                  )
                "
                class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-4"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded overflow-auto mt-3 card"
        v-if="getThematicBasketList.length > 0"
      >
        <table class="w-full border">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th v-for="head in headers" class="border-r">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="(item, index) in getThematicBasketList"
              :key="index"
              class="text-sm"
              :class="
                getThematicBasketList.length - 1 != index ? 'border-b' : ''
              "
            >
              <td class="border-r text-center">
                {{ item.basketId }}
              </td>
              <td class="border-r text-center">
                {{ item.createdOn }}
              </td>
              <td class="border-r text-center">
                {{ item.category }}
              </td>
              <td class="border-r text-center">
                {{ item.subCategory }}
              </td>
              <td class="border-r text-center">
                {{ item.shortDescription }}
              </td>
              <td class="border-r text-center">
                {{ item.tag ? item.tag : "NA" }}
              </td>
              <td
                class="border-r text-center flex items-center justify-center capitalize"
              >
                {{ item.isSent }}
                <!-- <svg width="16" @click="isOpen = true; editData = item" v-if="item.status"
                class="ml-3 cursor-pointer" height="18" viewBox="0 0 16 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.33325 15.166H1.99992V1.83268H7.83325V5.99935H11.9999V8.58268L13.6666 6.91602V5.16602L8.66659 0.166016H1.99992C1.08325 0.166016 0.333252 0.916016 0.333252 1.83268V15.166C0.333252 16.0827 1.08325 16.8327 1.99992 16.8327H5.33325V15.166ZM13.8333 9.33268C13.9166 9.33268 14.0833 9.41602 14.1666 9.49935L15.2499 10.5827C15.4166 10.7493 15.4166 11.0827 15.2499 11.2493L14.4166 12.0827L12.6666 10.3327L13.4999 9.49935C13.5833 9.41602 13.6666 9.33268 13.8333 9.33268ZM13.8333 12.5827L8.74992 17.666H6.99992V15.916L12.0833 10.8327L13.8333 12.5827Z"
                  fill="#005CB9"></path>
              </svg> -->
              </td>
              <td class="border-r">
                <div
                  class="flex gap-4 items-center justify-center align-middle cursor-pointer"
                >
                  <!-- <a @click="showDeleteDialog(i)" class="text-black cursor-pointer" v-html="deleteSvg"></a> -->
                  <div @click="editaddtrade(item)">
                    <icons :name="'editicon'" />
                  </div>
                  <div @click="getDeleteData(item)">
                    <icons :name="'delete'" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!getLoader" class="flex items-center justify-center p-6">
        No Data Found
      </div>
    </div>
    <div v-else>
      <createThematicBasket />
    </div>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import createThematicBasket from "./createThematicBasket.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import commonFunc from "../../../mixins/commonFunc";
export default defineComponent({
  setup() {
    const store = useStore();
    const isCreateThematicBasket = computed(
      () => store.state.thematicBasket.isCreateThematicBasket
    );
    const today = new Date();
    const formattedToday = today.toISOString().slice(0, 16); // Includes date and time (YYYY-MM-DDTHH:mm)
    const yesterDay = new Date(today);
    yesterDay.setDate(today.getDate() - 1);
    const formattedYesterday = yesterDay.toISOString().slice(0, 16); // Include date and time (YYYY-MM-DDTHH:mm)
    const fromDate = computed({
      get: () => store.state.thematicBasket.fromDate,
      set: (value: any) => {
        store.commit("thematicBasket/setFromDate", value);
      },
    });
    const toDate = computed({
      get: () => store.state.thematicBasket.toDate,
      set: (value: any) => {
        store.commit("thematicBasket/setToDate", value);
      },
    });
    const Status = ref("All");
    const popover = ref({
      visibility: "click",
      placement: "bottom-start",
    });
    const fromErrorMsg = ref("");
    const toErrorMsg = ref("");
    const statusoption = ref(["All"]);
    const getLoader = computed(() => store.state.thematicBasket.loader);
    const getThematicBasketList = computed(
      () => store.getters["thematicBasket/getThematicBasketList"] ?? []
    );
    const headers = ref([
      { name: "Basket ID", csvKey: "basketId" },
      { name: "Created On", csvKey: "createdOn" },
      { name: "Category", csvKey: "category" },
      { name: "Sub Category", csvKey: "subCategory" },
      { name: "Description (Short)", csvKey: "shortDescription" },
      { name: "Tag", csvKey: "tag" },
      { name: "Status", csvKey: "isSent" },
      { name: "Modify", csvKey: "modify" },
    ]);
    return {
      isCreateThematicBasket,
      today,
      yesterDay,
      formattedToday,
      formattedYesterday,
      fromDate,
      toDate,
      Status,
      popover,
      fromErrorMsg,
      toErrorMsg,
      statusoption,
      getLoader,
      getThematicBasketList,
      headers,
    };
  },
  methods: {
    validateForm() {
      let isValid = true;

      if (!this.fromDate) {
        this.fromErrorMsg = "From Date is required";
        isValid = false;
      } else {
        this.fromErrorMsg = "";
      }

      if (!this.toDate) {
        this.toErrorMsg = "To Date is required";
        isValid = false;
      } else {
        this.toErrorMsg = "";
      }

      return isValid;
    },
    handleSubmit() {
      if (this.validateForm()) {
        // const fromDateObj = this.fromDate ? new Date(this.fromDate) : null;
        // const toDateObj = this.toDate ? new Date(this.toDate) : null;

        this.$store.dispatch("thematicBasket/getAllThematicBasket");
      }
    },
    dateFormatter(date: Date | null, type: string) {
      if (!date) return null;
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      let seconds = date.getSeconds().toString().padStart(2, "0");
      if (type === "from") {
        // Set time to 00:00 for 'from'
        hours = "00";
        minutes = "00";
        seconds = "00";
      } else if (type === "to") {
        // Set time to current time for 'to'
        const now = new Date();
        hours = now.getHours().toString().padStart(2, "0");
        minutes = now.getMinutes().toString().padStart(2, "0");
        seconds = now.getSeconds().toString().padStart(2, "0");
      }
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Return the full date and time (YYYY-MM-DD HH:mm)
    },
    addtrade() {
      this.$store.commit("thematicBasket/seteditaddtrade", false);
      localStorage.removeItem("thematicBasketEditData");
      this.$store.commit("thematicBasket/setSelectedThematicBasket", "");
      this.$store.commit("thematicBasket/setIsCreateThematicBasket", true);
      this.$router.push("/research");
    },
    async editaddtrade(item: any) {
      await this.$store.dispatch(
        "thematicBasket/getSelectedThematicBasket",
        item.basketId
      );

      this.$router.push("/research?editThematic=true");
      localStorage.setItem("thematicBasketEditData", JSON.stringify(item));
      this.$store.commit("thematicBasket/setSelectedThematicBasket", item);
      this.$store.commit("thematicBasket/seteditaddtrade", true);
    },
    getDeleteData(item: any) {
      this.$store.dispatch(
        "thematicBasket/deleteThematicBasket",
        item.basketId
      );
    },
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    createThematicBasket,
  },
  mixins: [commonFunc],
  mounted() {},
});
</script>
