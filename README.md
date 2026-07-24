# Mini Warship

A simple Three.js-based warship game prototype.

## Description

This project is a small warship game example built with `Three.js` and `Vite`. The game scene includes a ship, sea, and camera control.

This repository also serves as an early playable ads prototype example.

> Currently under active development.

## Features

- 3D scene created with `Three.js`
- Ship movement and speed control
- Camera follow mechanics
- Keyboard controls

## Installation

1. Clone or download the repository.
2. Open a terminal in the project root.
3. Install the dependencies:

```bash
npm install
```

## Running the Project

Start the development server with:

```bash
npm run dev
```

Open the browser at `http://localhost:5173` (or the address provided by Vite).

## Controls

- `W` - move forward
- `S` - move backward
- `A` - move left
- `D` - move right

## Project Structure

- `index.html` - main game page
- `src/main.js` - application entry point
- `src/core/SceneManager.js` - scene, camera, and renderer management
- `src/controllers/CameraController.js` - camera follow system
- `src/controllers/PlayerController.js` - ship control logic
- `src/objects/Ship.js` - ship model and movement
- `src/objects/Sea.js` - sea object
- `src/game/GameLoop.js` - game loop

## Development Notes

- The project is configured with `type: "module"`.
- Local module imports should include the `.js` extension.
- Code quality tools like `ESLint` can be used for linting.

## Future Improvements

- Improve camera follow behavior
- Add more gameplay mechanics
- Enhance visuals and scene detail

