$(document).ready(function() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var scene = sjs.Scene({w: width, h: height, autoPause: false});
  var layer = scene.Layer({useCanvas: true});

  var colors = ["blue", "green", "orange", "pink", "red", "yellow"];
  var images = [];

  for (var i = 0; i < colors.length; i++) {
    images.push("/static/images/" + colors[i] + "_balloon.png");
  }

  var numSprites = 6; // Math.floor(width / 5);
  var sprites = sjs.List();
  var lastSprite;
  scene.loadImages(images, function() {
    var filename;
    var sp;
    for (var i = 0; i < numSprites; i++) {
      filename = images[i % images.length];
      
      sp = scene.Sprite(filename);
      sp.position((31 * i) % width - 100, height + Math.random()**2 * 1.5 * height);

      sprites.add(sp);
    }
    lastSprite = scene.Sprite(filename);
    lastSprite.position(width / 2, 2.5 * height);
    sprites.add(lastSprite);

    var ticker = scene.Ticker(25, paint);
    ticker.run();
  });

  function paint() {
    var sp;
    while(sp = sprites.iterate()) {
      sp.update();
      // sp.rotate(3.14 / 4);
      sp.move(0, -5 + Math.random() * 3);
    }
  }

  Sprite.getImageFromCache = function(src) {
      //return images[src] ? images[src] : null;
      return null;
  };

  Sprite.saveImageToCache = function(src, image) {
      //images[src] = image;
  };

  setTimeout(function() {
    $("#hbd").css("display", "inline");
  }, 10000);

  $("#letter-button").click(function() {
    $("#letter").css("display", "inline");
  });
});

