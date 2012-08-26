function Attributes() {
  this["width"] = Ranges.width();
  this["height"] = Ranges.height();
  this["firePeriod"] = Ranges.firePeriod();
  this["exitSpeed"] = Ranges.exitSpeed();
  this["acceleration"] = Ranges.acceleration();
  this["angle"] = Ranges.angle();
  this["growth"] = Ranges.growth();
  this["red"] = Ranges.red();
  this["green"] = Ranges.green();
  this["blue"] = Ranges.blue();

  this.lerp = function(other, amount) {
    for (key in other) {
      if (other.hasOwnProperty(key) && key != "lerp") {
        this[key] = Math.lerp(this[key], other[key], amount);
      }
    }
  };
};


