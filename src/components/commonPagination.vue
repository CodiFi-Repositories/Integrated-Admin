<template>
  <!-- give v-if="getEmailLogsDetails.length != 0 && !loader" by using as a component -->
  <div class="flex justify-end mt-4 p-2 gap-4">
    <div class="flex items-center">
      <div class="primaryColor text-sm mr-2">Rows Per Page :</div>
      <Listbox
        as="div"
        v-model="activeRow"
        class="h-10 focus:outline-0 text-xs"
      >
        <!-- v-model="activeRow" -->
        <!-- <ListboxLabel class="pl-2">Select Exchange</ListboxLabel> -->
        <div class="relative">
          <ListboxButton
            id="logs_drop_down_common"
            @mouseenter="getWidth('logs_drop_down_common')"
            class="relative listPagination w-[100px] h-10 cursor-pointer bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 border rounded sm:text-sm sm:leading-6"
          >
            <span class="block truncate">{{ activeRow.option }} </span>
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
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-blue sm:text-sm"
              :class="isBottom ? 'bottom-[40px]' : ''"
            >
              <ListboxOption
                as="template"
                v-for="option in rowPerPage.slice(0, activeRow?.option)"
                :key="option.id"
                :value="option"
                @click="setActivePage(option)"
                v-slot="{ active, selectedExchangeData }"
              >
                <li
                  :class="[
                    active ? 'bg-[#d1d1d185] text-black ' : 'text-gray-900',
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selectedExchangeData ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ option.option === "All" ? "All" : option.option }}
                  </span>

                  <span
                    v-if="selectedExchangeData"
                    :class="[
                      active ? 'text-white' : 'text-blue-600',
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
    <nav
      class="isolate inline-flex space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <a
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="page == 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
        @click="startOver()"
      >
        <Icons name="leftEndArrow" />
      </a>
      <a
        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="page == 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
        @click="backward()"
      >
        <Icons name="leftArrow" />
      </a>
      <template
        v-for="(cpage, id) in Math.ceil(totLen / activeRow?.option)"
        :key="id"
      >
        <template
          v-if="
            cpage === 1 ||
            cpage === Math.ceil(totLen / activeRow?.option) ||
            Math.abs(page - cpage) < 3 ||
            id === 1 ||
            id === Math.ceil(totLen / activeRow?.option)
          "
        >
          <a
            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer"
            :class="
              page === cpage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
            "
            @click="
              getTableData(
                (cpage - 1) * activeRow?.option,
                cpage * activeRow?.option
              );
              page = cpage;
            "
          >
            {{ cpage }}
          </a>
        </template>
      </template>
      <!-- Display actual page number if it's within a certain range -->

      <a
        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="
          page >= Math.ceil(totLen / activeRow?.option)
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        "
        @click="forward()"
      >
        <!-- class="sr-only" -->
        <Icons name="rightArrow" />
        <!-- <ChevronRightIcon class="h-5 w-5" aria-hidden="true" /> -->
      </a>
      <a
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        :class="
          page == Math.ceil(totLen / activeRow?.option)
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        "
        @click="forwardToLast()"
      >
        <Icons name="rightEndArrow" />
      </a>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Icons from "./icons.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "commonPageination",
  setup() {
    const activeRow: any = ref<any>();
    const page = ref(1);
    const pages = ref(2);
    const firstIndex = ref(0);
    const isBottom = ref(false);
    const rowPerPage = ref<any>([]);
    return {
      activeRow,
      page,
      pages,
      firstIndex,
      isBottom,
      rowPerPage,
    };
  },
  emits: ["page-chg"],
  props: {
    totLen: {
      type: Number,
      default: 1,
      required: true,
    },
    rowCount: {
      type: Number,
      default: 1,
      required: true,
    },
    pageDate: {
      type: Object,
      default: 1,
      required: true,
    },
  },
  components: {
    Icons,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    ChevronUpDownIcon,
  },
  methods: {
    async getTableData(fromIndex: any, lastIndex: any) {
      this.$emit("page-chg", {
        from: fromIndex,
        last: lastIndex,
        count: this.activeRow?.option,
      });
    },
    setActivePage(option: any) {
      option.option == "All" || this.totLen <= option.option
        ? (this.page = 1)
        : "";
      let count = option.option == "All" ? this.totLen : option.option;
      this.getTableData((this.page - 1) * count, this.page * count);
    },
    forward() {
      if (this.page < Math.ceil(this.totLen / this.activeRow?.option)) {
        this.getTableData(
          this.page * this.activeRow?.option,
          (this.page + 1) * this.activeRow?.option
        );
        this.page = this.page + 1;
      }
    },

    forwardToLast() {
      if (this.page != Math.ceil(this.totLen / this.activeRow?.option)) {
        this.page = Math.ceil(this.totLen / this.activeRow?.option);
        let last = this.page * this.activeRow?.option;
        let first = last - this.activeRow?.option;
        this.getTableData(first, last);
      }
    },

    startOver() {
      if (this.page > 1) {
        this.page = 1;
        let last = this.rowCount;
        this.getTableData(0, last);
      }
    },

    backward() {
      if (this.page > 1) {
        this.page = this.page - 1;
        let last = this.page * this.rowCount;
        let first = last - this.rowCount;
        this.getTableData(first, last);
      }
    },
    getWidth(id: string) {
      if (document.getElementById(id)) {
        let heightAtPlace: any = document
          .getElementById(id)
          ?.getBoundingClientRect().top;

        let innerHeight: any = (window as any).innerHeight;

        heightAtPlace && innerHeight && heightAtPlace - innerHeight < -150
          ? (this.isBottom = false)
          : (this.isBottom = true);
      }
    },
  },
  async created() {
    this.rowPerPage = this.pageDate;
    for (let item of this.rowPerPage) {
      item.option = item.option == "All" ? this.totLen : item.option;
    }
    this.rowPerPage.filter((el: any) => {
      el.option == this.rowCount ? (this.activeRow = el) : "";
    });
  },
});
</script>
<style></style>
