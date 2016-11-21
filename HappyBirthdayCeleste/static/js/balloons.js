var width = Math.min(window.innerWidth, screen.width);
var height = Math.min(window.innerHeight, screen.height);
var scene = sjs.Scene({w: width, h: height, autoPause: false});

$(document).ready(function() {
  playBalloons();

  $("#letter-button").click(function() { // Show letter when button is clicked
    $("#letter").slideDown();
  });
  $("#close-letter").click(function() { // Hide letter when x is clicked
    $("#letter").slideUp();
  });
  $("#repeat-balloons").click(function() { // Repeat balloon animation
    $("#letter").slideUp(complete = function () {
      $("#hbd").fadeOut(600, playBalloons)
    });
  });
});


function playBalloons() {
  var ticker;

  document.body.addEventListener("balloonsGone", function () {
    $("#hbd").fadeIn(600);
    scene.reset();
  }, false);

  var colors = ["blue", "green", "orange", "pink", "red", "yellow"];
  var images = [];
  for (var i = 0; i < colors.length; i++) {
    images.push("/static/images/" + colors[i] + "_balloon.png");
  }

  var numBalloons = Math.floor(width / 8);
  var balloons = sjs.List([]);
  var lastBalloon;
  var balloonsGone;

  scene.loadImages(images, function() {
    var filename;
    var balloon;
    for (var i = 0; i < numBalloons; i++) {
      filename = images[i % images.length];
      
      balloon = scene.Sprite(filename);
      var yRand = Math.random();
      balloon.position((31 * i) % width - 100, height * (1 + yRand*yRand * 1.5));

      balloons.add(balloon);
    }

    balloonsGone = new CustomEvent("balloonsGone");
    lastBalloon = scene.Sprite(images[0]);
    lastBalloon.position(width / 2, 2.5 * height);
    lastBalloon.update();
    balloons.add(lastBalloon);

    function paint() {
      var balloon;
      while(balloon = balloons.iterate()) {
        balloon.update();
        balloon.move(0, -5 + Math.random() * 3);
      }
      if (lastBalloon.y + 1.5 * lastBalloon.h < 0) {
        document.body.dispatchEvent(balloonsGone);
      }
    }

    ticker = scene.Ticker(25, paint);
    ticker.run();
  });
}
