$(document).ready(() => {
  $(".favorite").on("click", function(event) {
    event.preventDefault();
    const favoriteId = this.value;
    const company = $(this).attr("company");

    $.ajax("/api/favorite/add/" + company + "/" + favoriteId, {
      type: "PUT"
    }).then(function() {
      console.log("Added to favorites");
    });
  });
});
