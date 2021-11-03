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
    searchBar();
    
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
  };

  const searchBar = () => {
    let input = $("#tops-page input");
    input.on("keyup", () => { 
      filter = input[0].value.toUpperCase();
      article = $('#tops-page').find("article");
      for (i = 0; i < article.length; i++) {
        $(article[i]).children().each((key, value) => {
          text = $(value).text();
          if (text.toUpperCase().indexOf(filter) > -1) {
            article[i].style.display = "";
            return false;
          } else {
            article[i].style.display = "none";
          }
        });
      }
    });
  };

  return { init };
})();

APP.init();