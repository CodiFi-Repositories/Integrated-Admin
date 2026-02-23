<template>
  <div>
    <tab-menu />
    <div class="p-4 h-full">
      <div class="card p-4 rounded border">
        <!-- <form
          @submit.prevent="getVendorData()"
          class="gap-2 grid grid-cols-1 sm:grid-cols-1 btwn_sm-md:grid-cols-5 md:grid-cols-3 lg:grid-cols-10 xl:grid-cols-10"
        >
          <div class="sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <p class="primaryColor pb-1 text-sm ml-2">User ID</p>
            <input
              type="text"
              v-model="userId"
              maxlength="10"
              class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs"
            />
            <div class="h-4 mb text-red-500 text-xs mt-1">
              <span v-if="submitted && userId == ''">User ID is required</span>
            </div>
          </div>
          <div
            class="sm-col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 xl:mr-30 flex mt-1 items-center"
          >
            <button
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            >
              <p v-if="!getLoader">Submit</p>
              <svg
                v-else
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
            <div
              v-if="getVendorList.length > 0"
              class="gap-4 flex items-start ml-2"
            >
              <button
                type="button"
                :disabled="getLoader"
                class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                @click="
                  downloadUnicodeCSV(getVendorList, `${userId} VENDORS`, header)
                "
              >
                <p v-if="!getLoader">Download</p>
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
          </div>
        </form> -->
        <form @submit.prevent="getVendorData()" class="gap-4">
          <div class="flex justify-between">
            <div class="flex grid sm:grid-cols-1 btwn_sm-md:grid-cols-2 md:grid-cols-3">
              <div class="">
                <p class="primaryColor pb-1 text-sm ml-2">User ID</p>
                <input type="text" v-model="userId" maxlength="10"
                  class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs" />

                <div class="h-4 mt-1 text-red-500 text-xs ml-2">
                  <span v-if="submitted && userId == ''">User ID is required</span>
                </div>
              </div>
              <div class="flex mt-1 items-center">
                <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                  :disabled="getLoader">
                  <p v-if="!getLoader">Submit</p>
                  <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                    xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </button>
                <div class="ml-3 w-[120px]">
                  <button v-if="getVendorList.length > 0"
                    class="negativeBackground text-white h-10 cursor-pointer rounded text-xs w-[120px]" type="button"
                    :disabled="getLoader" @click="
          downloadUnicodeCSV(
            getVendorList,
            `${userId} VENDORS`,
            header
          )
          ">
                    <p v-if="!getLoader">Download</p>
                    <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                      xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="p-5 mt-2" v-if="getVendorList?.length">
          <div>
            <table class="border rounded w-full">
              <thead class="text-[13px]">
                <tr class="border-b">
                  <th v-for="head in header" class="border-r text-center">
                    {{ head.name }}
                  </th>
                  <!-- <th class="border-r text-center">Name</th>
                                <th class="border-r">Appcode</th>
                                <th class="border-r">Status</th>
                                <th class="">Action</th> -->
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="(i, id) in showData" :key="id" class="border-b">
                  <td class="border-r text-center">{{ i.appName }}</td>
                  <td class="border-r text-center">{{ i.apiKey }}</td>
                  <td class="border-r text-center">
                    <button class="px-4 py-1 text-xs rounded min-w-[82px] cursor-default" :class="i.authorization_status == 'Active'
            ? 'bg-green-50 text-green-600'
            : 'bg-red-50 text-red-600'
          ">
                      {{ i.authorization_status }}
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="px-4 py-1 text-xs rounded negativeBackground min-w-[106px]" :class="i.authorization_status == 'Active'
            ? 'bg-green-50 text-green-600'
            : 'bg-red-50 text-red-600'
          " @click="handleAuthorize(i)">
                      {{
          i.authorization_status == "Inactive"
            ? "Unauthorize"
            : "Authorize"
        }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <commonPagination v-if="getVendorList && getVendorList.length" v-on:page-chg="getTableData"
            :tot-len="getVendorList.length" :page-date="rowsPerPage" :row-count="rowsCount" />
        </div>
        <AuthorizeDialog v-if="getAuthorizeDialog" :cData="currentData" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import AuthorizeDialog from "./authorize-dialog.vue";
import commonFunc from "../../mixins/commonFunc";
import commonPagination from "../../components/commonPagination.vue";
export default defineComponent({
  setup() {
    const userId = ref("");
    const submitted = ref(false);
    const currentData = ref([]);
    const header = ref([
      { name: "Name", csvKey: "appName" },
      { name: "Appcode", csvKey: "apiKey" },
      { name: "Status", csvKey: "authorization_status" },
      { name: "Action" },
    ]);
    const rowsCount = ref(20);
    const showData = ref();
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
      { id: 5, option: "All" },
    ]);
    return {
      userId,
      submitted,
      currentData,
      header,
      rowsCount,
      showData,
      rowsPerPage,
    };
  },
  computed: {
    ...mapGetters("vendor", [
      "getVendorList",
      "getLoader",
      "getAuthorizeDialog",
    ]),
  },
  methods: {
    getVendorData() {
      this.submitted = true;
      if (this.userId != "") {
        let json = {
          client_id: this.userId,
        };
        this.$store.dispatch("vendor/getVendors", json).finally(() => {
          var data = {
            from: 0,
            last: this.rowsCount,
            count: this.rowsCount,
          };
          this.getTableData(data);
        });
      }
    },
    getTableData(data: any) {
      this.rowsCount = data.count;
      let fromIndex = data.from;
      let lastIndex = data.last == "" ? this.getVendorList.length : data.last;
      if (this.getVendorList && this.getVendorList.length > 0) {
        this.showData = this.getVendorList.slice(fromIndex, lastIndex);
      } else {
        this.showData = [];
      }
    },
    handleAuthorize(i: any) {
      this.currentData = i;
      this.$store.commit("vendor/setAuthorizeDialog", true);
    },
  },
  components: { AuthorizeDialog, commonPagination },
  mixins: [commonFunc],
  unmounted() {
    this.$store.commit("vendor/setVendorList", []);
  },
  created() {
    this.$store.commit(
      "setActivePageTab",
      this.$store.state.queries["notify"].query.tab
    );
  },
});
</script>
