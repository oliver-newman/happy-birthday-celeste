$(document).ready(function() {
  setTimeout(function() {
    $("#hbd").css("display", "inline");
    console.log("working");
  }, 1000);
});

$("#letter-button").click(function() {
  $("#letter").css("display", "inline");
});
