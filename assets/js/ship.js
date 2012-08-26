function createEntity(image, x, y) {
  var sprite = new jaws.Sprite({image: image, x:x, y:y, context:context, anchor:"center"});

  return sprite;
}

function createShadow(sprite) {
  var shadow = sprite.asCanvas();
  var ctx = shadow.getContext('2d');
  console.dir(shadow);
  var pixels = ctx.getImageData(0, 0, 32, 32);
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    // change all opaque pixels to shadow
    d[i] = 136;
    d[i + 1] = 126;
    d[i + 2] = 99;
  }
  ctx.putImageData(pixels, 0, 0);
  return new jaws.Sprite({image: shadow, anchor:"center"});
}

function createShip(image, x, y, health, colliderSize) {
  var ship = createEntity(image, x, y);
  var nextGunDelay = 0;
  var isFiring = false;

  var guns = new Array();
  var gunIndex = 0;

  ship.shadow = createShadow(ship);

  ship.drawShadow = function() {
    this.shadow.x = this.x + flyHeight;
    this.shadow.y = this.y + flyHeight;
    this.shadow.draw();
  };

  ship.health = health;

  ship.destroy = function() { /* override me */ } 

  ship.getGun = function () {
    return guns[gunIndex];
  }

  ship.getRect = function() {
    var rect = this.rect();
    var width = this.width * colliderSize;
    var height = this.height * colliderSize;
    rect.resizeTo(width, height);
    rect.move((this.width - width) / 2, (this.height - height) / 2);
    return rect;
  }

  ship.addGun = function(gun) {
    guns.push(gun);
  }

  ship.setFiring = function(value) {
    if (value != isFiring) {
      isFiring = value;
      if (guns.length > 0) {
        guns[gunIndex].isFiring = value;
      }
    }
  }

  ship.nextGun = function() {
    guns[gunIndex].isFiring = false;
    gunIndex = (gunIndex + 1) % guns.Length;
    guns[gunIndex].isFiring = isFiring;
  }

  ship.prevGun = function() {
    guns[gunIndex].isFiring = false;
    gunIndex--;
    if (gunIndex < 0) gunIndex = guns.Length - 1;
    guns[gunIndex].isFiring = isFiring;
  }

  ship.getFiring = function() {
    return isFiring;
  }

  ship.update = function() {
    if (guns.length > 0) {
      guns[gunIndex].update();
    }
  }

  return ship;
}

function createEnemyShip(image, x, y, health, speed, colliderSize) {
  var ship = createShip(image, x, y, health, colliderSize);
  var firePeriod = Math.randomRange(0.1, 1);
  var cooldownPeriod = Math.randomRange(0.6, 4);
  var fireToggleDelay = 0;

  ship.update = (function() {
    var baseUpdate = ship.update;
    return function () {
      fireToggleDelay -= DeltaTime;
      if (fireToggleDelay <= 0) {
        if (this.getFiring()) {
          fireToggleDelay += cooldownPeriod;
          this.setFiring(false);
        } else {
          fireToggleDelay += firePeriod;
          this.setFiring(true);
        }
      }

      this.move(0, speed * DeltaTime);
      baseUpdate();
    }
  })();

  ship.destroy = function() {
    this.getGun().createGem();
  }

  ship.shadow.rotateTo(180);
  ship.rotateTo(180);

  return ship;
}
