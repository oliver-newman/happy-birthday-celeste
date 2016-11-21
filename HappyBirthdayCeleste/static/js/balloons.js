$(document).ready(function() {
  var ticker, scene;
  document.body.addEventListener("balloonsGone", function () {
    // $("#hbd").css("display", "inline");
    $("#hbd").fadeIn(600);
    scene.reset();
    delete scene;
  }, false);

  var width = Math.min(window.innerWidth, screen.width);
  var height = Math.min(window.innerHeight, screen.height);
  scene = sjs.Scene({w: width, h: height, autoPause: false});

  var colors = ["blue", "green", "orange", "pink", "red", "yellow"];
  var images = [];

  for (var i = 0; i < colors.length; i++) {
    images.push("/static/images/" + colors[i] + "_balloon.png");
  }

  var numBalloons = Math.floor(width / 8);
  var balloons = sjs.List();
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

    ticker = scene.Ticker(25, paint);
    ticker.run();
  });

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

  $("#letter-button").click(function() {
    $("#letter").css("display", "inline");
  });
});

