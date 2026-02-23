import { mapGetters, mapState } from "vuex";
import router from "../router/index.ts";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("logs", {
      webUserCount: "getWebUserCount",
      mobileUserCount: "getMobileUserCount",
      apiUserCount: "getApiUserCount",
      userLogCount: "getUserLogCount",
    }),
    // ...mapState(["localItems"]),
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
      ];
      var months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
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

    // isLogout() {
    //   router.push("/?logout=true");
    // },

    /***Method to create and download CSV File */

    downloadUnicodeCSV(objArray, downloadValue, header) {
      var arr = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;

      // let keysArr = Object.keys(arr[0]);
      let headerKeys = [];

      header.forEach((el) => {
        if (el.csvKey != "sno") {
          headerKeys.push(el.csvKey);
        }
      });

      arr.forEach((element) => {
        const orderedObj = {};

        headerKeys.forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(element, key)) {
            orderedObj[key] = element[key];
          }
        });

        // Clear the original keys
        for (const key in element) {
          delete element[key];
        }

        // Assign reordered keys to the original object
        Object.assign(element, orderedObj);
      });
      var str = "";
      `${header.forEach((el) => {
        Object.keys(arr[0]).map((value) => {
          if (value == el.csvKey) {
            str = str + `"${el.name}"` + ",";
          }
        });
      })}`;

      str = str + "\r\n";

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
      element.download = `${downloadValue}.csv`;
      element.click();
    },

    downloadDashboardUnicodeCSVFile(objArray, downloadValue) {
      var arr = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
      var str =
        `${Object.keys(arr[0])
          .map((value) => `"${value}"`)
          .join(",")}` + "\r\n";
      var csvContent = arr.reduce((st, next) => {
        st +=
          `${Object.values(next)
            .map((value) =>  `"${value ? value : ''}"`)
            .join(",")}` + "\r\n";
        return st;
      }, str);
      var element = document.createElement("a");
      element.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
      element.target = "_blank";
      element.download = `${downloadValue}.csv`;
      element.click();
    },

    ruppesFormat(num) {
      var n1, n2;
      num = num + "" || "";
      // Works for integer and floating as well
      n1 = num.split(".");
      n2 = n1[1] || null;
      n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      num = n2 ? n1 + "." + n2 : n1;
      return num;
    },

    downloadResearch(dataArray, headers, fileName = "ResearchData") {
      if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("No data available to download");
        return;
      }
      // Create CSV headers
      const csvHeaders = headers
        .map((header) => `"${header.name}"`) // Assuming headers array contains `name` for column titles
        .join(",") + "\r\n";
    
      // Map data to CSV rows
      const csvRows = dataArray.reduce((csvContent, row) => {
        const csvRow = headers
          .map((header) => {
            const value = row[header.csvKey] ? row[header.csvKey] : 'NA';
            return `"${value !== undefined && value !== null ? value : ""}"`;
          })
          .join(",");
        return csvContent + csvRow + "\r\n";
      }, csvHeaders);
    
      // Create a downloadable link
      const element = document.createElement("a");
      element.href = "data:text/csv;charset=utf-8," + encodeURI(csvRows);
      element.target = "_blank";
      element.download = `${fileName}.csv`;
    
      // Trigger download
      element.click();
    },
    

    getDate() {
      const obj = { date };
      const date = new Date(obj.date * 1000);
    },
    keyPressAlphaNumeric(event) {
      var inp = String.fromCharCode(event.keyCode);
      if (event.keyCode != 13) {
        if (/[a-zA-Z0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      let hours = date.getHours();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
    },

    downloadNew(data, keyVal, fileName){
      let keysObj = Object.keys(keyVal)
      const csvData = []

      for(let item of data){
        let temp = {}
        for(let key of keysObj){
          temp[key] =  item[keyVal[key]] ? key == 'Response' ? `"\""${item[keyVal[key]]}"\""` : item[keyVal[key]] : ''
        }
        csvData.push(temp)
      }
       // get keys as array
    const keys = Object?.keys(csvData[0]);
    
    const commaSeparatedString = [keys.join(",") , csvData.map(row => keys.map(key => row[key]).join(",")).join("\n")].join("\n")

    const csvBlob = new Blob([commaSeparatedString])

    const link =document.createElement('a')
    const url =  URL.createObjectURL(csvBlob)
    link.setAttribute('href', url);
    var tempFileName =  `${fileName}.csv`
    link.setAttribute('download', tempFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();  
    }
  },
};
