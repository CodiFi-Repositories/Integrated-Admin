export default {
  data() {
    return {
      fandoValue: "Select a File",
    };
  },
  methods: {
    ///Gets value of files from form and saves it in respective variables
    handleFileChange(event, where) {
      const input = event.target;
      if (where == "FandO") {
        if (input.files && input.files[0]) {
          this.fandoValue = input.files[0].name;
        }
      }
      if (where == "cds") {
        if (input.files && input.files[0]) {
          this.cdsValue = input.files[0].name;
        }
      }
      if (where == "mcx") {
        if (input.files && input.files[0]) {
          this.mcxValue = input.files[0].name;
        }
      }
      if (where == "pandq") {
        if (input.files && input.files[0]) {
          this.priceAndQuantityValue = input.files[0].name;
        }
      }
      if (where == "symbolName") {
        if (input.files && input.files[0]) {
          this.symbolName = input.files[0].name;
        }
      }
    },
  },
};
