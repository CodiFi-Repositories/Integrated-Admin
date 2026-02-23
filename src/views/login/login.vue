<template>
  <div class="flex flex-1 flex-col px-4 sm:px-6 lg:px-8 items-center justify-center h-full">
    <div class="relative flex flex-1 flex-col py-16 w-[380px] items-center justify-center h-full">
      <div class="">
        <img src="../../assets/menu/Integrated_logo.svg" alt="logo" class="mx-auto" />
      </div>
      <form @submit.prevent="loginSubmit()" class="w-full">
        <div class="flex mt-8 w-full">
          <div class="w-full h-auto m-4">
            <div class="card p-4">
              <p>Email Id</p>
              <input type="text" ref="userId" class="border w-full h-10 rounded focus:outline-0 px-4"
                @keydown="errorUserId = ''" v-model="userId" />
              <p class="text-sm text-red-500 pt-1">{{ errorUserId }}</p>
              <p class="mt-4">Password</p>
              <input type="text" class="border w-full h-10 rounded focus:outline-0 px-4" @keydown="errorPassword = ''"
                v-model="password" />
              <p class="text-sm text-red-500 pt-1">{{ errorPassword }}</p>
              <button type="submit" class="h-10 bg-blue-500 w-full text-white rounded mt-8">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div> 

  <!--  -->
  <!--  -->
  <!-- <div
    class="flex items-center justify-center"
    style="height: 100vh !important"
  >
    <div v-if="isParamAvailable">
      <img height="60" width="60" :src="spinnerGig" alt="loading" />
    </div>

    <div class="max-w-[400px] flex flex-col" v-if="$route.query.logout">
      <div class="text-base mb-2 text-center"><strong>Admin Panel</strong></div>
      <div class="mb-4 flex justify-center">
        <img src="../../assets/Integrated.svg" alt="logo" class="mx-auto" />
      </div>
      <div class="flex text-sm justify-start">
        You have successfully logged out. If you wish to continue with login, please click below
      </div>
      <div v-if="error_message">{{ error_message }}</div>
      <button
       type="submit" class="h-[44px] w-full border-[#1D4481] border text-[#1D4481] rounded-[10px] text-sm"
        @click="
          login();
          error_message = null;
        "
      >
        Continue to Web
      </button>
    </div>

    <div v-if="getErrorMsg != ''">{{ getErrorMsg }}</div>
  </div>
  <div class="w-screen h-screen flex items-center justify-center">
    <div
      class="bg-white p-6 shadow-lg rounded-lg max-w-[380px] w-[380px]"
      v-if="$route.query.logout"
    >
      <div class="text-base font-bold mb-4 text-center">Admin Panel</div>
      <div class="text-base font-bold mb-4 flex items-center justify-center">
        <img src="/src/assets/menu/Integrated_logo.svg" alt="" srcset="" />
      </div>
      <div class="flex mb-4">
        <svg
          xmlns="/src/assets/menu/Integrated_logo.svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style="width: 50px"
        >
          <path
            d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z"
            fill="orange"
          ></path>
          <path d="M11 16H13V18H11V16Z" fill="orange"></path>
        </svg>
        <div v-if="!getErrorMsg" class="text-sm">
          You have successfully logged out. If you wish to continue with login,
          please click below
        </div>
        <div v-else>{{ getErrorMsg }}</div>
      </div>
      <button
        type="submit"
        class="h-[44px] w-full border-[#1D4481] border text-[#1D4481] rounded-[10px] text-sm"
        @click="login()"
      >
        Continue to Web
      </button>
    </div>
  </div> -->
</template>

<script>
import spinnerGig from "../../assets/spinner.gif";
import { mapGetters } from "vuex";
import { env } from "../../env.ts";
export default {
  data() {
    return {
      userId: "",
      password: "",
      errorUserId: "",
      errorPassword: "",
      active: false,
      spinnerGig,
      isParamAvailable: false,
      appcode: "hRnpoejBWrZSPeS",
    };
  },
  computed: {
    ...mapGetters("auth", ["getErrorMsg"]),
  },
  methods: {
    login() {
      window.location.href = `${env().SSOREDIRECTURL}?appcode=${env().APPCODE}`;
    },
    loginSubmit() {
      if(this.userId && this.password && this.userId == "admin@codifi.in" && this.password == "Codifi&8"){
        localStorage.setItem("IntegratedClientId", "admin");
        this.$store.commit("setUserId", "admin");
        this.$router.push('/dashboard')
      }else{
        this.errorUserId = 'Enter your valid Email Id'
        this.errorPassword = 'Enter your valid password'
      }
    }
  },
  created() {
    // if (this.$route.query.authCode) {
    //   this.isParamAvil = true;
    //   this.$store.dispatch("auth/getData", this.$route.query.authCode);
    // } else if (this.$route.query.logout) {
    // } else {
    //   this.login();
    // }
  },
};
</script>
