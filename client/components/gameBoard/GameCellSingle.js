import React from 'react'

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

const boardCellDepressedStyle = {
  height: remAsString,
  width: remAsString,
  background: `#c0c0c0`,
  border: `${remSize * 20 / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
}

const boardCellCleared = {
  height: remAsString,
  width: remAsString,
  background: `#ECECEC`,
  border: `${remSize * 8 / 100}rem outset #A9A9A9`,
  overflow: 'none',
  boxSizing: 'border-box',
}


const GameCellSingle = ({cleared, flagged}) => {

  return (
    <>
      <h2>Board CELL</h2>
      <div style={boardCellBaseStyle}>
        <img className='cell-image' src={flagged ? "/images/redFlag.jpg" : ''} alt={flagged ? 'red flag' : ''} />
      </div>
      <div style={boardCellDepressedStyle}></div>
      <div style={boardCellCleared}></div>
    </>
  )
}

export default GameCellSingle
