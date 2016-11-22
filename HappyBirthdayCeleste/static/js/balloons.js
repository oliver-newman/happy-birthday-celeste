$(document).ready(function() {
  const width = Math.min(window.innerWidth, screen.width);
  const height = Math.min(window.innerHeight, screen.height);
  const scene = sjs.Scene({w: width, h: height, autoPause: false});

  playBalloons(scene, width, height);

  $("#letter-button").click(function() { // Show letter when button is clicked
    $("#letter").slideDown();
  });
  $("#close-letter").click(function() { // Hide letter when x is clicked
    $("#letter").slideUp();
  });
  $("#repeat-balloons").click(function() { // Repeat balloon animation
    $("#letter").slideUp(complete = function () {
      $("#hbd").fadeOut(600, playBalloons(scene, width, height))
    });
  });
});


function playBalloons(scene, width, height) {
  document.body.addEventListener("balloonsGone", function () {
    $("#hbd").fadeIn(600);
    scene.reset();
  }, false);

  const colors = ["blue", "green", "orange", "pink", "red", "yellow"];
  let images = [];
  for (let i = 0; i < colors.length; i++) {
    images.push("/static/images/" + colors[i] + "_balloon.png");
  }

  const numBalloons = Math.floor(width / 8);
  let balloons = sjs.List([]);
  let balloonsGone = false;

  scene.loadImages(images, function() {
    for (let i = 0; i < numBalloons; i++) {
      const filename = images[i % images.length];
      const balloon = scene.Sprite(filename);

      const yRand = Math.random();
      balloon.position((31 * i) % width - 100, height * (1 + yRand*yRand * 1.5));
      balloons.add(balloon);
    }

    const lastBalloon = scene.Sprite(images[0]);
    lastBalloon.position(width / 2, 2.5 * height);
    lastBalloon.update();
    balloons.add(lastBalloon);

    let balloonsGone = new CustomEvent("balloonsGone");

    function paint() {
      let balloon = null;
      while(balloon = balloons.iterate()) {
        balloon.update();
        balloon.move(0, -5 + Math.random() * 3);
      }
      if (lastBalloon.y + 1.5 * lastBalloon.h < 0) {
        document.body.dispatchEvent(balloonsGone);
      }
    }

    const ticker = scene.Ticker(25, paint);
    ticker.run();
  });
}
