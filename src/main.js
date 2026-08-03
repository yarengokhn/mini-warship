import SceneManager from "./core/SceneManager.js";

import Lights from "./core/Lights.js";

import Ship from "./objects/Ship.js";

import Sea from "./objects/Sea.js";

import GameLoop from "./game/GameLoop.js";

import Keyboard from "./input/Keyboard.js";

import PlayerController from "./controllers/PlayerController.js";

import CameraController from "./controllers/CameraController.js";

import CollisionController from "./controllers/CollisionController.js";

import GameOverController from "./controllers/GameOverController.js";

import HealthUIController from "./controllers/HealthUIController.js";

// import Obstacle from "./objects/Obstacle.js";

import EnemySpawner from "./game/EnemySpawner.js";

import ShootingController from "./controllers/ShootingController.js";
import TouchController from "./controllers/TouchController.js";

const world = new SceneManager();

const scene = world.scene;

const camera = world.camera;

const renderer = world.renderer;

new Lights(scene);

const keyboard = new Keyboard();
const touchController = new TouchController();

const ship = new Ship();

// const obstacle = new Obstacle();

const enemySpawner = new EnemySpawner(scene, ship);

const cameraController = new CameraController(camera, ship);

const playerController = new PlayerController(ship, {
  keyboard,
  touch: touchController,
});

const shootingController = new ShootingController(scene, ship, keyboard);

const collisionController = new CollisionController(
  ship,
  shootingController,
  enemySpawner,
  world.listener,
);

const sea = new Sea(world.listener);

const gameOverController = new GameOverController(ship, sea);

const healthUIController = new HealthUIController(ship);

scene.add(ship.mesh);

scene.add(sea.mesh);

const touchHint = document.getElementById("touch-hint");
const startGame = () => {
  if (ship.isStarted) return;
  ship.isStarted = true;
  if (touchHint) {
    touchHint.style.display = "none";
  }
};

window.addEventListener(
  "pointerdown",
  () => {
    sea.playAmbient();
    startGame();
  },
  { once: true },
);

// scene.add(obstacle.mesh);

const game = new GameLoop(renderer, scene, camera, [
  playerController,
  shootingController,
  ship,
  enemySpawner,
  collisionController,
  cameraController,
  gameOverController,
  healthUIController,
  sea,
]);

game.start();
