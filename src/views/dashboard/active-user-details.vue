<template>
  <div class="p-5" v-if="!tabCondition">
    <ul
      role="list"
      class="grid gap-6 grid-cols-2 sm:grid-cols-4 max-w-[1152px] lg:grid-cols-5"
    >
      <li
        @click="getUserRecordDataFunc(i.source, id)"
        class="col-span-1 rounded-xl bg-white shadow h-[170px] p-4 cursor-pointer flex flex-col justify-center items-center"
        v-for="(i, id) in getUserTabs"
        :key="id"
        :class="{ 'bg-[#005CB9] border-[0.1px] border-[#c4daff]': i.active , 'min-w-[212px] w-fit' : i.type == 'User / Order Count'}"
      >
        <div
          class="mb-2 text-lg text-center"
          :class="{ 'text-[#174EA6]': i.active, primaryColor: !i.active }"
        >
          {{ i.type }}
        </div>
        <div
          class="font-black text-3xl whitespace-nowrap"
          :class="{ 'text-[#174EA6]': i.active, secondaryColor: !i.active }"
        >
          {{ i.count }}
        </div>
      </li>
    </ul>
  </div>
  <usersListingTable
    v-if="!tabCondition && !activeUserLoginCondition"
  ></usersListingTable>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import usersListingTable from "./users-listing-table.vue";
export default defineComponent({
  components: { usersListingTable },
  setup() {
    const tabCondition = ref(false);
    return { tabCondition };
  },

  methods: {
    getUserCount() {
      this.$store.dispatch("dash/getSeperateUserCount");
    },
    getUserRecordDataFunc(source: any, index: any) {
      this.$store.commit("dash/setActiveTab", index);
      this.$store.commit("dash/activeUserLoginCondition", true);
      if (source != "" && source != "orderCount") {
        this.$store.dispatch("dash/getUserRecordData", source);
      }
    },
  },
  computed: {
    ...mapGetters("dash", ["getUserTabs"]),
    ...mapGetters("dash", ["getTotalCount"]),
    ...mapGetters("dash", ["getUserRecordData"]),
    ...mapGetters("dash", ["activeUserLoginCondition"]),
    ...mapState("dash", ["tab", "downloadValue"]),
  },

  created() {
    this.$store.dispatch("dash/getSeperateUserCount");
    this.$store.commit("dash/setActiveTab", 0);
  },

  mounted() {
    this.$store.dispatch("dash/getUserRecordData", "UniqueUser");
    this.$store.dispatch("dash/getOrderLogs");
  },
  async unmounted() {},
});
</script>
