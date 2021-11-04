APP = (() => {
  let currPage = 0; // [Tops, View, Add]
  const pages = [$('#tops-page'), $('#view-page'), $('#add-page')];
  const topLengthLimit = 5;
  const init = () => {
    if ("cordova" in window) {
      document.addEventListener("deviceready", loadComplete());
    } else {
      document.addEventListener("DOMContentLoaded", loadComplete());
    }
  };

  const loadComplete = () => {
    pages[currPage].removeClass("hidden");

    addLocalStorage("cached_tops").then(() => {
      tops = getLocalStorage("cached_tops");

      buildTopsPage(tops);
      addTopMedia();
      searchBar();
      
      $(document).on("click", ".top", function() {
        changePage(1);
        buildViewPage(tops, $(this).data('top-id'));
      });

      $(document).on("click", ".add-top-btn", function() {
        changePage(2);
      });

      $(document).on("click", "nav img, nav span", function() {
        changePage(0);
        buildTopsPage(tops);
      });
    }).catch(() => {
      console.log('error');
    });
  };

  const changePage = (pageKey) => {
    pages.forEach(page => {
      page.addClass("hidden");
      page.find('.reload').empty();
    });
    pages[pageKey].removeClass("hidden");
  };

  const searchBar = () => {
    let input = $("#searchBar");
    input.on("keyup", () => { 
      filter = input[0].value.toUpperCase();
      tops = $('#tops-container').find(".top");
      for (i = 0; i < tops.length; i++) {
        $(tops[i]).children().each((key, value) => {
          text = $(value).text();
          if (text.toUpperCase().indexOf(filter) > -1) {
            tops[i].style.display = "";
            return false;
          } else {
            tops[i].style.display = "none";
          }
        });
      }
    });
  };

  const addTopMedia = () => {
    let row = 1;
    const table = $("#media-table tbody");
    const rowBtn = $(".row-btn");
    const addRow = $("#addRow");
    const delRow = $("#delRow");

    rowBtn.on("click", (self) => {
      self.target.id == "addRow" ? 
        row < topLengthLimit ? addRowAction() : null : 
        row > 1 ? delRowAction() : null ;
    });

    function addRowAction() {
      row <= 1 ? delRow.removeClass("disabled") : null;
      row += 1;
      addMediaRow(row);
      row >= topLengthLimit ? addRow.addClass("disabled") : null;
    };
    function delRowAction() {
      row >= topLengthLimit ? addRow.removeClass("disabled") : null;
      row -= 1;
      table.find('tr').last().remove();
      row <= 1 ? delRow.addClass("disabled") : null;
    };

  };

  return { init };
})();

APP.init();