<style scoped>
.menu-wrapper {
  width: 16px;
  height: auto;
  cursor: pointer;
  position: relative;
}

.menu-bar {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #a2a2a2;
  left: 0%;
}

/* .menu-wrapper:hover .menu-bar {
animation-duration: 1s;
  animation-name: slideOut;
  animation-direction: alternate;
  animation-timing-function: ease-out;
} */

.one {
  top: 0px;
  animation-delay: 0.1s;
  transition: all 0.3s;
}

.two {
  top: 8px;
  transition: all 0.3s;
}

.three {
  top: 16px;
  transition: all 0.3s;
}

@keyframes slideOut {
  0% {
    width: 100%;
    left: 0%;
    right: auto;
  }

  50% {
    width: 0%;
    left: 0%;
    right: auto;
  }

  51% {
    width: 0%;
    right: 0%;
    left: auto;
  }

  100% {
    width: 100%;
    right: 0%;
    left: auto;
  }
}

/**/

.menu-wrapper:hover .menu-bar.active {
  animation: none;
}

.active .one {
  top: 50%;
  left: 0%;
  transform: rotate(45deg);
}

.active .two {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}

.active .three {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}
</style>

<template>
  <div>
    <div v-if="!$store.state.openMenu" class="w-[63px] flex pl-[18px]">
      <div class="menu-wrapper z-[9999]" @click="$store.commit('setOpenMenu', !$store.state.openMenu)"
        :class="{ active: $store.state.openMenu }">
        <div class="menu-bar one"></div>
        <div class="menu-bar two"></div>
        <div class="menu-bar three"></div>
      </div>
    </div>
    <div v-if="$store.state.openMenu" class="w-[63px]">
      <div v-click-outside="close"
        class="min-h-full bg-white   shadow-2xl ring-1 ring-black/10 translate-x-0 top-0 fixed left-0 z-[999]">
        <div class=" w-full h-[62px] border-b border-[#E0E0E0] flex items-center pl-4 	">
          <img src="../assets/menu/Integrated_logo.svg" alt="" class="max-w-[80%] h-10 lg:hidden block " />
        </div>

        <div class="border-r w-[80px]  overflow-y-auto overflow-x-hidden">
          <sidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import router from "../router";
import commonIcon from "../components/commonicon.vue";
import sidebar from "../views/sidebar.vue"
export default {
  data() {
    return {
    };

  },
  methods: {
    activeTab(val) {
      this.$store.commit('setOpenMenu', false)
    },
    close() {
      this.$store.commit('setOpenMenu', false)
    }
  },
  components: {
    CheckCircleIcon,
    commonIcon,
    sidebar,
    router,
  },
};
</script>
