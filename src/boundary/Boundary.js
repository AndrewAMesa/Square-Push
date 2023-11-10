

/* Redraw entire canvas from model */
export function redrawCanvas(model, canvasObj, appObj) {
  const ctx = canvasObj.getContext('2d');
  if (ctx === null) { return; }    // here for testing purposes...

  // clear the canvas area before rendering the coordinates held in state
  ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

  // place black background for board
  ctx.fillStyle = 'black'
  ctx.fillRect(50, 50, (model.board.size) * 50 + (model.board.size * 5) + 5, (model.board.size) * 50 + (model.board.size * 5) + 5)

  // draw white squares on the board
  let size = model.board.size
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let square = model.board.grid[r][c]
      let x = ((c + 1) * 50) + ((c + 1) * 5)
      let y = ((r + 1) * 50) + ((r + 1) * 5)
      let w = 50
      let h = 50
      ctx.fillStyle = square.color
      ctx.fillRect(x, y, w, h)
    }
  }

  // run if the game has not been won yet
  if (model.won == false) {
    // draw score on board: represents the amount of blocks moved & removed so far
    ctx.font = "50px sans-serif"
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + model.score, 425, (model.size + 1) * 50 + (model.board.size * 5) + 5)

    // draw count on board: represents the amount of moves taken so far
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.fillText("Count: " + model.count, 425, (model.size + 1) * 50 + (model.board.size * 5) + 5 - 48)
  }

  // draws ninjase if page is refreshed
  document.getElementById('ninjase').onload = () => drawNinjaSe(model)

  // draw ninjase
  drawNinjaSe(model)

  // run if game has been won
  if (model.won == true) {
    // draw black background
    ctx.fillStyle = 'black'
    ctx.fillRect(50, 50, 335, 335)

    // draw the win congrats message on the board
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.fillText("Congrats", 220, 190)
    ctx.fillText("You Won!", 220, 250)

    // draw score on board: represents the amount of blocks moved & removed so far
    ctx.font = "50px sans-serif"
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + model.score, 425, (7) * 50 + (7 * 5))

    // draw count on board:represents the amount of moves taken so far
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.fillText("Count: " + model.count, 425, (7) * 50 + (7 * 5) - 60)
  }

  /* draws ninja-se on the board */
  function drawNinjaSe(model) {
    let image = document.getElementById('ninjase')
    let x = ((model.board.ninjaSeColumn + 1) * 50) + ((model.board.ninjaSeColumn + 1) * 5) //get numerical column location of ninjase 
    let y = ((model.board.ninjaSeRow + 1) * 50) + ((model.board.ninjaSeRow + 1) * 5) //get numerical row location of ninjase 
    let w = 105
    let h = 105
    ctx.drawImage(image, x, y, w, h)
  }

}