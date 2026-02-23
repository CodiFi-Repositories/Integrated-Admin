<template>
  <span>
    <svg fill="none" stroke="currentColor" v-if="name == 'datePicker'" stroke-width="1.5" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5">
      </path>
    </svg>

    <svg v-if="name == 'leftArrow'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>

    <svg v-if="name == 'rightArrow'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

    <svg v-if="name == 'leftEndArrow'" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"></path>
    </svg>
    <svg v-if="name == 'rightEndArrow'" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"></path>
    </svg>
    <svg v-if="name == 'headerDropdown'" width="16" height="9" viewBox="0 0 16 9" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0319 0.657387C14.9203 0.548349 14.7704 0.487305 14.6144 0.487305C14.4584 0.487305 14.3085 0.548349 14.1969 0.657387L7.94815 6.74864L1.70065 0.657387C1.58903 0.548349 1.43919 0.487305 1.28315 0.487305C1.12711 0.487305 0.977266 0.548349 0.865649 0.657387C0.811219 0.710382 0.767959 0.773744 0.73842 0.843733C0.70888 0.913722 0.693663 0.988919 0.693663 1.06489C0.693663 1.14085 0.70888 1.21605 0.73842 1.28604C0.767959 1.35603 0.811219 1.41939 0.865649 1.47239L7.5119 7.94989C7.62862 8.06365 7.78516 8.12733 7.94815 8.12733C8.11114 8.12733 8.26768 8.06365 8.3844 7.94989L15.0306 1.47239C15.0851 1.41939 15.1283 1.35603 15.1579 1.28604C15.1874 1.21605 15.2026 1.14085 15.2026 1.06489C15.2026 0.988919 15.1874 0.913722 15.1579 0.843733C15.1283 0.773744 15.0851 0.710382 15.0306 0.657387H15.0319Z"
        fill="#414042" />
    </svg>
    <svg v-if="name == 'downArrow'" width="10" height="6" viewBox="0 0 10 6" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.93722 3.66576L1.60546 0.333996C1.42912 0.158701 1.19057 0.0603089 0.941928 0.0603089C0.693282 0.0603089 0.45474 0.158701 0.278398 0.333996C0.190183 0.42149 0.120165 0.525586 0.0723828 0.640277C0.0246005 0.754968 0 0.877985 0 1.00223C0 1.12648 0.0246005 1.24949 0.0723828 1.36419C0.120165 1.47888 0.190183 1.58297 0.278398 1.67047L4.26899 5.66105C4.35648 5.74927 4.46058 5.81929 4.57527 5.86707C4.68996 5.91485 4.81298 5.93945 4.93722 5.93945C5.06147 5.93945 5.18448 5.91485 5.29918 5.86707C5.41387 5.81929 5.51796 5.74927 5.60546 5.66105L9.6431 1.67047C9.73033 1.58252 9.79935 1.47823 9.84618 1.36355C9.89302 1.24888 9.91676 1.1261 9.91605 1.00223C9.91676 0.878366 9.89302 0.755579 9.84618 0.640908C9.79935 0.526237 9.73033 0.421939 9.6431 0.333996C9.46676 0.158701 9.22822 0.0603089 8.97958 0.0603089C8.73093 0.0603089 8.49239 0.158701 8.31605 0.333996L4.93722 3.66576Z"
        fill="#414042" />
    </svg>

    <svg v-if="name == 'editicon'"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto text-blue-500 hover:text-blue-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="name == 'delete'" stroke-width="1.5" stroke="currentColor" class="size-5  text-[#005CB9] hover:text-[#005CB9]">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { mapGetters } from 'vuex';

export default defineComponent({
  props: {
    name: String,
    width: String,
    height: String,
    color: String,
    classStr: String,
    fillColor: String,
  },
  // computed: {
  //       ...mapGetters(['getTheme'])
  //   },
});
</script>
