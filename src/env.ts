let domain = "uat";

export function env() {
  return {
    BASEURL:
      domain == "live"
        ? "https://webtrade.integrated.investments/"
        : "https://webdev.integratedindia.in/",
    SSOREDIRECTURL:
      domain == "live"
        ? "https://webtrade.integrated.investments/"
        : "https://webdev.integratedindia.in/",

    APPCODE: "qDeBfpAgMJMloke",
  };
}
