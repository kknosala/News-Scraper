$(document).ready(() => {
  $("#scraper").on("click", function(event) {
    event.preventDefault();

    $.ajax("/scrape", {
      method: "GET"
    }).then(function() {
      location.replace("/");
    });
  });

  $(".favorite").on("click", function(event) {
    event.preventDefault();
    const favoriteId = this.value;
    const company = $(this).attr("company");

    $.ajax("/api/favorite/add/" + company + "/" + favoriteId, {
      type: "PUT"
    }).then(function() {
      $(`#${favoriteId}`).text("Added to favorites.");
    });
  });

  $(".unfavorite").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    const favoriteId = this.value;
    const company = $(this).attr("company");

    $.ajax("/api/favorite/remove/" + company + "/" + favoriteId, {
      type: "PUT"
    }).then(function() {
      location.reload(true);
    });
  });
});
