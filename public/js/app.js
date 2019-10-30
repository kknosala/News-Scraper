$(document).ready(() => {
  $("#scraper").on("click", function(event) {
    event.preventDefault();

    $.ajax("/scrape", {
      method: "GET"
    }).then(function() {
      location.reload(true);
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
    const favoriteId = this.value;
    const company = $(this).attr("company");

    $.ajax("/api/favorite/remove/" + company + "/" + favoriteId, {
      type: "PUT"
    }).then(function() {
      location.reload(true);
    });
  });

  $(".add-note").on("click", function(event) {
    event.preventDefault();
    const noteId = this.value;
    const noteCompany = $(this).attr("company");

    const title = $("#note-title")
      .val()
      .trim();
    const body = $("#note-text")
      .val()
      .trim();

    const newNote = {
      title: title,
      body: body
    };

    $.ajax("/api/notes/add/" + noteCompany + "/" + noteId, {
      method: "POST",
      data: newNote
    }).then(function() {
      // location.replace("/");
    });
  });
});
