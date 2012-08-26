function Level(speed, height) {
  var tileSize = 32;
  var tileSheet = new jaws.SpriteSheet({image: 'assets/img/tiles.png',
    frame_size: [tileSize, tileSize]});
  var vOffset = 0;

  /* create array of tiles */
  var height = height - (height % tileSize);
  var width = canvas.width;
  var hCount = Math.ceil(canvas.width / tileSize);
  var vCount = Math.floor(height / tileSize);
  console.log("hCount="+hCount+" vCount="+vCount);
  var tiles = new Array();

  for (var j = 0; j < vCount; j++) {
    tiles[j] = new Array();
    for (var i = 0; i < hCount; i++) {
      tiles[j][i] = randomTile();
    }
  }

  function randomTile() {
    // TODO: does this need to be floored?
    return tileSheet.frames[Math.floor(Math.random() * tileSheet.frames.length)];
  }

  this.speed = speed;

  this.update = function() {
    vOffset = vOffset + (speed * DeltaTime);
  }

  // Draw all the tiles at their current vertical offset
  this.draw = function() {
    var tile = new jaws.Sprite({});
    for (var j = 0; j < vCount; j++) {
      for (var i = 0; i < hCount; i++) {
        tile.setImage(tiles[j][i]);
        tile.x = i * tileSize;
        tile.y = ((j * tileSize + vOffset) % (canvas.height + tileSize)) - tileSize;
        tile.draw();
      }
    }
  }
}

jaws.assets.add('assets/img/tiles.png');
