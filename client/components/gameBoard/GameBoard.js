import React, {useState, useEffect, useMemo, useRef, useReducer} from 'react'
import GameBoardRow from './GameBoardRow'
import { hardCheckCell, getAdjCells, getAdjCellsCoor  } from '../gameContainer/gameStatePresets'

const GameBoard = ({rows = 5, columns = 10, gameBoard, setGameBoard, dispatchGameStatus}) => {

  const [rerender, setRerender] = useState(0)
  const currentCell = useRef(null)
  const [highlightAdjCells, setHighlightAdjCells] = useState(true)
  const [savedStyles, dispatchSavedStyles] = useReducer((state, action) => {
    switch(action.type) {
      case 'set':
        return action.payload
      case 'clear':
        return [];
      default:
        return [...state]
    }
  }, [])

  const gameColumn = useMemo(() => (
    new Array(rows).fill(1)
  ), [rows])

  const handleMouseOver = (e) => {
    if(e.target.getAttribute('cell-coor')) {
      const [x, y] = e.target.getAttribute('cell-coor').split(':')
      currentCell.previous = currentCell.current
      currentCell.current = gameBoard[y][x]
      if(currentCell.previous !== currentCell.current) setRerender(prev => prev + 1)
      console.log(currentCell.current, 'current cell')
    }
  }

  const handleMouseDown = (e) => {
    const cellCoors = e.target.getAttribute('cell-coor')
    if(!cellCoors) return
    const [x, y] = currentCell.current
    const adjCells = getAdjCells(x, y, gameBoard)
    dispatchSavedStyles({
      type: 'set',
      payload: adjCells.filter(cell => !cell.isFlagged && !cell.isRevealed)
        .map(cell => cell.style)
    })
  }

  const handleMouseUp = (e) => {
    const cellCoors = e.target.getAttribute('cell-coor')
    if(!cellCoors) return
    const [x, y] = cellCoors.split(':')
    const cell = gameBoard[y][x]
    const result = hardCheckCell(x, y, gameBoard)
    if(result === -1) {
      dispatchGameStatus({type: 'lost'})
    }
  }

  useEffect(() => {
    // if(currentCell.previous) {
      console.log('currentcell previous', currentCell.previous)
      const prevAdj = getAdjCells(currentCell.previous, gameBoard)
      console.log(prevAdj, 'prev adj')



      /// TRACK STYLING

    // }
  }, [currentCell.current,currentCell, highlightAdjCells])

  return (
    <div className='game-board' onMouseUp={(e)=>handleMouseUp(e)} onMouseDown={(e) => handleMouseDown(e)} onMouseOver={(e) => handleMouseOver(e)} >
      {gameColumn.map((row, idx) => (
        <GameBoardRow key={row + ':' + idx} columns={columns} yCoor={idx} gameBoard={gameBoard} />
      ))}

    </div>
  )
}

export default GameBoard
