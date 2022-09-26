import React, {useMemo} from 'react'

const remSize = 2
const remAsString = `${remSize}rem`

const boardCellBaseStyle = {
  height: remAsString,
  width: remAsString,
  background: `#c0c0c0`,
  border: `${remSize * 20 / 100}rem outset #ECECEC`,
  overflow: 'none',
  boxSizing: 'border-box',
}

const boardCellHighlightedStyle = {
  height: remAsString,
  width: remAsString,
  background: `aqua`,
  border: `${remSize * 20 / 100}rem outset #ECECEC`,
  overflow: 'none',
  boxSizing: 'border-box',
}

const boardCellDepressedStyle = {
  height: remAsString,
  width: remAsString,
  background: `#c0c0c0`,
  border: `${remSize * 20 / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
}

const boardCellClearedStyle = {
  height: remAsString,
  width: remAsString,
  background: `#ECECEC`,
  border: `${remSize * 8 / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
}

const handleClick = (e, xCoor, yCoor, gameBoard) => {
  // console.log(e.target.getAttribute('cell-coor'))
}

const GameCellSingle = ({flagged = false, xCoor, yCoor, gameBoard}) => {

  const cell = useMemo(() => gameBoard[yCoor][xCoor], [xCoor, yCoor, gameBoard])

  const cellStyle = useMemo(() =>{
    switch (cell.style) {
      case 'base':
        return boardCellBaseStyle;
      case 'highlighted' :
        return boardCellHighlightedStyle
      case 'mouse-downed':
        return boardCellDepressedStyle;
      case 'cleared':
        return boardCellClearedStyle
    }
  },[cell, cell.style])

  return (
    <>
      <div className='game-board-cell' cell-coor={`${xCoor}:${yCoor}`} style={cellStyle} onClick={(event) => handleClick(event,xCoor, yCoor, gameBoard)}>
        {/* {gameBoard[yCoor][xCoor].hasBomb ? '1' : '0'}/{hardCheckCell(xCoor, yCoor, gameBoard)} */}
        <img className='cell-image' src={flagged ? "/images/redFlag.jpg" : ''} alt={flagged ? 'red flag' : ''} />
      </div>
    </>
  )
}

export default GameCellSingle
