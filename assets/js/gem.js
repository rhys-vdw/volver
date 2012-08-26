function Gem(x, y, color, attributes, lifespan) {
  var speed = 20;
  var velocity = (new Vec2FromAngle(Math.random() * Math.PI * 2)).mulS(speed);
  var rotation = 0;
  var rotationSpeed = 3 * Math.PI;
  var timeleft = lifespan;
  var lerpScale = 0.7;
  var size = 10;

  this.x = x;
  this.y = y;
  this.shouldDestroy = false;

  this.getLifespan = new function() { return lifespan; }

  function normalizedTimeleft() {
    return timeleft / lifespan;
  }

  this.getRect = function() {
    return new jaws.Rect(this.x - size/2, this.y - size/2, size, size);
  }

  this.affectGun = function(gun) {
    gun.mutate(attributes, normalizedTimeleft() * lerpScale);
  }

  this.update = function() {
    timeleft -= DeltaTime;
    if (timeleft <= 0) {
      this.shouldDestroy = true;
    }
    this.x += velocity.x * DeltaTime;
    this.y += velocity.y * DeltaTime;

    rotation += normalizedTimeleft() * rotationSpeed * DeltaTime;
  }

  this.draw = function() {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(rotation);
    context.fillStyle = color;
    context.setAlpha(normalizedTimeleft());
    context.fillRect(-size/2, -size/2, size, size);
    context.restore();
  }
}
