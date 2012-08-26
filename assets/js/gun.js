function Gun(ship, direction) {
  var fireDelay = 0;
  var attributes = new Attributes();
  var color = getColor();

  this.isFiring = false;

  this.mutate = function(otherAttributes, amount) {
    attributes.lerp(otherAttributes, amount);
    color = getColor();
  }

  this.createGem = function() {
    gems.push(new Gem(ship.x, ship.y, color, attributes, 4));
  }

  this.update = function() {
    fireDelay -= DeltaTime;

    if (this.isFiring && fireDelay <= 0) {
      fire();
    }
  }

  function fire() {
    var speed = attributes["exitSpeed"];

    var scale = 2 * (Math.random() - 0.5);
    var sign = Math.sign(scale);
    var angle = sign * Math.pow(scale, 2) * attributes['angle'];
    var acceleration = attributes['acceleration'];

    if (direction == "down") {
      angle += Math.PI;
      acceleration = -acceleration;
    }

    ship.bullets.push(new Bullet(
          ship.x, ship.y,
          attributes['width'], attributes['height'],
          angle,
          attributes['exitSpeed'], acceleration,
          color));
    fireDelay = attributes['firePeriod'];
  }

  function getColor() {
    return hexColor(attributes["red"],
                     attributes["green"],
                     attributes["blue"]);
  }
}
