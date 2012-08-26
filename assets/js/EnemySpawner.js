function EnemySpawner() {
  var delayRange = Range(0.3, 4);
  var xRange = Range(32, 448);
  var speedRange = Range(20, 60);
  var delay = 2;
  var speed = 

  this.update = function() {
    delay -= DeltaTime;
    if (delay < 0) {
      var enemy = createEnemyShip('assets/img/plane.png', xRange(), -32, 10, speedRange(), 0.8);
      enemy.bullets = enemyBullets;
      enemy.addGun(new Gun(enemy, "down"));
      enemies.push(enemy);
      delay += delayRange();
    }
  };
}
