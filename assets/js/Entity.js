function Entity () {
  Entity.all.add(this);

  /* methods to override */
  this.update = function () { };
  this.draw = function () { };
  this.drawShadow = function () { };
  this.destroy = function () { };
  this.shouldDestroy = false;
}

/* List of all entities. */
Entity.all = new jaws.SpriteList();

/* Delete all entities who have their shouldDestroy flag set. */
Entity.all.cleanUp = function () {
  this.deleteIf(function(e) {
    if (e.shouldDestroy) {
      e.destroy();
      return true;
    }
    return false;
  });
};

/* Update all entities. */
Entity.all.update = function () {
  this.forEach(function (e) { e.update(); });
};

/* Draw all entity shadows. */
Entity.all.drawShadows = function () {
  this.forEach(function (e) { e.drawShadow(); });
};
