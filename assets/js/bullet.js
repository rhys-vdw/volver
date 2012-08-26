"use strict";

function Bullet(x, y, width, height, angle, speed, acceleration, color) {
  this.x = x;
  this.y = y;
  var velocity = new Vec2FromAngle(angle).mulS(speed);

  this.shouldDestroy = false;

  this.damage = 4;

  this.update = function() {
    velocity.y += acceleration * DeltaTime;
    this.x += velocity.x * DeltaTime;
    this.y -= velocity.y * DeltaTime;
  };

  this.getRect = function() {
    return new jaws.Rect(this.x, this.y, width, height);
  }

  this.drawShadow = function() {
    context.save();
    context.translate(this.x + flyHeight, this.y + flyHeight);
    context.rotate(angle);
    context.scale(width, height);
    context.beginPath();
    context.arc(0, 0, 1, 0, Math.PI*2, true); 
    context.fillStyle = ShadowColor;
    context.fill();
    context.restore();
  }

  this.draw = function() {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(angle);
    context.scale(width, height);
    context.beginPath();
    context.arc(0, 0, 1, 0, Math.PI*2, true); 

    try {
    var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
    gradient.addColorStop(0, "#FFFFFF");
    gradient.addColorStop(1, color);
    } catch (e) {
      //console.log("COLOR FAILED " + color);
    }

    context.fillStyle = gradient;
    context.fill();
    context.restore();
  };
}
