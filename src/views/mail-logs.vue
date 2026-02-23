<template>
  <div class="">
    <table class="w-full border table-fixed h-full" v-if="getMailLogs.length > 0">
      <thead>
        <tr class="border-b text-[13px]">
          <th class="border-r">
            {{ loginType == "SMS" ? "Mobile No" : "E-mail" }}
          </th>
          <th class="border-r">Request Log</th>
          <th class="border-r">Response Log</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getMailLogs" :key="index" class="border-b text-sm">
          <td class="text-center border-r">
            {{ loginType == "SMS" ? item.mobileNo : item.emailId }} {{}}
          </td>
          <td class="text-center border-r">
            <span v-if="loginType == 'SMS'">{{ item.requestLog }}</span>
            <span v-else class="flex justify-center items-center gap-3">
              {{ item.reqLogSub }}
              <!-- <button type="button" v-if="item.reqLog" class="negativeBackground text-white h-7 w-[120px] cursor-pointer rounded" @click="$store.commit('accessLog/setIsMailDial', true), bindData ={ data:item.reqLog ,  subject: item.reqLogSub}">check</button> -->
              <a v-if="item.reqLog" class="text-blue-500 cursor-pointer underline text-xs" @click="
      $store.commit('accessLog/setIsMailDial', true),
      (bindData = { data: item.reqLog, subject: item.reqLogSub })
      ">View</a>
            </span>
          </td>
          <td class="text-center border-r">{{ item.responseLog }}</td>
          <td class="text-center border-r">
            {{ formatDate(new Date(item.createdOn)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <mailReq v-if="isMailDial" :is-open="isMailDial" v-bind:show-data="bindData"
    v-on:mail-close="$store.commit('accessLog/setIsMailDial', false)" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import mailReq from "./mail-req.vue";
import commonFunc from "../mixins/commonFunc";
export default defineComponent({
  mixins: [commonFunc],
  name: "mail-logs",
  computed: {
    ...mapState("accessLog", ["loginType", "isMailDial"]),
    ...mapGetters("accessLog", ["getMailLogs"]),
  },

  setup() {
    const bindData = ref();
    return {
      bindData,
    };
  },
  components: {
    mailReq,
  },
});
</script>
