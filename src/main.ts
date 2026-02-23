import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "/tailwind/tailwind.css";
import router from "./router";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";
import directive from "./directives/outsideClick.ts";
import { MonthPicker } from "vue-month-picker";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import icons from "./components/icons.vue";
const app = createApp(App)
  .use(router)
  .use(store)
  .use(Notifications)
  .component("icons", icons)
  .use(Toast, { toastClassName: "custom", bodyClassName: ["custom"] });

app.directive("click-outside", directive);
// common components
import tab_menu from "./components/tabs.vue";
import btnLoader from "./components/btn-loader.vue";

app.component("tab-menu", tab_menu);
app.component("btnLoader", btnLoader);
// Use plugin defaults (optional)
app.use(setupCalendar, {});
// Use the components
app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);
app.component("MonthPicker", MonthPicker);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
