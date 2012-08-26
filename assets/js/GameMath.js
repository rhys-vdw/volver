Math.randomRange = function(min, max) {
  return min + Math.random() * (max - min);
};

Math.clamp = function(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

Math.sign = function(value) {
  if (value < 0) return -1;
  return 1;
};

Math.moveTowards = function(value, target, amount) {
  if (value < target) {
    return Math.min(value + amount, target);
  }
  return Math.max(value - amount, target);
};

Math.lerp = function(from, to, amount) {
  return from + amount * (to - from);
};
