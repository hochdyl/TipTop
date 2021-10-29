var load = {
  sw: function () {
    if ("cordova" in window) {
    } else {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("sw.js", { scope: `${location.protocol}//${location.host}/` })
          .then(function (reg) {});
      }
    }
  }
};

window.addEventListener("load", () => {
  load.sw();
})