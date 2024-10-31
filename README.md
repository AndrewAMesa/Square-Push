
# Square-Push

Square-Push is a video game developed to learn and apply React, JavaScript, CSS, and HTML. The game code is structured following an entity-control-boundary architecture pattern.

## Project Structure

- **Entity Objects**: Located in the `Model` folder. The main entity is the `Model` class within `Model.js`.
- **Boundary Objects**: Located in the `Boundary` folder and as HTML elements in `App.js`.
- **Controller Objects**: Found in `App.js` as controller methods. These methods implement five specific use cases, detailed in `UseCases.txt`.

## How To Play

The objective is to remove all colored squares from the board. To eliminate a group of squares, they must be arranged into a 2x2 block of the same color. Once aligned, they can be removed with the **X** button on the screen. 

- **Movement**: Use on-screen arrow buttons to move the character around.
- **Character Constraints**: The character cannot wrap around the board, but blocks can.
- **Game Configurations**: Three board layouts are available:
  - **Config #1**: Easiest
  - **Config #2**: Intermediate
  - **Config #3**: Hardest

A reset button returns the board to its initial layout.

## Setup Instructions

1. **Install Node.js (v16.18)**: [Download Node v16.18](https://nodejs.org/download/release/v16.18.0/). Confirm the version by running:
   ```bash
   node --version
   ```

2. **Install Node Package Manager**:
   ```bash
   npm install -g create-react-app --save
   ```

3. **Install Necessary Libraries**:
   ```bash
   npm install react-scripts
   npm install web-vitals
   ```

4. **Start the Application**:
   - In the project directory, run:
     ```bash
     npm start
     ```

This command starts the development server, allowing you to play Square-Push locally.