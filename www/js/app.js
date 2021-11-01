APP = (() => {
  let currPage = 0; // [Tops, View, Add]
  const pages = [$('#tops-page'), $('#view-page'), $('#add-page')];
  const init = () => {
    if ("cordova" in window) {
      document.addEventListener("deviceready", loadReady());
    } else {
      document.addEventListener("DOMContentLoaded", loadReady());
    }
  };

  const loadReady = () => {
    pages[currPage].removeClass("hidden");

    getTops((tops) => {
      topsPage(tops);
      
      $(document).on("click", ".top", function() {
          changePage(1);
          viewPage(tops, $(this).data('top-id'));
      });

      $(document).on("click", ".add-btn", function() {
        changePage(2);
      });

      $(document).on("click", "nav img, nav span", function() {
        changePage(0);
        topsPage(tops);
      });
    });
  };

  const changePage = (pageKey) => {
    pages.forEach(page => {
      page.addClass("hidden");
      page.empty();
    });
    pages[pageKey].removeClass("hidden");
  }

  return { init };
})();

APP.init();