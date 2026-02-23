<template>

  <div>
    <div>
      <nav aria-label="Progress">
        <ol role="list" class="space-y-2">
          <li v-for="(step, index) in steps" :key="index" class="md:flex-1 py-2 hover:active-filter "
            @click="activeTab(step)"
            :class="{ 'border-l-4 border-[#005CB9] bg-[#fdc0c3e1]': step.route == $route.path }">
            <div class="cursor-pointer">
              <div @mouseover="hoverIdx = index" @mouseleave="hoverIdx = -1"
                class="flex flex-col items-center justify-center cursor-pointer min-h-[32px] "
                :class="{ '!text-[#005CB9]': (step.route == $route.path && hoverIdx != index), primaryColor: !step.route == $route.path, 'active-filter': hoverIdx == index }">
                <span><img :class="{ activeImg: (step.route == $route.path && hoverIdx != index) }"
                    class="max-w-[76%] h-auto mx-auto" :src="getImageSrc(step)" :alt="step.svg" /></span>
                <span class="font-medium text-xs text-center" :class="{'!text-[#005CB9]': (step.route == $route.path && hoverIdx != index), primaryColor: !step.route == $route.path, 'active-filter': hoverIdx == index }">{{ step.name
                  }}</span>
              </div>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
import router from "../router"
export default {
  components: { router },
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
        // {
        //  name: "File Upload",
        //  route: "/fileupload",
        //  icon: "Reports",
        //  status: "active",
        //  active: false,
        //  svg: "upload",
        // }, 
        // {
        //   name: "Notify",
        //   route: "/notify",
        //   icon: "Reports",
        //   status: "active",
        //   active: false,
        //   svg: "newsIcon",
        // },
        // {
        //   name: "Research",
        //   route: "/research",
        //   icon: "Reports",
        //   status: "active",
        //   active: false,
        //   svg: "newsIcon",
        // },
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
        // {
        //   name: "Vendors",
        //   route: "/vendors",
        //   icon: "Reports",
        //   status: "active",
        //   active: false,
        //   svg: "user",
        // },
        {
          name: "Settings",
          route: "/settings",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "settings",
        }, 
      ],
      hoverIdx: -1
    }
  },
  methods: {

    activeTab(val, id) {
      router.push(val.route);
      this.setActiveTab(val)
      this.$store.commit('setOpenMenu', false)
    },
    getImageSrc(step) {
      const imgUrl = new URL(`../assets/menu/${step.svg}.svg`, import.meta.url)
        .href;
      return imgUrl;
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

  mounted() {
    let index = this.steps.findIndex((el) => {
      el.route == this.$route.path
    })

    if (index > -1) {
      this.setActiveTab(this.steps[index])
    }
  }
};
</script>