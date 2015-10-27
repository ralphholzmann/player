(function () {
  var TEN_SECONDS = 10 * 1000;

  function getUpdates () {
    $.get("/update.json", function (update) {
      console.log("updates", update);


      // Update Your HTML Here

      setTimeout(getUpdates, TEN_SECONDS);
    });
  }

  getUpdates();
})();
