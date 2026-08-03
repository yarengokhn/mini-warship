# Mini Warship

Mini Warship is a 3D arcade-style warship game built with Three.js and Vite. The game features a moving ship, sea visuals, enemy ships, shooting mechanics, damage handling, and a mobile-friendly control layout.

## Live Demo

Play the game here:

https://miniwarshipgame.netlify.app/

## Features

- 3D scene rendered with Three.js
- Keyboard controls for ship movement
- On-screen left/right controls for mobile devices
- Enemy spawning and combat mechanics
- Health system and game-over flow
- Camera follow behavior
- Ambient sea sound and start interaction flow

## Installation

1. Clone or download the repository.
2. Open the project root in your terminal.
3. Install the dependencies:

```bash
npm install
```

## Running Locally

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
- Mobile: tap the on-screen ◀ / ▶ buttons to steer and use the FIRE button to shoot
- Mouse / touch - tap the screen to start the game

## Gameplay

- The game begins when the player interacts with the scene.
- Enemy ships approach the player and fire at them.
- The game ends when the player's health reaches zero or an enemy passes the defined boundary.

## Project Structure

- index.html - main game page
- src/main.js - application entry point
- src/core/SceneManager.js - scene, camera, and renderer setup
- src/controllers/PlayerController.js - ship movement logic
- src/controllers/ShootingController.js - shooting system
- src/controllers/CollisionController.js - collision and damage handling
- src/game/EnemySpawner.js - enemy creation and updates
- src/objects/Ship.js - ship model and movement behavior
- src/objects/EnemyShip.js - enemy ship behavior

## Development Notes

- The project uses ES modules.
- Local imports should include the .js extension.
- You can extend the project with additional gameplay features or UI improvements.

