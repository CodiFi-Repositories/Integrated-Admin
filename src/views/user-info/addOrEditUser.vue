<template>
  <div class="w-full overflow-hidden p-4">
    <form @submit.prevent="handleSubmit()">
      <div class="min-w-full sm:p-3 lg:p-4 grid grid-cols-12 w-[100%] bg-white rounded border">
        <div class="break-after-column col-span-3">
          <div class="">
            <p class="text-sm font-bold mb-4 primaryColor">
              {{ isEdit ? "Edit User" : "Add New User" }}
            </p>
          </div>
        </div>
        <div class="col-span-5 bg-white pl-[20px]">
          <div class="mb-5 flex flex-col">
            <div class="flex flex-col gap-2">
              <label class="userid text-sm ml-2">User ID <span class="required text-red-600">*</span></label>
              <input type="text"
                class="border w-full h-10 rounded focus:outline-0 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500 px-4 py-2 min-w-[160px] flex justify-end"
                v-model="userID" maxlength="15" />
              <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                <span v-if="submitted && userID == ''">User ID should not be empty</span>
              </div>
            </div>
            <div class="flex gap-2 justify-between">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="firstname text-sm ml-2">First Name
                  <span class="required text-red-600">*</span></label>
                <input type="text"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                  v-model="firstName" maxlength="50" />

                <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                  <span v-if="submitted && firstName == ''">First Name should not be empty</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm ml-2">Last Name</label>
                <input type="text"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                  v-model="lastName" maxlength="50" />
                <div class="h-4 mb-2 text-red-500 text-xs"></div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="emailid text-sm ml-2">E-Mail ID <span class="required text-red-600">*</span></label>
              <input type="text"
                class="border w-full h-10 rounded focus:outline-0 px-4 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                v-model="emailID" maxlength="50" />
              <div class="h-4 mb-2 text-red-500 ml-2 text-xs">
                <span v-if="submitted && emailID == ''">E-Mail ID should not be empty</span>
              </div>
            </div>
            <div class="flex gap-2 justify-between">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="pan text-sm ml-2">PAN Number
                  <span class="required text-red-600">*</span></label>
                <input type="text" maxlength="10"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                  v-model="pan" @input="pan ? (pan = pan.toUpperCase()) : ''"
                  @keypress="keyPressAlphaNumeric($event)" />
                <div class="h-4 mb-2 text-red-500 ml-2 text-xs">
                  <span v-if="submitted && pan == ''">Pan should not be empty</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="mob text-sm ml-2">Mobile No <span class="required text-red-600">*</span></label>
                <input type="text" maxlength="10"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                  v-model="mobile" @input="digitKeyOnly($event)" />
                <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                  <span v-if="submitted && mobile == ''">Mobile Number should not be empty</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 justify-between" v-if="!isEdit">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="marital ml-2 text-sm">Marital Status
                  <span class="required text-red-600">*</span></label>
                <select v-model="maritalStatus"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-sm focus:border-blue-500 hover:border-black focus:caret-blue-500">
                  <option disabled selected hidden value="options">
                    Select
                  </option>
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                </select>
                <div class="h-4 mb-2 text-red-500 ml-2 text-xs">
                  <span v-if="submitted && maritalStatus == 'options' && !isEdit">Marital Status should not be
                    empty</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="gender text-sm ml-2">Gender <span class="required text-red-600">*</span></label>
                <select v-model="gender"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-sm focus:border-blue-500 hover:border-black focus:caret-blue-500">
                  <option disabled selected hidden value="options">
                    Select
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                <div class="h-4 mb-2 ml-2 text-red-500 text-xs">
                  <span v-if="submitted && gender == 'options' && !isEdit">Gender should not be empty</span>
                </div>
              </div>
            </div>

            <div class="flex items-center my-4">
              <p class="deatailsHead whitespace-nowrap min-w-[100px] text-sm">
                User Enabled
              </p>
              <a class="px-[68px] min-w-[160px] flex justify-end" @click="handleEnabledSwitch()">
                <span class="text-sm pr-2" :class="{
      'secondary-color': !enabledSwitch,
      'text-[#3B82F6]': enabledSwitch,
    }"></span>
                <button type="button"
                  class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-[#753ED7] focus:ring-offset-2">
                  <span aria-hidden="true"
                    class="pointer-events-none absolute h-full w-full rounded-md bg-white dark:bg-[#181818]" />
                  <span aria-hidden="true" :class="[
      !enabledSwitch
        ? 'bg-gray-200 dark:bg-gray-600'
        : 'bg-[#3B82F6] dark:bg-gray-600',
      'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
    ]" />
                  <span aria-hidden="true" :class="[
      !enabledSwitch ? 'translate-x-0' : 'translate-x-5',
      'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-zinc-800 shadow ring-0 transition-transform duration-200 ease-in-out',
    ]" />
                </button>
                <span class="text-sm pl-2" :class="{
      'secondary-color': !enabledSwitch,
      'text-[#3B82F6]': enabledSwitch,
    }"></span>
              </a>
            </div>

            <div class="flex items-center my-4">
              <p class="deatailsHead whitespace-nowrap min-w-[100px] text-sm">
                Email Verified
              </p>
              <a class="px-[68px] min-w-[160px] flex justify-end" @click="handleEmailVerifiedSwitch()">
                <span class="text-sm pr-2" :class="{
      'secondary-color': !emailVerifiedSwitch,
      'text-[#3B82F6]': emailVerifiedSwitch,
    }"></span>
                <button type="button"
                  class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-[#753ED7] focus:ring-offset-2">
                  <span aria-hidden="true"
                    class="pointer-events-none absolute h-full w-full rounded-md bg-white dark:bg-[#181818]" />
                  <span aria-hidden="true" :class="[
      !emailVerifiedSwitch
        ? 'bg-gray-200 dark:bg-gray-600'
        : 'bg-[#3B82F6] dark:bg-gray-600',
      'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
    ]" />
                  <span aria-hidden="true" :class="[
      !emailVerifiedSwitch ? 'translate-x-0' : 'translate-x-5',
      'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-zinc-800 shadow ring-0 transition-transform duration-200 ease-in-out',
    ]" />
                </button>
                <span class="text-sm pl-2" :class="{
      'secondary-color': !emailVerifiedSwitch,
      'text-[#3B82F6]': emailVerifiedSwitch,
    }"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-span-4 bg-white"></div>
      </div>
      <div class="min-w-full sm:p-3 lg:p-4 grid grid-cols-12 w-[100%] bg-white rounded border mt-5" v-if="isEdit">
        <div class="break-after-column col-span-3">
          <div class="text-sm font-bold mb-4 primaryColor">Update Role</div>
        </div>

        <div class="col-span-5 bg-white pl-[20px] flex items-center">
          <div class="flex items-center my-2 cursor-pointer">
            <input id="default-radio-1" type="radio" :checked="admincheck" @click="admincheck = !admincheck"
              name="default-radio"
              class="w-10 h-5 ml-2 text-blue-600 flex flex-shrink-0 cursor-pointer px-2 justify-end rounded-full" />
            <label for="default-radio-1"
              class="deatailsHead whitespace-nowrap min-w-[100px] text-sm cursor-pointer">Admin</label>
          </div>
          <div class="mt-[10px]">
            <button @click="updateRole"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs" :disabled="getLoader">
              <p v-if="!getLoader">Update</p>
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
      <div class="h-full flex items-top justify-end w-[100%] gap-4">
        <div class="mt-[10px]">
          <input
            class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            type="button" value="Cancel" @click="goBack()" />
        </div>
        <div class="mt-[10px]">
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
          <!-- <input
            class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            :disabled="getLoader"
            type="submit"
            value="Submit"
            v-if="!getLoader"
          /> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunc";
