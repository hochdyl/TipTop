window.addEventListener("load", () => {
  if ("cordova" in window) {
  } else {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js", { scope: `${location.host}/` })
        .then(function (reg) {});
    }
  }
})