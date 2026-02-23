<style scoped></style>

<template>
  <div class="w-full">
    <div class="  h-[56px] border-b border-[#E0E0E0] flex items-center justify-between px-4 ">
      <div class="flex ">
        <div class="lg:hidden mt-[18px]  px-auto">
          <burgerMenu />
        </div>
        <div class=" lg:w-[60px] border-[#E0E0E0]  border-r-2  h-[56px] items-center flex	">
          <img src="../assets/menu/Integrated_logo.svg" @click="navigateToFirstTab" alt=""
            class="max-w-[80%] h-10  lg:block hidden " />
        </div>
        <div class="ml-3 flex items-center uppercase primaryColor">Integrated - Admin / <span class="capitalize ml-1">{{
            $route.name }}</span></div>
      </div>
      <div class="text-sm">
        {{ getUserId }} ,
        <p class="text-blue-500 cursor-pointer" @click="logout()">Logout</p>
      </div>
    </div>
  </div>
</template>

<script>
import burgerMenu from "../components/hamburgerMenu.vue";
import { mapGetters, mapState } from "vuex";
import commonFunc from "../mixins/commonFunc";
import { defineComponent, ref } from "vue";
import errorHandling from "../handleError/errorHandling";
export default defineComponent({
  components: {
    burgerMenu,
  },
  data() {
    return {
      steps: [
        {
          name: "Dashboard",
          route: "/dashboard",
          icon: "Reports",
          status: "active",
          active: true,
          svg: "home",
        },
        {
          name: "User Info",
          route: "/userInfo",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "user",
        },
        {
          name: "Logs",
          route: "/logs",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "orders",
        },
        {
          name: "Notify",
          route: "/notify",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "newsIcon",
        },
        {
          name: "research",
          route: "/research",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "newsIcon",
        },
        {
          name: "Contracts",
          route: "/contracts",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "holdings",
        },
        {
          name: "Reports",
          route: "/report",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "funds",
        },
        {
          name: "Vendors",
          route: "/vendors",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "user",
        },
        {
          name: "Settings",
          route: "/settings",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "settings",
        },
      ],
    }
  },

  computed: {
    ...mapGetters(["getUserId"]),
    ...mapState(["localItems"]),
  },
  mixins: [commonFunc, errorHandling],
  methods: {
    logout() {
      this.$store.commit("setLogoutCondition", true);
    },
    navigateToFirstTab() {
      this.$router.push({ name: 'dashboard' });
      this.setActiveTab(this.steps[0])
    },
    setActiveTab(val) {
      this.steps.forEach((el) => {
        if (el.name == val.name) {
          el.active = true;

        } else {
          el.active = false;
        }
      });
    },
  },
  created() { },
});
</script>