export default defineComponent({
  mixins: [commonFunc],
  setup() {
    const firstName: any = ref("");
    const lastName: any = ref("");
    const userID: any = ref("");
    const emailID: any = ref("");
    // const enabled = ref(false)
    // const emailVerified = ref(false)
    const mobile: any = ref("");
    const pan: any = ref("");
    const maritalStatus: any = ref("options");
    const gender: any = ref("options");
    const submitted: any = ref(false);
    const currentData: any = ref("");
    const enabledSwitch: any = ref(false);
    const emailVerifiedSwitch: any = ref(false);
    const isEdit: any = ref(false);
    const admincheck = ref(false)
    return {
      firstName,
      lastName,
      userID,
      emailID,
      mobile,
      pan,
      maritalStatus,
      gender,
      submitted,
      currentData,
      enabledSwitch,
      emailVerifiedSwitch,
      isEdit,
      admincheck
    };
  },
  computed: {
    ...mapGetters("user", ["getLoader"]),
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      if (this.validateForm() && this.isEdit) {
        let json = {
          username: this.userID,
          enabled: this.enabledSwitch,
          emailVerified: this.emailVerifiedSwitch,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.emailID,
          attributes: {
            ucc: this.userID || this.currentData.attributes.ucc[0],
            mobile: this.mobile,
            pan: this.pan,
            maritalStatus: this.currentData.attributes.maritalStatus ? this.currentData.attributes.maritalStatus[0] : undefined,
            gender: this.currentData.attributes.gender ? this.currentData.attributes.gender[0] : undefined,
          },
        };
        await this.$store.dispatch("user/updateUserDetails", json);
      } else if (this.validateForm() && !this.isEdit) {
        let json = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.userID,
          email: this.emailID,
          enabled: true,
          emailVerified: true,
          attributes: {
            ucc: this.userID,
            mobile: this.mobile,
            pan: this.pan,
            maritalStatus: this.maritalStatus,
            gender: this.gender,
          },
        };
        await this.$store.dispatch("user/addUserKeyCloak", json);
      }
    },
    goBack() {
      this.$store.commit("user/setUserDetails", []);
      this.$router.push("/userInfo");
    },
    setEditData() {
      if (this.currentData) {
        this.userID = this.currentData["User Name"] || undefined;
        this.firstName = this.currentData["First Name"] || undefined;
        this.lastName = this.currentData["Last Name"] || undefined;
        this.emailID = this.currentData["Email"] || undefined;
        this.enabledSwitch = this.currentData["User Enabled"] || undefined;
        this.emailVerifiedSwitch =
          this.currentData["Email Verified"] || undefined;
        this.mobile = this.currentData["Mobile"] || undefined;
        this.pan = this.currentData["Pan"] || undefined;
        if (this.currentData.role) {
          this.admincheck = this.currentData.role.includes("admin") ? true : false
        }
      }
    },
    handleEnabledSwitch() {
      this.enabledSwitch = !this.enabledSwitch;
    },
    handleEmailVerifiedSwitch() {
      this.emailVerifiedSwitch = !this.emailVerifiedSwitch;
    },
    validateForm() {
      if (this.isEdit) {
        return this.userID != "" && this.firstName != "";
      } else {
        return (
          this.userID != "" &&
          this.firstName != "" &&
          this.maritalStatus != "options" &&
          this.gender != "options"
        );
      }
    },

    digitKeyOnly(event: Event) {
      // Allow only numeric values in the input field
      let value: any = (event.target as HTMLInputElement).value
        ?.toString()
        ?.replace(/[^0-9]/g, "");
      if (value) this.mobile = value;
    },
    async updateRole() {
      if (this.admincheck) {
        await this.$store.dispatch("user/getUpdateAdminuser");
      } else {
        await this.$store.dispatch("user/getDeleteAdminuser");
      }
    }
  },
  created() {
    let currentEditData = JSON.parse(localStorage.getItem("currentEditData")!);
    if (
      currentEditData &&
      this.$route.query.edit == "true" &&
      currentEditData != ""
    ) {
      this.isEdit = true;
      this.currentData = currentEditData;
      this.$store.commit("user/setUserDetails", [this.currentData]);
      this.setEditData();
    }
  },
});
</script>
