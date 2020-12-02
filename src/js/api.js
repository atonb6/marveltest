var marvel = {
  render: function () {
    var url =
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0a74b9534733afa9ce2f76b512f13ce8&hash=f7d5b5b321ead510b2a25eeb192e066b";
    var message = document.getElementById("message");
    var footer = document.getElementById("footer");
    var marvelContainer = document.getElementById("marvel-container");

    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function () {
        message.innerHTML = "Cargando...";
      },
      complete: function () {
        message.innerHTML = "";
      },
      success: function (data) {
        footer.innerHTML = data.attributionHTML;
        var string = "";
        string += "<div class='row justify-content-center'>";

        for (var i = 0; i < data.data.results.length; i++) {
          var element = data.data.results[i];

          string += "<div class='col-sm-3 mt-4 '>";
          string += "<div class='card marvel-container__card item'>";
          string +=
            " <img src='" +
            element.thumbnail.path +
            "/portrait_uncanny." +
            element.thumbnail.extension +
            "' />";
          string += "<div class='card marvel-container__card__data '>";
          string += "<h3 class='text-center'>" + element.name + "</h3>";
          string += "<h6 class='text-center'>" + element.modified + "</h6>";
          string += "</div>";
          string += "</div>";
          string += "</div>";

          /*             if((i+1) %4 == 0){
                string += "</div>";
                string += "<div class='row'>";
            } */
        }
        marvelContainer.innerHTML = string;
        //Match Height
        $(".item").matchHeight({
          byRow: true,
        });

        marvel.infinite();
      },
      error: function () {
        message.innerHTML = "Perdón, ocurrió un error";
      },
    });
  },

  infinite: function () {
    //button load more
    $(".marvel-container__card").hide();
    if ($(".marvel-container .marvel-container__card").length <= 3) {
      $("#loadMore").addClass("hidden");
    }

    $(".marvel-container .marvel-container__card").slice(0, 4).show();

    $("#loadMore").on("click", function (e) {
      e.preventDefault();
      $(".marvel-container .marvel-container__card:hidden")
        .slice(0, 4)
        .slideDown();
      if ($(".marvel-container .marvel-container__card:hidden").length == 0) {
        $("#loadMore").text("No Content").addClass("hidden");
      }
      $("html,body").animate(
        {
          scrollTop: $(this).offset().top,
        },
        1500
      );
    });
  },
};

marvel.render();

//Search

$(function () {
  var _myContentArea = document.getElementById("myContentArea");
  var _mySearchButton = document.getElementById("mySearchButton");
  var _myCleanButton = document.getElementById("myCleanButton");
  var _myResponseArea = document.getElementById("myResponseArea");
  _mySearchButton.onclick = getData;
  _myCleanButton.onclick = clear;


  function getData() {
    var _mySearchField = document.getElementById("mySearchField");
    $.ajax({
      url:
        "http://gateway.marvel.com/v1/public/characters?name=" +
        _mySearchField.value +
        "&ts=1&apikey=0a74b9534733afa9ce2f76b512f13ce8&hash=f7d5b5b321ead510b2a25eeb192e066b",
      method: "GET",
      dataType: "json",

      beforeSend: function () {
        _myResponseArea.innerHTML = "Buscando...";
      },
      success: function (data) {
        _myResponseArea.innerHTML = " ";
        var str = "";
        for (var i = 0; i < data.data.results.length; i++) {
          var element = data.data.results[i];

          str += "<div class='col-md-12 mt-3 mb-3'>";
          str += "<div class='card marvel-container__card'>";
          str +=
            " <img src='" +
            element.thumbnail.path +
            "/portrait_fantastic." +
            element.thumbnail.extension +
            "' />";
            str += "<div class='card marvel-container__card__data '>";
            str += "<h3 class='text-center'>" + element.name + "</h3>";
            str += "<h6 class='text-center'>" + element.modified + "</h6>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
        }
        if (data.data.results.length == 0) {
          _myResponseArea.innerHTML = "No se encontró Personaje";
        } else {
          _myContentArea.innerHTML = str;
        }
      },
      error: function () {
        _myResponseArea.innerHTML = "Debe escribir un nombre";
      },
    });
  }

  function clear(){
    var _mySearchField = document.getElementById("mySearchField");
    _mySearchField.value = " ";
    _myContentArea.innerHTML = " ";
  }
});
