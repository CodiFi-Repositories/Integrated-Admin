<script setup lang="ts"></script>

<template>
  <div>
    <notifications id="toaster_text" group="auth" position="top right" :classes="'my-notification'" :duration="4000"
      :speed="500" :ignoreDuplicates="false" :reverse="true" :closeOnClick="true" />
    <div class="h-[100vh] bg-[#f7f5f5]">
      <router-view></router-view>
      <notification />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notification from "../src/components/notification.vue";
export default defineComponent({
  components: { Notification },
  mounted() {
   
    var clientId = localStorage.getItem("IntegratedClientId");
    var sessionId = localStorage.getItem("IntegratedSessionId");
    if (!!clientId && !!sessionId) {
      this.$store.commit("setUserId", clientId);
      this.$store.commit("setSessionId", sessionId);
    }
  },
})
function formatDate(date: any, type: any) {
  let format = ''
  if (date) {
    let tempDate = new Date(date).getDate()
    let tempMonth = (new Date(date).getMonth() + 1)
    let tempYear = new Date(date).getFullYear()
    let tempHour = (new Date(date).getHours()).toString().padStart(2, '0')
    let tempMins = (new Date(date).getMinutes()).toString().padStart(2, '0')
    let tempSecs = (new Date(date).getSeconds()).toString().padStart(2, '0')
    if (type == 'D&T') {
      format = `${[tempDate > 9 ? tempDate : `0${tempDate}`, tempMonth > 9 ? tempMonth : `0${tempMonth}`, tempYear].join('-')} ${[tempHour, tempMins, tempSecs].join(':')}`
    }
    if (type == 'D') {
      format = [tempYear, tempMonth > 9 ? tempMonth : `0${tempMonth}`, tempDate > 9 ? tempDate : `0${tempDate}`].join('-')
    }
  }
  return format
}
(window as any).formatDate = formatDate
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.card {
  @apply w-full bg-[#ffffff];
}
</style>

<style>
.my-notification {
  margin: 12px 12px 8px 0px;
  padding: 8px;
  color: #44a4fc;
  height: 40px;
  background-color: #44a4fc;
  border-left: 5px solid #187fe7;
  border-radius: 2px;
}

.notification-content {
  @apply leading-5;
}

.notification-title {
  @apply mb-1 !text-sm;
}

.my-notification.success {
  color: #4caf50 !important;
  background-color: #f5fff5 !important;
  border-left: 5px solid #4caf50 !important;
  @apply font-semibold !text-xs;
}

.my-notification.error {
  background-color: #fff7f7;
  color: #e34242;
  border-left: 5px solid #e34242;
  @apply font-semibold !text-xs;
}

.my-notification.warn {
  background-color: #fffbf3;
  border-left: 5px solid #ff9900;
  color: #ff9900;
  @apply font-semibold !text-xs;
}

/*  */

.highlightHover:hover .changeColorHover {
  fill: #ffffff !important;
  transition: all ease 0.3s;
}

.changeColorHover {
  fill: #753ed7;
  transition: all ease 0.3s;
}

/* close option in taoster */
.my-notification .close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  /* Add your custom close icon */
  /* Example: using Font Awesome close icon */
  /* Make sure to include the corresponding CSS for the icon library */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00d";
  /* Close icon unicode */
  font-size: 14px;
}

.my-notification .close-button:hover {
  color: red;
  /* Change the color on hover if desired */
}

.z-index-full {
  z-index: 99 !important;
}

.active-filter {
  filter: invert(21%) sepia(83%) saturate(2456%) hue-rotate(196deg) brightness(94%) contrast(106%);
}
</style>
