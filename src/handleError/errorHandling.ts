import router from "../router/index";
import store from "../store/index.ts";
// import { NullUndefined } from "../_helpers/nullUndefinedCheck.js";
// import { useNotification } from "@kyvg/vue3-notification";
import commonFunc from "../mixins/commonFunc.js";

// const { notify } = useNotification();
export default {
  data: () => {},
  mixins: [commonFunc],

  methods: {
    errorHandle(error: any) {
      if (store.state.counter == 0) {
        if (router.currentRoute.value.path != "/") {
          var json = {
            title: error.response?.status,
            message: error.response.status == 413 && error.response.data ? error.response.data :
              error.response.status == 401
                ? "Your session has been invalidated. Kindly re-login"
                : error.response.status == 404
                ? "We'II Be Back Soon"
                : "Something went wrong. Please try again later",
            status: "",
            comment: "",
            type: "danger",
            show: true,
            key: new Date().getTime(),
          };
          store.commit("setNotification", json, { root: true });
        }
      }
      if (
        error.response.status != 404 && error.response.status != 413 && 
        error.response.status > 400 &&
        error.response.status < 500 &&
        store.state.counter == 0
      ) {
        // this.localClear();
        store.commit("setCounter", 1);
      }
    },

    localClear() {
      store.state.counter = 0;
      router.push("/");
      store.state.localItems.forEach((element: any) => {
        !!localStorage.getItem(element) ? localStorage.removeItem(element) : "";
      });
    },
  },
};
