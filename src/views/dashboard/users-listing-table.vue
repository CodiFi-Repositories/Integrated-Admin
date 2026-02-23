<template>
  <div class="p-5 rounded-xl" v-if="!loader">
    <div
      class="card p-5 border rounded-xl bg-white shadow-sm"
      v-if="
        (activepagetab == 'orderCount' && orderLogsDetails.length > 0) ||
        getUserRecordData?.length > 0
      "
    >
      <form class="w-full flex justify-between pb-4">
        <div>
          <!-- <button type="button"  v-if="filteredList?.length > 0"
                      class="my-2 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        ref="cancelButtonRef" @click="$store.commit('dash/activeUserLoginCondition', false)">
                        Back
                    </button> -->
        </div>
        <div class="flex gap-2">
          <div class="w-full items-end">
            <input
              type="search"
              v-model="search"
              placeholder="Search"
              maxlength="10"
              @blur="search = ''"
              class="border font-light min-w-[200px] h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            />
          </div>
          <div class="w-[120px] h-10">
            <div class="flex items-start" v-if="filteredList?.length != 0">
              <button
                class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
                type="button"
                @click="
                  downloadNew(
                    filteredList,
                    keys[activepagetab],
                    `${activepagetab}_userDetails`
                  )
                "
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </form>
      <table class="border rounded-s w-full py-2">
        <thead class="text-[13px]">
          <tr class="border-b">
            <th
              v-for="(header, i) in tableHeaders[activepagetab as keyof typeof tableHeaders]"
              :key="i"
              v-if="filteredList?.length > 0"
              class="border-r"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr
            v-for="(i, id) in filteredList"
            :key="id"
            v-if="filteredList?.length > 0"
          >
            <td class="border-r border-b text-center">{{ id + 1 }}</td>
            <td class="border-r border-b text-center">{{ i.userId }}</td>
            <td
              v-if="activepagetab == 'UniqueUser'"
              class="border-r border-b text-center"
            >
              {{ i.source }}
            </td>
            <td
              v-if="
                activepagetab != 'UniqueUser' && activepagetab != 'orderCount'
              "
              class="border-r border-b text-center"
            >
              {{ i.Time || i.createdOn || "" }}
            </td>
            <td
              v-if="activepagetab == 'mob'"
              class="border-r border-b text-center"
            >
              {{ i.deviceType || "" }}
            </td>
            <td
              v-if="activepagetab == 'orderCount'"
              class="border-r border-b text-center"
            >
              {{ i.count || "" }}
            </td>
          </tr>
        </tbody>
      </table>

      <noData v-if="filteredList?.length == 0"></noData>
    </div>
    <noData
      v-if="
        (activepagetab == 'orderCount' && orderLogsDetails.length == 0) ||
        getUserRecordData?.length == 0
      "
    ></noData>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/commonFunc";

export default defineComponent({
  name: "activeUserLoginCondition",
  mixins: [commonFunc],
  components: { noData },
  data() {
    const search = ref("");
    let tableHeaders = ref({
      UniqueUser: ["S.NO", "UserID", "Source"],
      web: ["S.NO", "UserID", "Time"],
      mob: ["S.NO", "UserID", "Time", "Device Type"],
      api: ["S.NO", "UserID", "Time"],
      orderCount: ["S.NO", "UserID", "Count"],
    });
    const keys: any = ref({
      UniqueUser: {
        UserId: "userId",
        Source: "source",
      },
      web: {
        UserID: "userId",
        Time: "Time",
      },
      mob: {
        UserID: "userId",
        Time: "Time",
        "Device Type": "deviceType",
      },
      api: {
        UserID: "userId",
        Time: "Time",
      },
    });

    return {
      search,
      tableHeaders,
      keys,
    };
  },
  methods: {},
  computed: {
    ...mapGetters("dash", [
      "activeUserLoginCondition",
      "getUserRecordData",
      "setUserCount",
    ]),
    ...mapGetters("dash", { loader: "getLoader" }),
    ...mapState("dash", ["tab", "activepagetab", "orderLogsDetails"]),
    filteredList() {
      let arr =
        this.activepagetab == "orderCount"
          ? this.orderLogsDetails
          : this.getUserRecordData;
      return arr.filter((el: any) => {
        if (el.userId) {
          return (
            el.userId
              ?.toString()
              .toLowerCase()
              .includes(this.search.toString().toLowerCase()) ||
            el.deviceType
              ?.toString()
              .toLowerCase()
              .includes(this.search.toString().toLowerCase())
          );
        } else {
          return arr.el;
        }
      });
    },
  },

  unmounted() {
    this.$store.commit("dash/activeUserLoginCondition", false);
  },
});
</script>
<style></style>
