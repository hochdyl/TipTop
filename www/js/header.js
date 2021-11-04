var load = {
  sw: function () {
    if ("cordova" in window) {
      navigator.serviceWorker
      .register("sw.js", { scope: "./" })
      .then(function (reg) {});
    } else {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("sw.js", { scope: "./" })
          .then(function (reg) {});
      }
    }
  }
};

window.addEventListener("load", () => {
  load.sw();
})