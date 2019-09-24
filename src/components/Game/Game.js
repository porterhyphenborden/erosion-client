import React, { Component } from 'react'
import data from '../../data'
import chevronRight from '../../images/chevronright.png'
import chevronLeft from '../../images/chevronleft.png'
import chevronUp from '../../images/chevronup.png'
import chevronDown from '../../images/chevrondown.png'
import './Game.css'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            riverStart: data.board.riverStart,
            riverEnd: data.board.riverEnd,
            gravity: data.board.gravity,
            board: [[], [], [], [], []],
            erosionTarget: null,
            riverDirection: null,
            score: 0,
            riverPath: [],
        }
    }

    UNSAFE_componentWillMount() {
        let tiles = data.tiles
        let setup = data.board.setup
        let board = this.state.board
        for (let i = 0; i < setup.length; i++) {
            for (let j = 0; j < setup[i].length; j++) {
                let tile = tiles.find(tile => {
                    return tile.type === setup[i][j]
                })
                board[i][j] = {}
                board[i][j].type = tile.type;
                board[i][j].resistance = tile.resistance;
                board[i][j].resistanceOriginal = tile.resistance;
            }
        }
        //console.log(board)
        this.setState({board})
    }

    updateErosionTarget(target) {
        let newTarget = {}
        if (this.state.riverDirection === 'down') {
            newTarget.row = target.row + 1
            newTarget.column = target.column
            console.log(`new target is ${newTarget.row}, ${newTarget.column}`)
            this.setState({
                erosionTarget: {
                    row: newTarget.row,
                    column: newTarget.column
                }
            }, () => console.log(this.state.erosionTarget))
        }
        else if (this.state.riverDirection === 'up') {
            newTarget.row = target.row - 1
            newTarget.column = target.column
            this.setState({
                erosionTarget: {
                    row: newTarget.row,
                    column: newTarget.column
                }
            })
        }
        else if (this.state.riverDirection === 'right') {
            newTarget.row = target.row
            newTarget.column = target.column + 1
            this.setState({
                erosionTarget: {
                    row: newTarget.row,
                    column: newTarget.column
                }
            })
        }
        else if (this.state.riverDirection === 'left') {
            newTarget.row = target.row
            newTarget.column = target.column - 1
            this.setState({
                erosionTarget: {
                    row: newTarget.row,
                    column: newTarget.column
                }
            })
        }
    }

    finalScore(target) {
        console.log(`before multiplier: ${this.state.score}`)
        let scoreMultiplier = 1
        if ((this.state.riverEnd.row === target.row) && (this.state.riverEnd.column === target.column)) {
            scoreMultiplier = 1.5
        }
        else if ((this.state.riverEnd.column === 0) || (this.state.riverEnd.column === 4)) {
            if (this.state.riverEnd.column === target.column) {
                scoreMultiplier = 1
            }
            else {
                scoreMultiplier = .75
            }
        }
        else if ((this.state.riverEnd.row === 0) || (this.state.riverEnd.row === 4)) {
            if (this.state.riverEnd.row === target.row) {
                scoreMultiplier = 1
            }
            else {
                scoreMultiplier = .75
            }
        }
        let newScore = this.state.score * scoreMultiplier
        this.setState(() => ({ 
            score: newScore
        }), () => console.log(this.state.score))
    }

    checkForEnd(target) {
        console.log('checkForEnd ran')
        let board = this.state.board
        if ((target.row !== this.state.riverStart.row && ((target.row === 0) || (target.row === 4))) || (target.column !== this.state.riverStart.column && ((target.column === 0) || (target.column === 4)))) {
            this.finalScore(target)
        }
        else {
            this.updateErosionTarget(target)
        }
    }

    checkRiver(target) {
        console.log('checkRiver ran')
        let board = this.state.board
        let tile = board[target.row][target.column]
        console.log(tile)
        console.log(this.state.riverDirection)
        if (tile.resistance === 0) {
            tile.isRiver = true
            let riverArray = this.state.riverPath
            riverArray.push({
                row: target.row,
                column: target.column
            })
            this.setState({
                board,
                riverPath: riverArray
            }, () => this.checkForEnd(target))
        }
    }

    updateScore(target) {
        console.log('updateScore ran')
        let tile = this.state.board[target.row][target.column]
        let scoreUpdate = 0
        //if land tile other than soil was fully eroded
        if (tile.resistance === 0) {
            if (tile.type !== 'soil') {
                scoreUpdate = tile.resistanceOriginal * 100
                let newScore = this.state.score + scoreUpdate
                this.setState(() => ({ 
                    score: newScore
                }), () => {this.checkRiver(target)})
            }
            else {
                this.checkRiver(target)
            }
        }
        else {
            this.checkRiver(target)
        }
    }

    erodeTarget(target) {
        console.log('erodeTarget ran')
        let board = this.state.board
        let tile = board[target.row][target.column]
        if (tile.resistance > 0) {
            tile.resistance -= 1
        }
        this.setState({board}, () => {this.updateScore(target)})
    }

    compareResistance(tile1, tile2, target, tile1Row, tile1Column, tile2Row, tile2Column, targetRow, targetColumn, riverEndPoint, tile1Compare, tile2Compare, direction) {
        let newTarget = {}
        if (((target.resistance - tile1.resistance) >= 2) && ((target.resistance - tile2.resistance) >= 2)) {
            if ((Math.abs(riverEndPoint - tile1Compare)) < (Math.abs(riverEndPoint - tile2Compare))) {
                newTarget.row = tile1Row
                newTarget.column = tile1Column
            }
            else if ((Math.abs(riverEndPoint - tile1Compare)) > (Math.abs(riverEndPoint - tile2Compare))) {
                newTarget.row = tile2Row
                newTarget.column = tile2Column
            }
        }
        else if ((target.resistance - tile1.resistance) >= 2) {
            newTarget.row = tile1Row
            newTarget.column = tile1Column
        }
        else if ((target.resistance - tile2.resistance) >= 2) {
            newTarget.row = tile2Row
            newTarget.column = tile2Column
        }
        else {
            newTarget.row = targetRow
            newTarget.column = targetColumn
        }
        if (direction === 'down' || direction === 'up') {
            if (newTarget.column > targetColumn) {
                newTarget.direction = 'right'
            }
            else if (targetColumn > newTarget.column) {
                newTarget.direction = 'left'
            }
            else {
                newTarget.direction = direction
            }
        }
        else if (direction === 'left' || direction === 'right') {
            if (newTarget.row > targetRow) {
                newTarget.direction = 'down'
            }
            else if (targetRow > newTarget.row) {
                newTarget.direction = 'right'
            }
            else {
                newTarget.direction = direction
            }
        }
        return newTarget
    }

    erosionPhase() {
        //if no erosion target, this is first move, erosion target is riverStart
        console.log('erosionPhase ran')
        if (this.state.erosionTarget === null) {
            this.setState({
                erosionTarget: {
                    row: this.state.riverStart.row,
                    column: this.state.riverStart.column
                }
            })
            //if riverStart row === 0, riverDirection will be down
            if (this.state.riverStart.row === 0) {
                console.log('row equals 0')
                this.setState({riverDirection: 'down'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //if riverStart row !== 0, and riverStart col === 0, riverDirection will be right
            else if (this.state.riverStart.row !== 0 && this.state.riverStart.column === 0) {
                this.setState({riverDirection: 'right'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //if riverStart row !== 0 and riverStart col !==0, riverDirection will be left
            else if (this.state.riverStart.row !== 0 && this.state.riverStart.column === 0) {
                this.setState({riverDirection: 'left'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
        }
        else if (this.state.erosionTarget !== null) {
            let board = this.state.board
            let row = this.state.erosionTarget.row
            let column = this.state.erosionTarget.column
            let targetTile = board[row][column]
            //If row or column is 0 but end of game has not been triggered, erosionTarget is still adjacent to riverStart
            if (row === 0 || column === 0) {
                this.erodeTarget(this.state.erosionTarget)
            }
            //If river direction is down, check whether tiles to the right and left have lower resistance by 2
            else if ((this.state.riverDirection === 'down') && (row !== 0) && (column !== 0)) {
                let leftTileRow = row - 1
                let leftTileColumn = column - 1
                let rightTileRow = row - 1
                let rightTileColumn = column + 1
                let leftTile = board[leftTileRow][leftTileColumn]
                let rightTile = board[rightTileRow][rightTileColumn]
                let updatedTarget = this.compareResistance(leftTile, rightTile, targetTile, leftTileRow, leftTileColumn, rightTileRow, rightTileColumn, row, column, this.state.riverEnd.column, leftTileColumn, rightTileColumn, this.state.riverDirection)
                console.log(updatedTarget)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is up check whether tiles above and below have lower resistance by 2
            else if ((this.state.riverDirection === 'up') && (row !== 0) && (column !== 0)) {
                let leftTileRow = row + 1
                let leftTileColumn = column - 1
                let rightTileRow = row + 1
                let rightTileColumn = column + 1
                let leftTile = board[leftTileRow][leftTileColumn]
                let rightTile = board[rightTileRow][rightTileColumn]
                let updatedTarget = this.compareResistance(leftTile, rightTile, targetTile, leftTileRow, leftTileColumn, rightTileRow, rightTileColumn, row, column, this.state.riverEnd.column, leftTileColumn, rightTileColumn, this.state.riverDirection)
                console.log(updatedTarget)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is right check whether tiles above and below have lower resistance by 2
            else if ((this.state.riverDirection === 'right') && (row !== 0) && (column !== 0)) {
                let aboveTileRow = row - 1
                let aboveTileColumn = column - 1
                let belowTileRow = row + 1
                let belowTileColumn = column - 1
                let aboveTile = board[aboveTileRow][aboveTileColumn]
                let belowTile = board[belowTileRow][belowTileColumn]
                let updatedTarget = this.compareResistance(aboveTile, belowTile, targetTile, aboveTileRow, aboveTileColumn, belowTileRow, belowTileColumn, row, column, this.state.riverEnd.row, aboveTileRow, belowTileRow, this.state.riverDirection)
                console.log(updatedTarget)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is left check whether tiles above and below have lower resistance by 2
            else if ((this.state.riverDirection === 'right') && (row !== 0) && (column !== 0)) {
                let aboveTileRow = row - 1
                let aboveTileColumn = column + 1
                let belowTileRow = row + 1
                let belowTileColumn = column + 1
                let aboveTile = board[aboveTileRow][aboveTileColumn]
                let belowTile = board[belowTileRow][belowTileColumn]
                let updatedTarget = this.compareResistance(aboveTile, belowTile, targetTile, aboveTileRow, aboveTileColumn, belowTileRow, belowTileColumn, row, column, this.state.riverEnd.row, aboveTileRow, belowTileRow, this.state.riverDirection)
                console.log(updatedTarget)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
        }
           
            //if erosion target, check whether tiles to the other directions have lower resistance by 2
                //if not, erode erosion target, then score
                    //if erosion target resistance now === 0, update tile to isRiver: true, update erosion target to next tile based on riverDirection
                        //if erosion target is on the same side as riverEnd, game is over, score
                //if yes, update erosion target, erode erosion target, update riverDirection
                    //if erosion target resistance now === 0, update tile to isRiver: true, update erosion target to next tile based on riverDirection
                        //if erosion target is on the same side as riverEnd, game is over, score

    }

    columnShiftUp(col) {
        let newBoard = this.state.board
        let temp = newBoard[0][col]
        newBoard[0][col] = newBoard[1][col]
        newBoard[1][col] = newBoard[2][col]
        newBoard[2][col] = newBoard[3][col]
        newBoard[3][col] = newBoard[4][col]
        newBoard[4][col] = temp
        this.setState({ board: newBoard }, () => {this.erosionPhase()})
    }

    columnShiftDown(col) {
        let newBoard = this.state.board
        let temp = newBoard[4][col]
        newBoard[4][col] = newBoard[3][col]
        newBoard[3][col] = newBoard[2][col]
        newBoard[2][col] = newBoard[1][col]
        newBoard[1][col] = newBoard[0][col]
        newBoard[0][col] = temp
        this.setState({ board: newBoard }, () => {this.erosionPhase()})
    }

    rowShiftLeft(row) {
        let newBoard = this.state.board
        let temp = newBoard[row][0]
        newBoard[row][0] = newBoard[row][1]
        newBoard[row][1] = newBoard[row][2]
        newBoard[row][2] = newBoard[row][3]
        newBoard[row][3] = newBoard[row][4]
        newBoard[row][4] = temp
        this.setState({ board: newBoard }, () => {this.erosionPhase()})
    }

    rowShiftRight(row) {
        let newBoard = this.state.board
        let temp = newBoard[row][4]
        newBoard[row][4] = newBoard[row][3]
        newBoard[row][3] = newBoard[row][2]
        newBoard[row][2] = newBoard[row][1]
        newBoard[row][1] = newBoard[row][0]
        newBoard[row][0] = temp
        this.setState({ board: newBoard }, () => {this.erosionPhase()})
    }

    renderRows(rowNum) {
        let board = this.state.board
        let row = []
        for (let i = 0; i < 5; i++) {
            row.push(
                <div className={`tile ${board[rowNum][i].type} ` + (board[rowNum][i].isRiver ? 'river-tile' : '')} key={`${rowNum}${i}`}>{board[rowNum][i].resistance}</div>
            )
        }
        return (
            <>
                {row}
            </>
        )
    }

    render() {
        let startCol = this.state.riverStart.column
        let startRow = this.state.riverStart.row
        let endRow = this.state.riverEnd.row
        let endCol = this.state.riverEnd.column
        let rowOne = this.renderRows(0)
        let rowTwo = this.renderRows(1)
        let rowThree = this.renderRows(2)
        let rowFour = this.renderRows(3)
        let rowFive = this.renderRows(4)
        let score = this.state.score

        return (
            <div className='game'>
                <h3>Score: {score}</h3>
                <div className='button-row'>
                    <div onClick={() => this.columnShiftUp(0)} className='shift-button-vert'><button className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div onClick={() => this.columnShiftUp(1)} className={'shift-button-vert ' + ((startRow === 0 && startCol === 1) ? 'river-start' : '')}><button className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div onClick={() => this.columnShiftUp(2)} className={'shift-button-vert ' + ((startRow === 0 && startCol === 2) ? 'river-start' : '')}><button className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div onClick={() => this.columnShiftUp(3)} className={'shift-button-vert ' + ((startRow === 0 && startCol === 3) ? 'river-start' : '')}><button className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div onClick={() => this.columnShiftUp(4)} className='shift-button-vert'><button className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                </div>
                <div className='row'>
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftLeft(0)} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {rowOne}
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftRight(0)} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 1 && startCol === 0) ? 'river-start' : '') + ((endRow === 1 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(1)} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {rowTwo}
                    <div className={'shift-button-hor ' + ((startRow === 1 && startCol === 4) ? 'river-start' : '') + ((endRow === 1 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(1)} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 2 && startCol === 0) ? 'river-start' : '') + ((endRow === 2 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(2)} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {rowThree}
                    <div className={'shift-button-hor ' + ((startRow === 2 && startCol === 4) ? 'river-start' : '') + ((endRow === 2 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(2)} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 3 && startCol === 0) ? 'river-start' : '') + ((endRow === 3 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(3)} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {rowFour}
                    <div className={'shift-button-hor ' + ((startRow === 3 && startCol === 4) ? 'river-start' : '') + ((endRow === 3 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(3)} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftLeft(4)} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {rowFive}
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftRight(4)} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='button-row'>
                    <div onClick={() => this.columnShiftDown(0)} className='shift-button-vert'><button className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div onClick={() => this.columnShiftDown(1)} className={'shift-button-vert ' + ((endRow === 4 && endCol === 1) ? 'river-end' : '')}><button className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div onClick={() => this.columnShiftDown(2)} className={'shift-button-vert ' + ((endRow === 4 && endCol === 2) ? 'river-end' : '')}><button className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div onClick={() => this.columnShiftDown(3)} className={'shift-button-vert ' + ((endRow === 4 && endCol === 3) ? 'river-end' : '')}><button className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div onClick={() => this.columnShiftDown(4)} className='shift-button-vert'><button className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                </div>
            </div>
        )
    }
}