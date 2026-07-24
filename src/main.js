import SceneManager from "./core/SceneManager.js";

import Lights from "./core/Lights.js";

import Ship from "./objects/Ship.js";

import Sea from "./objects/Sea.js";

import GameLoop from "./game/GameLoop.js";

import Keyboard from "./input/Keyboard.js";

import PlayerController from "./controllers/PlayerController.js";

import CameraController from "./controllers/CameraController.js";

import Obstacle from "./objects/Obstacle.js";

const world = new SceneManager();

const scene = world.scene;

const camera = world.camera;

const renderer = world.renderer;

new Lights(scene);

const keyboard = new Keyboard();

const ship = new Ship();

const cameraController = new CameraController(camera, ship);

const playerController = new PlayerController(ship, keyboard);

scene.add(ship.mesh);

const sea = new Sea();

scene.add(sea.mesh);

const obstacle = new Obstacle();

scene.add(obstacle.mesh);

const game = new GameLoop(renderer, scene, camera, [
  playerController,
  ship,
  cameraController,
  sea,
]);

game.start();
