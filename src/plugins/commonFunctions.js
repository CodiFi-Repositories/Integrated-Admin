import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("logs", {
      webUserCount: "getWebUserCount",
      mobileUserCount: "getMobileUserCount",
      apiUserCount: "getApiUserCount",
      userLogCount: "getUserLogCount",
    }),
  },
  methods: {
    // format date
    getDateString(date, format) {
      var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        // var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        getPaddedComp = function (comp) {
          return parseInt(comp) < 10 ? "0" + comp : comp;
        },
        formattedDate = format,
        o = {
          "y+": date.getFullYear(), // year
          "M+": months[date.getMonth()], //month
          "d+": getPaddedComp(date.getDate()), //day
          "h+": getPaddedComp(
            date.getHours() > 12 ? date.getHours() % 12 : date.getHours()
          ), //hour
          "H+": getPaddedComp(date.getHours()), //hour
          "m+": getPaddedComp(date.getMinutes()), //minute
          "s+": getPaddedComp(date.getSeconds()), //second
          "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
          "b+": date.getHours() >= 12 ? "PM" : "AM",
        };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
      }
      return formattedDate;
    },
    getDayFromDate(date) {
      var dt = new Date(date);
      if (dt.getDay() == 0) {
        return "Sunday";
      } else if (dt.getDay() == 1) {
        return "Monday";
      } else if (dt.getDay() == 2) {
        return "Tuesday";
      } else if (dt.getDay() == 3) {
        return "Wednesday";
      } else if (dt.getDay() == 4) {
        return "Thursday";
      } else if (dt.getDay() == 5) {
        return "Friday";
      } else if (dt.getDay() == 6) {
        return "Saturday";
      }
    },

    /***Method to create and download CSV File */

    downloadUnicodeCSV(objArray) {
      var arr = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
      var str =
        `${Object.keys(arr[0])
          .map((value) => `"${value}"`)
          .join(",")}` + "\r\n";
      var csvContent = arr.reduce((st, next) => {
        st +=
          `${Object.values(next)
            .map((value) => `"${value}"`)
            .join(",")}` + "\r\n";
        return st;
      }, str);
      var element = document.createElement("a");
      element.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
      element.target = "_blank";
      element.download = "Document.csv";
      element.click();
    },

    ruppesFormat(num) {
      var n1, n2;
      num = num + "" || "";
      // works for integer and floating as well
      n1 = num.split(".");
      n2 = n1[1] || null;
      n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      num = n2 ? n1 + "." + n2 : n1;
      return num;
    },

    getDate() {
      const obj = { date };
      const date = new Date(obj.date * 1000);
    },
  },
};
