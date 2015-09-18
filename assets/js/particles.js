function ParticleEffect(params) {
  this.x = params.x;
  this.y = params.y;
  var count = params.count;

  var rotation = Math.random() * 360;

  this.shouldDestroy = false;

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    var velocity = (new Vec2FromAngle(Math.random() * Math.PI * 2)).mulS(params.speed());
    var lifespan = params.lifespan();
    var timeleft = lifespan;
    var size = params.size();
    var spin = params.spin();

    this.shouldDestroy = false;

    function normalizedTimeleft() {
      return timeleft / lifespan;
    }

    this.update = function() {
      timeleft -= DeltaTime;
      if (timeleft <= 0) {
        this.shouldDestroy = true;
      }
      velocity = velocity.mulS(0.95);
      this.x += velocity.x * DeltaTime;
      this.y += velocity.y * DeltaTime;

      rotation += normalizedTimeleft() * spin * DeltaTime;
    }

    this.draw = function() {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(rotation);
      context.fillStyle = params.color;
      context.globalAlpha = normalizedTimeleft();
      context.fillRect(-size/2, -size/2, size, size);
      context.restore();
    }
  }

  var particles = new jaws.SpriteList();
  for (var i = 0; i < count; i++) {
    particles.push(new Particle(this.x, this.y));
  }

  this.draw = function() {
    particles.draw(); 
  };

  this.update = function() {
    particles.forEach(function(p) { p.update(); });
    particles.deleteIf(function(p) { return p.shouldDestroy; });
    if (particles.length == 0) {
      this.shouldDestroy = true;
    }
  };
}
