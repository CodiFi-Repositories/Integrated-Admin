<template>
  <amoSwitches />

  <section>
    <div class="p-5 h-full">
      <div class="bg-white p-4 border rounded">
        <div class="flex justify-end items-center">
          <button
            type="button"
            class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            @click="addSession()"
          >
            <span v-if="!getLoader">Add Session</span>
            <svg
              v-if="getLoader"
              class="animate-spin h-5 w-5 text-white flex mx-auto"
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
        </div>

        <div class="border rounded mt-2" v-if="getAmoSessionData.length">
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="border-r text-center">
                  {{ head.name }}
                </th>
                <!-- <th class="border-r text-center">S.NO</th>
              <th class="border-r">Version</th>
              <th class="border-r">Device Type</th>
              <th class="border-r">OS</th>
              <th class="border-r">Update Available</th>
              <th class="border-r">Actions</th> -->
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(i, id) in getAmoSessionData"
                :key="id"
                class="border-b"
              >
                <td class="text-center border-r border-[#ededed]">
                  {{ i.exchange ? i.exchange : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.date ? i.date : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.amoStart ? i.amoStart : "-" }}
                </td>
                <td class="text-center border-r border-[#ededed]">
                  {{ i.amoEnd ? i.amoEnd : "-" }}
                </td>
                <td
                  class="text-center border-r border-[#ededed] flex items-center justify-center gap-3 w-full"
                >
                  <figure class="cursor-pointer" v-if="i.date">
                    <span v-html="editSvg" @click="editAmo(i)"></span>
                  </figure>
                  <figure class="cursor-pointer" v-if="i.date">
                    <span v-html="deleteSvg" @click="deleteAmo(i)"></span>
                  </figure>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <commonPagination
          v-if="getAmoSessionData && getAmoSessionData.length"
          v-on:page-chg="getTableData"
          :tot-len="getAmoSessionData.length"
          :page-date="rowsPerPage"
          :row-count="rowsCount"
        /> -->
      </div>
    </div>
  </section>
  <amoHolidays />
  <deleteAmoComponent
    v-if="deleteHolidayDialog"
    delete-from="amo"
    :amo-session="deleteAmoData"
  />
  <amoCreateSession
    v-if="getIsCreateSessionDialog"
    :amoData="modifyAmoData"
    :isModify="isModify"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
const deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
`;
const editSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
`;
import deleteAmoComponent from "../delete-holiday.vue";
import { mapGetters, mapState } from "vuex";
//import commonPagination from "../../components/commonPagination.vue";
import commonFunc from "../../../mixins/commonFunc";
import amoSwitches from "./amoSwitches.vue";
import amoCreateSession from "./amoCreateSession.vue";
import amoHolidays from "./amoHolidays.vue";
export default defineComponent({
  setup() {
    const header = ref([
      { name: "Exchange", csvKey: "exchange" },
      { name: "Date", csvKey: "date" },
      { name: "AMO Start", csvKey: "amoStart" },
      { name: "AMO End", csvKey: "amoEnd" },
      { name: "Actions" },
    ]);
    //const rowsCount = ref(20);
    // const showData = ref();
    // const rowsPerPage = ref([
    //   { id: 0, option: 10 },
    //   { id: 1, option: 20 },
    //   { id: 2, option: 30 },
    //   { id: 3, option: 50 },
    //   { id: 4, option: 100 },
    //   { id: 5, option: "All" },
    // ]);
    const deleteAmoData: any = ref("");
    const isModify = ref(false);
    const modifyAmoData: any = ref("");
    return {
      header,
      deleteSvg,
      // rowsPerPage,
      // rowsCount,
      // showData,
      editSvg,
      deleteAmoData,
      isModify,
      modifyAmoData,
    };
  },
  mixins: [commonFunc],
  components: {
    // commonPagination,
    amoSwitches,
    deleteAmoComponent,
    amoCreateSession,
    amoHolidays,
  },
  computed: {
    ...mapGetters("amoControls", [
      "getAmoSessionData",
      "getLoader",
      "getIsCreateSessionDialog",
    ]),
    ...mapState("settings", ["deleteHolidayDialog"]),
  },
  mounted() {
    this.$store.dispatch("amoControls/getAmoSession");
    this.$store.dispatch("amoControls/getAmoHolidays");
    // .finally(() => {
    //   var data = {
    //     from: 0,
    //     last: this.rowsCount,
    //     count: this.rowsCount,
    //   };
    //   this.getTableData(data);
    // });
  },
  methods: {
    // getTableData(data: any) {
    //   this.rowsCount = data.count;
    //   let fromIndex = data.from;
    //   let lastIndex =
    //     data.last == "" ? this.getAmoSessionData.length : data.last;
    //   if (this.getAmoSessionData && this.getAmoSessionData.length > 0) {
    //     this.showData = this.getAmoSessionData.slice(fromIndex, lastIndex);
    //   } else {
    //     this.showData = [];
    //   }
    // },
    deleteAmo(data: any) {
      this.$store.commit("settings/setDeleteHolidayDialog", true);
      this.deleteAmoData = data;
    },
    editAmo(item: any) {
      this.modifyAmoData = item;
      this.isModify = true;
      this.$store.commit("amoControls/setIsCreateSessionDialog", true);
    },
    addSession() {
      this.modifyAmoData = "";
      this.isModify = false;
      this.$store.commit("amoControls/setIsCreateSessionDialog", true);
    },
  },
});
</script>
