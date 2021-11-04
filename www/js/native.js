const loadNative = () => {

  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);

  function onOffline() {
    navigator.vibrate(300)
    visualUpdate('offline', 'Vous êtes hors-ligne');
  }
  function onOnline() {
    navigator.vibrate(300)
    visualUpdate('online', 'Vous êtes en ligne');
  }
  function visualUpdate(status, text) {
    notification = $('<div>', {
      class: `notification ${status}`
    }).html(text).appendTo('main');
    notification.hide().fadeIn(500).delay(1500).fadeOut(500);
    if(status == 'offline'){
      const offlineSpan = `<span class="offline-span">Mode hors-ligne</span>`;
      $('nav').addClass('offline');
      $('<span>', {
        class: `offline-span`
      }).html('Mode hors-ligne').appendTo('nav');
    }else if(status =='online'){
      $('nav').removeClass('offline');
      $('.offline-span').remove();
    }
  }
  // window.screen.orientation.lock("landscape");
  // document.addEventListener("offline", () => toogleModalOffline(true), false);
  // document.addEventListener("online", () => toogleModalOffline(false), false);
};