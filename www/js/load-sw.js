if (!"cordova" in window && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js", { scope: "./" })
    .then(function (reg) {});
}