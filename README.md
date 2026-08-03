# Mini Warship

Mini Warship is a 3D warship experience built with Three.js and Vite. The scene includes a ship, sea, enemy ships, shooting mechanics, and damage handling.

## Features

- 3D scene created with Three.js
- Keyboard-controlled ship movement
- Enemy ships and combat mechanics
- Damage system and game-over logic
- Camera follow system
- Ambient sound and start experience after the game begins

## Installation

1. Clone or download the repository.
2. Open the project root in your terminal.
3. Install the dependencies:

```bash
npm install
```

## Running the Project

Start the development server with:

```bash
npm run dev
```

Then open the following address in your browser:

```text
http://localhost:5173
```

## Controls

- A / D - move left / right
- Space - fire
- Mobile: swipe left / right to steer and tap the fire button to shoot
- Mouse / Touch - click the screen to start the game

## Gameplay

- The game starts when the player begins interacting with the scene.
- Enemy ships approach the scene and fire at the player.
- If the player's health reaches zero, the game over screen is shown.
- The game also ends when enemies cross a defined z-axis boundary.

## Project Structure

- index.html - main game page
- src/main.js - application entry point
- src/core/SceneManager.js - scene, camera, and renderer management
- src/controllers/PlayerController.js - ship control logic
- src/controllers/ShootingController.js - shooting system
- src/controllers/CollisionController.js - collision and damage handling
- src/game/EnemySpawner.js - enemy creation and updates
- src/objects/Ship.js - ship model and movement behavior
- src/objects/EnemyShip.js - enemy ship behavior

## Development Notes

- The project uses ES modules.
- Local imports should include the .js extension.
- You can extend the project with ESLint and additional gameplay features if needed.

