import React from 'react';
import './App.css';

import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'
import ninjase from './ninja-se.svg'

function App() {
  // initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(0));  // only place where Model object is instantiated.
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw

  const appRef = React.useRef(null);      // later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {

    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  /* controller to handle moving of ninja-se */
  const moveNinjaSe = (verticalChange, horizontalChange) => {
    if (model.won == false) { // prevents ninja-se from moving if board is de-activated (game is won)
      if (model.board.isValidMove(verticalChange, horizontalChange) == true) { 
        model.board.ninjaSeRow += verticalChange
        model.board.ninjaSeColumn += horizontalChange
        model.count++;
      }

      // for each of the 4 squares ninja-se occupies checks if squares must be shifted due to the movement of the character, and if so shifts them
      model.moveSquares(verticalChange, horizontalChange, model.board.ninjaSeRow, model.board.ninjaSeColumn)
      model.moveSquares(verticalChange, horizontalChange, model.board.ninjaSeRow, model.board.ninjaSeColumn + 1)
      model.moveSquares(verticalChange, horizontalChange, model.board.ninjaSeRow + 1, model.board.ninjaSeColumn)
      model.moveSquares(verticalChange, horizontalChange, model.board.ninjaSeRow + 1, model.board.ninjaSeColumn + 1)
    }
    forceRedraw(redraw + 1)   // react to changes, if model has changed.
  }

  /* controller for removing 2x2 squares */
  const removeBlocks = () => {
    if (model.won == false) { // prevents blocks from being removed if board is de-activated (game is won)
      model.removeBlocks()
      if (model.board.isWon() == true) { // checks to see if the game is now won
        model.won = true
      }
    }
    forceRedraw(redraw + 1)   // react to changes, if model has changed.
  }

  /* controller for choosing new configuration */
  const chooseConfiguration = (config) => {
    model.changeConfiguration(config)
    forceRedraw(redraw + 1)   // react to changes, if model has changed.
  }

  /* controller for reseting configuration */
  const resetConfiguration = () => {
    model.resetConfiguration()
    forceRedraw(redraw + 1)   // react to changes, if model has changed.
  }


  return (
    <div className="App" ref={appRef}>
      <canvas tabIndex="1"
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={700}
        height={600}
      />

      <button className="upbutton" data-testid="upbutton" onClick={(e) => moveNinjaSe(-1, 0)}   >^</button>
      <button className="downbutton" data-testid="downbutton" onClick={(e) => moveNinjaSe(1, 0)}   >v</button>
      <button className='rightbutton' data-testid="rightbutton" onClick={(e) => moveNinjaSe(0, 1)} >&gt;</button>
      <button className='leftbutton' data-testid="leftbutton" onClick={(e) => moveNinjaSe(0, -1)} >&lt;</button>
      <button className='removebutton' data-testid="removebutton" onClick={(e) => removeBlocks()} >x</button>
      <button className='config1button' data-testid="config1button" onClick={(e) => chooseConfiguration(0)} >config 1</button>
      <button className='config2button' data-testid="config2button" onClick={(e) => chooseConfiguration(1)} >config 2</button>
      <button className='config3button' data-testid="config3button" onClick={(e) => chooseConfiguration(2)} >config 3</button>
      <button className='resetbutton' data-testid="resetbutton" onClick={(e) => resetConfiguration()} >reset</button>
      <img id="ninjase" src={ninjase} alt="hidden" hidden></img>

    </div>
  );
}

export default App;
