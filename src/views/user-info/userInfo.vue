<template>
  <div>
    <div class="">
      <tab-menu @activeTab="changeTab" />
    </div>
    <div class="p-4" v-if="validTab == 0">
      <div class="card p-4 h-full rounded border">
        <form @submit.prevent="getUserDetailsApi()" class="gap-4">
          <div class="flex justify-between">
            <div class="flex grid sm:grid-cols-1 btwn_sm-md:grid-cols-2 md:grid-cols-3">
              <div class="">
                <p class="primaryColor pb-1 text-sm ml-2">Mobile No. / Email / Client ID</p>
                <input type="text" v-model="userID"
                  class="border min-w-[200px] h-10 rounded focus:outline-0 px-4 text-xs" />

                <div class="h-4 mt-1 text-red-500 text-xs ml-2">
                  <span v-if="submitted && userID == ''">User ID is required</span>
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
                <button type="button"
                  class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-4"
                  @click="addUser()">
                  + Add User
                </button>
              </div>
            </div>
            <div class="download pt-10" v-if="getUserDetails.length > 0">
              <button type="button"
                class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-10" @click="
        downloadUnicodeCSV(getUserDetails, 'User Details', header)
        ">
                Download
              </button>
            </div>
          </div>
        </form>

        <div class="border rounded overflow-auto" v-if="getUserDetails.length > 0">
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th v-for="head in header" class="border-r">
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in getUserDetails" :key="id">
                <td class="border-r border-b text-center">
                  {{ i["User Name"] }}
                </td>
                <td class="border-r border-b text-center">{{ i.Email }}</td>
                <td class="border-r border-b text-center">
                  {{ i["User Enabled"] }}
                </td>
                <td class="border-r border-b text-center">
                  {{ i["Email Verified"] }}
                </td>
                <td class="border-r border-b text-center">
                  {{ i["First Name"] }}
                </td>
                <td class="border-r border-b text-center">
                  {{ i["Last Name"] }}
                </td>
                <td class="border-r border-b text-center">
                  {{ i.Mobile }}
                </td>
                <td class="border-r border-b text-center">{{ i.Pan }}</td>
                <td class="border-r border-b flex items-center justify-around">
                  <!--  -->
                  <a class="text-blue-400 cursor-pointer" @click="updateUser(i)" v-html="editSvg"></a>
                  <div class="min-w-[20px]">
                    <a v-if="!i?.['User Enabled']" class="text-blue-400 cursor-pointer" :class="getLoader ? 'cursor-not-allowed' : 'cursor-pointer'
        " @click="getLoader ? '' : unblockUser(i)" v-html="unblockSvg"></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <blockUsers v-if="validTab == 1" />
  <unblockUsers v-if="validTab == 2" />
  <authorizeUnblock :c-data="unblockData" v-if="getAuthorizeUnblockDialog" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
const editSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
`;
const unblockSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

`;
import blockUsers from "../user-info/blockUsers.vue";
import unblockUsers from "./unblockUsers.vue";
import commonFunc from "../../mixins/commonFunc";
import authorizeUnblock from "./authorizeUnblock.vue";
export default defineComponent({
  mixins: [commonFunc],
  components: { blockUsers, unblockUsers, authorizeUnblock },
  setup() {
    const tabs = ref(["Login Based", "User Based"]);
    const userID = ref("");
    const submitted = ref(false);
    const validTab = ref(0);
    const header = ref([
      { name: "User Name", csvKey: "User Name" },
      { name: "E-Mail", csvKey: "Email" },
      { name: "User Enabled", csvKey: "User Enabled" },
      { name: "Email Verified", csvKey: "Email Verified" },
      { name: "First Name", csvKey: "First Name" },
      { name: "Last Name", csvKey: "Last Name" },
      { name: "Mobile", csvKey: "Mobile" },
      { name: "PAN", csvKey: "Pan" },
      { name: "Action" },
    ]);
    const keys = ref({
      "User Name": "User Name",
      "E-Mail": "Email",
      "User Enabled": "User Enabled",
      "Email Verified": "Email Verified",
      "First Name": "First Name",
      "Last Name": "Last Name",
      Mobile: "Mobile",
      PAN: "Pan",
    });
    const unblockData = ref({});
    return {
      tabs,
      userID,
      editSvg,
      submitted,
      validTab,
      header,
      keys,
      unblockSvg,
      unblockData
    };
  },
  name: "test-table",
  computed: {
    ...mapGetters("user", [
      "getUserDetails",
      "getLoader",
      "getAuthorizeUnblockDialog",
    ]),
  },
  methods: {
    changeTab(data: any) {
      this.validTab = data;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data,
      });
      this.$store.commit("setActivePageTab", data);
      this.$store.commit("setQuries", {
        data: { tab: data },
        action: "change",
      });
    },
    getUserDetailsApi() {
      this.submitted = true;
      if (this.userID != "") {
        let json = {
          userId: this.userID,
        };
        this.$store.dispatch("user/getUserDetails", json);
      }
    },
    addUser() {
      this.$router.push("/addOrEditUser");
    },
    updateUser(data: any) {
      localStorage.setItem("currentEditData", JSON.stringify(data));
      this.$router.push("/addOrEditUser?edit=true");
    },
    unblockUser(data: any) {
      // let key = data?.ucc;

      // this.$store.dispatch("user/unblockUser", key);
      this.unblockData = data;
      this.$store.commit("user/setAuthorizeUnblockDialog", true);
    },
  },
  created() {
    this.$store.commit("user/setUserDetails", []);
    this.changeTab(this.$store.state.queries["userInfo"].query.tab);
    this.$store.commit(
      "setActivePageTab",
      this.$store.state.queries["userInfo"].query.tab
    );
  },
});
</script>
