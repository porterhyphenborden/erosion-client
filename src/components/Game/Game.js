import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import chevronRight from '../../images/chevronright.png'
import chevronLeft from '../../images/chevronleft.png'
import chevronUp from '../../images/chevronup.png'
import chevronDown from '../../images/chevrondown.png'
import map1 from '../../images/map1.png'
import map2 from '../../images/map2.png'
import map3 from '../../images/map3.png'
import map4 from '../../images/map4.png'
import map5 from '../../images/map5.png'
import mysteryMap from '../../images/randommap.png'
import './Game.css'
import ErosionApiService from '../../services/erosion-api-service';

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            riverStart: null,
            riverEnd: null,
            board: null,
            erosionTarget: null,
            riverDirection: null,
            score: {
                score: 0,
                soilBonus: 0,
                locationBonus: 0,
                final: 0
            },
            riverPath: [],
            gameOver: false,
            rowsDisabled: [],
            columnsDisabled: [],
            buttonsDisabled: false,
            map: null,
            mapSelected: false,
            error: null
        }
    }

    static defaultProps = {
        history: {
          push: () => { }
        }
    }

    updateErosionTarget(target) {
        let newTarget = {}
        if (this.state.riverDirection === 'down') {
            newTarget.row = target.row + 1
            newTarget.column = target.column
            this.setState({
                erosionTarget: {
                    row: newTarget.row,
                    column: newTarget.column
                }
            })
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

    postScore(score) {
        let newScore = {
            score: score.score,
            final_score: score.final,
            soil_bonus: score.soilBonus,
            location_bonus: score.locationBonus,
            map_id: this.state.map
        }
        ErosionApiService.postScore(newScore)
            .then(res => {
                this.setState({ 
                    score: score,
                    gameOver: true
                })
            })
            .catch(res => {
                this.setState({ error: res.error, gameOver: true })
            })
    }

    finalScore(target) {
        let river = this.state.riverPath
        let board = this.state.board
        let initialScore = this.state.score.score
        let scoreMultiplier = 1
        let soilCount = 0
        //check for soil tile bonuses - loop through river tiles and check adjacent tiles for type === 'soil'
        for (let i = 0; i < river.length; i++) {
            let top = river[i].row !== 0 ? board[river[i].row - 1][river[i].column] : null
            let right = river[i].column !== 4 ? board[river[i].row][river[i].column + 1] : null
            let bottom = river[i].row !== 4 ? board[river[i].row + 1][river[i].column] : null
            let left = river[i].column !== 0 ? board[river[i].row][river[i].column - 1] : null
            if (top && top.isRiver !== true && top.type === 'soil') {
                soilCount += 1
            }
            if (right && right.isRiver !== true && right.type === 'soil') {
                soilCount += 1
            }
            if (bottom && bottom.isRiver !== true && bottom.type === 'soil') {
                soilCount += 1
            }
            if (left && left.isRiver !== true && left.type === 'soil') {
                soilCount += 1
            }
        }
        let soilBonus = soilCount * 300
        //calculate ending location bonus
        //if exact tile was reached, bonus multiplier is 1.5
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
        let finalScore = (initialScore + soilBonus ) * scoreMultiplier
        let newScore = {
            score: initialScore,
            soilBonus: soilBonus,
            locationBonus: scoreMultiplier,
            final: finalScore
        }
        this.postScore(newScore)
    }

    pauseBeforeFinalScore(target) {
        setTimeout(() => {
            this.finalScore(target)
        }, 500)
    }

    checkForEnd(target) {
        //if the target is on an edge && the target is not the start
        if ((((target.row === 0) || (target.row === 4)) && !((target.row === this.state.riverStart.row) && (target.column === this.state.riverStart.column))) || 
           (((target.column === 0) || (target.column === 4)) && !((target.row === this.state.riverStart.row) && (target.column === this.state.riverStart.column)))) {
            this.pauseBeforeFinalScore(target)
        }
        else {
            this.updateErosionTarget(target)
        }
    }

    checkRiver(target) {
        let board = this.state.board
        let tile = board[target.row][target.column]
        if (tile.resistance === 0) {
            tile.isRiver = true
            let riverArray = this.state.riverPath
            riverArray.push({
                row: target.row,
                column: target.column
            })
            let rows = this.state.rowsDisabled
            let columns = this.state.columnsDisabled
            if (!rows.includes(target.row)) {
                rows.push(target.row)
            }
            if (!columns.includes(target.column)) {
                columns.push(target.column)
            }
            this.setState({
                board: board,
                riverPath: riverArray,
                rowsDisabled: rows,
                columnsDisabled: columns,
                buttonsDisabled: false
            }, () => this.checkForEnd(target))
        }
        else {
            this.setState({
                buttonsDisabled: false
            })
        }
    }

    updateScore(target) {
        let tile = this.state.board[target.row][target.column]
        let scoreUpdate = 0
        //if land tile other than soil was fully eroded
        if (tile.resistance === 0) {
            if (tile.type !== 'soil') {
                scoreUpdate = tile.resistanceOriginal * 100
                let newScore = this.state.score.score + scoreUpdate
                this.setState((prevState) => ({ 
                    score: {
                        ...prevState.score,
                        score: newScore
                    }
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
        let board = this.state.board
        let tile = board[target.row][target.column]
        if (tile.resistance > 0) {
            tile.resistance -= 1
        }
        this.setState({board}, () => {this.updateScore(target)})
    }

    compareResistance(tile1, tile2, target, tile1Row, tile1Column, tile2Row, tile2Column, targetRow, targetColumn, riverEndPoint, tile1Compare, tile2Compare, direction) {
        let newTarget = {}
        //If either tile is null, erosion target is at edge of board so disregard that tile in comparison
        if (tile1 === null) {
            if ((target.resistance - tile2.resistance) >= 2) {
                if (tile2.isRiver === true) {
                    newTarget.row = targetRow
                    newTarget.column = targetColumn
                }
                else if (tile2.isRiver !== true) {
                    newTarget.row = tile2Row
                    newTarget.column = tile2Column
                }
            }
            else {
                newTarget.row = targetRow
                newTarget.column = targetColumn
            }
        }
        else if (tile2 === null) {
            if ((target.resistance - tile1.resistance) >= 2) {
                if (tile1.isRiver === true) {
                    newTarget.row = targetRow
                    newTarget.column = targetColumn
                }
                else if (tile1.isRiver !== true) {
                    newTarget.row = tile1Row
                    newTarget.column = tile1Column
                }
            }
            else {
                newTarget.row = targetRow
                newTarget.column = targetColumn
            }
        }
        //If both comparison tiles' resistance is less than target by 2 or more, check if either is a river tile, then check which has lower resistance
        else if (((target.resistance - tile1.resistance) >= 2) && ((target.resistance - tile2.resistance) >= 2)) {
            if (tile1.isRiver === true) {
                newTarget.row = tile2Row
                newTarget.column = tile2Column
            }
            else if (tile2.isRiver === true) {
                newTarget.row = tile1Row
                newTarget.column = tile1Column
            }
            else if (tile1.resistance < tile2.resistance) {
                newTarget.row = tile1Row
                newTarget.column = tile1Column
            }
            else if (tile1.resistance > tile2.resistance) {
                newTarget.row = tile2Row
                newTarget.column = tile2Column
            }
            //If equal resistance, choose by closeness to riverEnd, and if equal, choose randomly
            else if (tile1.resistance === tile2.resistance) {
                if ((Math.abs(riverEndPoint - tile1Compare)) < (Math.abs(riverEndPoint - tile2Compare))) {
                    newTarget.row = tile1Row
                    newTarget.column = tile1Column
                }
                else if ((Math.abs(riverEndPoint - tile1Compare)) > (Math.abs(riverEndPoint - tile2Compare))) {
                    newTarget.row = tile2Row
                    newTarget.column = tile2Column
                }
                else if ((Math.abs(riverEndPoint - tile1Compare)) === (Math.abs(riverEndPoint - tile2Compare))) {
                    let num = Math.floor(Math.random() * Math.floor(2))
                    if (num === 0) {
                        newTarget.row = tile1Row
                        newTarget.column = tile1Column
                    }
                    else if (num === 1) {
                        newTarget.row = tile2Row
                        newTarget.column = tile2Column
                    }
                }
            }
            
        }
        //if adjacent tile 1 has lower resistance by at least 2, check whether it is a river tile
        else if ((target.resistance - tile1.resistance) >= 2) {
            if (tile1.isRiver === true) {
                newTarget.row = targetRow
                newTarget.column = targetColumn
            }
            else if (tile1.isRiver !== true) {
                newTarget.row = tile1Row
                newTarget.column = tile1Column
            }
        }
        //if adjacent tile 2 has lower resistance by at least 2, check whether it is a river tile
        else if ((target.resistance - tile2.resistance) >= 2) {
            if (tile2.isRiver === true) {
                newTarget.row = targetRow
                newTarget.column = targetColumn
            }
            else if (tile2.isRiver !== true) {
                newTarget.row = tile2Row
                newTarget.column = tile2Column
            }
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
                newTarget.direction = 'up'
            }
            else {
                newTarget.direction = direction
            }
        }
        return newTarget
    }

    erosionPhase() {
        //if no erosion target, this is first move, erosion target is riverStart
        if (this.state.erosionTarget === null) {
            this.setState({
                erosionTarget: {
                    row: this.state.riverStart.row,
                    column: this.state.riverStart.column
                }
            })
            //if riverStart row === 0, riverDirection will be down
            if (this.state.riverStart.row === 0) {
                this.setState({riverDirection: 'down'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //if riverStart row !== 0, and riverStart col === 0, riverDirection will be right
            else if (this.state.riverStart.row !== 0 && this.state.riverStart.column === 0) {
                this.setState({riverDirection: 'right'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //if riverStart row !== 0 and riverStart col !==0, riverDirection will be left
            else if (this.state.riverStart.row !== 0 && this.state.riverStart.column === 4) {
                this.setState({riverDirection: 'left'}, () => {this.erodeTarget(this.state.erosionTarget)})
            }
        }
        else if (this.state.erosionTarget !== null) {
            let board = this.state.board
            let row = this.state.erosionTarget.row
            let column = this.state.erosionTarget.column
            let targetTile = board[row][column]
            //If erosionTarget is still adjacent to riverStart
            if (row === this.state.riverStart.row && column === this.state.riverStart.column) {
                this.erodeTarget(this.state.erosionTarget)
            }
            //If river direction is down, check whether tiles to the right and left have lower resistance by 2
            else if ((this.state.riverDirection === 'down')) {
                let leftTileRow = row - 1
                let leftTileColumn = column - 1
                let rightTileRow = row - 1
                let rightTileColumn = column + 1
                let leftTile
                let rightTile
                if ((leftTileRow < 0 || leftTileRow > 4) || (leftTileColumn < 0 || leftTileColumn > 4)) {
                    leftTile = null
                    rightTile = board[rightTileRow][rightTileColumn]
                }
                else if ((rightTileRow < 0 || rightTileRow > 4) || (rightTileColumn < 0 || rightTileColumn > 4)) {
                    leftTile = board[leftTileRow][leftTileColumn]
                    rightTile = null
                }
                else {
                    leftTile = board[leftTileRow][leftTileColumn]
                    rightTile = board[rightTileRow][rightTileColumn]
                }
                let updatedTarget = this.compareResistance(leftTile, rightTile, targetTile, leftTileRow, leftTileColumn, rightTileRow, rightTileColumn, row, column, this.state.riverEnd.column, leftTileColumn, rightTileColumn, this.state.riverDirection)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is up check whether tiles above and below have lower resistance by 2
            else if ((this.state.riverDirection === 'up')) {
                let leftTileRow = row + 1
                let leftTileColumn = column - 1
                let rightTileRow = row + 1
                let rightTileColumn = column + 1
                let leftTile
                let rightTile
                if ((leftTileRow < 0 || leftTileRow > 4) || (leftTileColumn < 0 || leftTileColumn > 4)) {
                    leftTile = null
                    rightTile = board[rightTileRow][rightTileColumn]
                }
                else if ((rightTileRow < 0 || rightTileRow > 4) || (rightTileColumn < 0 || rightTileColumn > 4)) {
                    leftTile = board[leftTileRow][leftTileColumn]
                    rightTile = null
                }
                else {
                    leftTile = board[leftTileRow][leftTileColumn]
                    rightTile = board[rightTileRow][rightTileColumn]
                }
                let updatedTarget = this.compareResistance(leftTile, rightTile, targetTile, leftTileRow, leftTileColumn, rightTileRow, rightTileColumn, row, column, this.state.riverEnd.column, leftTileColumn, rightTileColumn, this.state.riverDirection)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is right check whether tiles above and below have lower resistance by 2
            else if ((this.state.riverDirection === 'right')) {
                let aboveTileRow = row - 1
                let aboveTileColumn = column - 1
                let belowTileRow = row + 1
                let belowTileColumn = column - 1
                let aboveTile
                let belowTile
                if ((aboveTileRow < 0 || aboveTileRow > 4) || (aboveTileColumn < 0 || aboveTileColumn > 4)) {
                    aboveTile = null
                    belowTile = board[belowTileRow][belowTileColumn]
                }
                else if ((belowTileRow < 0 || belowTileRow > 4) || (belowTileColumn < 0 || belowTileColumn > 4)) {
                    aboveTile = board[aboveTileRow][aboveTileColumn]
                    belowTile = null
                }
                else {
                    aboveTile = board[aboveTileRow][aboveTileColumn]
                    belowTile = board[belowTileRow][belowTileColumn]
                }
                let updatedTarget = this.compareResistance(aboveTile, belowTile, targetTile, aboveTileRow, aboveTileColumn, belowTileRow, belowTileColumn, row, column, this.state.riverEnd.row, aboveTileRow, belowTileRow, this.state.riverDirection)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
            //If river direction is left check whether tiles above and below have lower resistance by 2
            else if (this.state.riverDirection === 'left') {
                let aboveTileRow = row - 1
                let aboveTileColumn = column + 1
                let belowTileRow = row + 1
                let belowTileColumn = column + 1
                let aboveTile
                let belowTile
                if ((aboveTileRow < 0 || aboveTileRow > 4) || (aboveTileColumn < 0 || aboveTileColumn > 4)) {
                    aboveTile = null
                    belowTile = board[belowTileRow][belowTileColumn]
                }
                else if ((belowTileRow < 0 || belowTileRow > 4) || (belowTileColumn < 0 || belowTileColumn > 4)) {
                    aboveTile = board[aboveTileRow][aboveTileColumn]
                    belowTile = null
                }
                else {
                    aboveTile = board[aboveTileRow][aboveTileColumn]
                    belowTile = board[belowTileRow][belowTileColumn]
                }
                let updatedTarget = this.compareResistance(aboveTile, belowTile, targetTile, aboveTileRow, aboveTileColumn, belowTileRow, belowTileColumn, row, column, this.state.riverEnd.row, aboveTileRow, belowTileRow, this.state.riverDirection)
                this.setState({
                    erosionTarget: {
                        row: updatedTarget.row,
                        column: updatedTarget.column
                    },
                    riverDirection: updatedTarget.direction
                }, () => {this.erodeTarget(this.state.erosionTarget)})
            }
        }
    }

    pauseBeforeErosionPhase() {
        setTimeout(() => {
            this.erosionPhase()
        }, 500)
    }

    columnShiftUp(col) {
        let newBoard = this.state.board
        let temp = newBoard[0][col]
        newBoard[0][col] = newBoard[1][col]
        newBoard[1][col] = newBoard[2][col]
        newBoard[2][col] = newBoard[3][col]
        newBoard[3][col] = newBoard[4][col]
        newBoard[4][col] = temp
        this.setState({ 
            board: newBoard,
            buttonsDisabled: true 
        }, () => {this.pauseBeforeErosionPhase()})
    }

    columnShiftDown(col) {
        let newBoard = this.state.board
        let temp = newBoard[4][col]
        newBoard[4][col] = newBoard[3][col]
        newBoard[3][col] = newBoard[2][col]
        newBoard[2][col] = newBoard[1][col]
        newBoard[1][col] = newBoard[0][col]
        newBoard[0][col] = temp
        this.setState({ 
            board: newBoard,
            buttonsDisabled: true  
        }, () => {this.pauseBeforeErosionPhase()})
    }

    rowShiftLeft(row) {
        let newBoard = this.state.board
        let temp = newBoard[row][0]
        newBoard[row][0] = newBoard[row][1]
        newBoard[row][1] = newBoard[row][2]
        newBoard[row][2] = newBoard[row][3]
        newBoard[row][3] = newBoard[row][4]
        newBoard[row][4] = temp
        this.setState({ 
            board: newBoard,
            buttonsDisabled: true  
        }, () => {this.pauseBeforeErosionPhase()})
    }

    rowShiftRight(row) {
        let newBoard = this.state.board
        let temp = newBoard[row][4]
        newBoard[row][4] = newBoard[row][3]
        newBoard[row][3] = newBoard[row][2]
        newBoard[row][2] = newBoard[row][1]
        newBoard[row][1] = newBoard[row][0]
        newBoard[row][0] = temp
        this.setState({ 
            board: newBoard,
            buttonsDisabled: true  
        }, () => {this.pauseBeforeErosionPhase()})
    }

    skipShift() {
        this.setState({ 
            buttonsDisabled: true  
        }, () => {this.pauseBeforeErosionPhase()})
    }

    renderRows(rowNum) {
        let board = this.state.board
        let erosionTarget = this.state.erosionTarget
        let row = []
        for (let i = 0; i < 5; i++) {
            row.push(
                <div className={`tile ${board[rowNum][i].type} ` + (board[rowNum][i].isRiver ? 'river-tile ' : '') + ((erosionTarget && rowNum === erosionTarget.row && i === erosionTarget.column) ? 'target-tile' : '')} key={`${rowNum}${i}`}>{board[rowNum][i].resistance}</div>
            )
        }
        return (
            <>
                {row}
            </>
        )
    }

    reloadRoute = () => {
        window.location.reload()
    }

    layoutBoard(board, res) {
        for (let i = 0; i < 25; i++) {
            let row = Math.floor(i / 5)
            let col = i % 5
            board[row][col] = {}
            board[row][col].type = res[i].type;
            board[row][col].resistance = res[i].resistance;
            board[row][col].resistanceOriginal = res[i].resistance;
        }
        return board
    }

    setBoard(map) {
        ErosionApiService.getMapByID(map)
            .then(res => {
                this.setState({ 
                    riverStart: {
                        row: res.river_start_row,
                        column: res.river_start_column
                    },
                    riverEnd: {
                        row: res.river_end_row,
                        column: res.river_end_column
                    }
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        ErosionApiService.getLayoutByMapID(map)
            .then(res => {
                let empty = [[], [], [], [], []]
                let newBoard = this.layoutBoard(empty, res)
                this.setState({
                    board: newBoard
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            mapSelected: true
        }, () => {this.setBoard(this.state.map)})
    }

    updateMap = map => {
        if (map === 'random') {
            map = Math.ceil(Math.random() * 5)
        }
        else if (map !== null) {
            map = parseInt(map)
        }
        this.setState({
            map: map
        })
    }

    render() {
        let error = this.state.error
        let startCol = this.state.riverStart ? this.state.riverStart.column : null
        let startRow = this.state.riverStart ? this.state.riverStart.row : null
        let endRow = this.state.riverEnd ? this.state.riverEnd.row : null
        let endCol = this.state.riverEnd ? this.state.riverEnd.column : null
        let score = this.state.score
        let buttonsDisabled = this.state.buttonsDisabled
        let row0Disabled = this.state.rowsDisabled.includes(0)
        let row1Disabled = this.state.rowsDisabled.includes(1)
        let row2Disabled = this.state.rowsDisabled.includes(2)
        let row3Disabled = this.state.rowsDisabled.includes(3)
        let row4Disabled = this.state.rowsDisabled.includes(4)
        let col0Disabled = this.state.columnsDisabled.includes(0)
        let col1Disabled = this.state.columnsDisabled.includes(1)
        let col2Disabled = this.state.columnsDisabled.includes(2)
        let col3Disabled = this.state.columnsDisabled.includes(3)
        let col4Disabled = this.state.columnsDisabled.includes(4)

        if (this.state.mapSelected === false) {
            let maps = {
                1: map1,
                2: map2,
                3: map3,
                4: map4,
                5: map5
            }

            return (
                <>
                    <form className='map-selection' name='map-selection' onSubmit={e => this.handleSubmit(e)}>
                        <h2>Play Erosion!</h2>
                        <div role='alert'>
                            {error && <div className='error'>{error}</div>}
                        </div>
                        <label htmlFor='map'>Choose a map:</label>
                        <select name='map' ref={el => this.el = el} id='map'onChange={e => this.updateMap(e.target.value || null)}>
                            <option value={null}></option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='random'>Random Map</option>
                        </select>
                        <button type='submit' disabled={this.state.map === null}>Select</button>
                    </form>
                    {(this.state.map !== null && this.el.value !== 'random') && <div className='map-preview'><img src={maps[this.state.map]} alt='preview of map'/></div>}
                    {(this.state.map !== null && this.el.value === 'random') && <div className='map-preview'><img src={mysteryMap} alt='random map'/></div>}
                </>
            )
        }

        else if (this.state.board === null) {
            return (
                <>
                    <div className='loading'>LOADING</div>
                    <div role='alert'>
                        {error && <div className='error'>{error}</div>}
                    </div>
                </>
            )
        }

        else if (this.state.board !== null && this.state.mapSelected === true) {
            return (
            <>
            <div className={this.state.gameOver === false ? 'final-hidden' : 'final-screen'}>
                <h2>Game Over!</h2>
                <h3>Final score: {score.final}</h3>
                <p><span className='score-factor'>Initial Score: {score.score}</span><span className='score-factor'>Soil Tile Bonus: {score.soilBonus}</span><span className='score-factor'>End Location Bonus: Score x {score.locationBonus}</span></p>
                <Link className='game-over-link' to='/play' onClick={() => this.reloadRoute()}>Play Again</Link>
                <Link className='game-over-link' to='/my-games'>View Your Previous Scores</Link>
                <Link className='game-over-link' to='/leaderboard'>Check the Leaderboard</Link>
            </div>
            <div className='game'>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <div className='setup-reminders'>
                    <div><span>River start:</span><div className='color river-start'></div></div>
                    <div><span>River end target:</span><div className='color river-end'></div></div>
                    <div><span>Erosion target:</span><div className='color target-tile'></div></div>
                </div>
                {this.state.gameOver === false ? <h3 className='score'>Score: {score.score}</h3> : <h3>Final Score: {score.final}</h3>}
                <div className='button-row'>
                    <div className='shift-button-vert'><button onClick={() => this.columnShiftUp(0)} disabled={col0Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div className={'shift-button-vert ' + ((startRow === 0 && startCol === 1) ? 'river-start' : '')}><button onClick={() => this.columnShiftUp(1)} disabled={col1Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div className={'shift-button-vert ' + ((startRow === 0 && startCol === 2) ? 'river-start' : '')}><button onClick={() => this.columnShiftUp(2)} disabled={col2Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div className={'shift-button-vert ' + ((startRow === 0 && startCol === 3) ? 'river-start' : '')}><button onClick={() => this.columnShiftUp(3)} disabled={col3Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                    <div className='shift-button-vert'><button onClick={() => this.columnShiftUp(4)} disabled={col4Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronUp} alt='shift up'/></button></div>
                </div>
                <div className='row'>
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftLeft(0)} disabled={row0Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {this.renderRows(0)}
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftRight(0)} disabled={row0Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 1 && startCol === 0) ? 'river-start' : '') + ((endRow === 1 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(1)} disabled={row1Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {this.renderRows(1)}
                    <div className={'shift-button-hor ' + ((startRow === 1 && startCol === 4) ? 'river-start' : '') + ((endRow === 1 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(1)} disabled={row1Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 2 && startCol === 0) ? 'river-start' : '') + ((endRow === 2 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(2)} disabled={row2Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {this.renderRows(2)}
                    <div className={'shift-button-hor ' + ((startRow === 2 && startCol === 4) ? 'river-start' : '') + ((endRow === 2 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(2)} disabled={row2Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className={'shift-button-hor ' + ((startRow === 3 && startCol === 0) ? 'river-start' : '') + ((endRow === 3 && endCol === 0) ? 'river-end' : '')}><button onClick={() => this.rowShiftLeft(3)} disabled={row3Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {this.renderRows(3)}
                    <div className={'shift-button-hor ' + ((startRow === 3 && startCol === 4) ? 'river-start' : '') + ((endRow === 3 && endCol === 4) ? 'river-end' : '')}><button onClick={() => this.rowShiftRight(3)} disabled={row3Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='row'>
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftLeft(4)} disabled={row4Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronLeft} alt='shift left'/></button></div>
                    {this.renderRows(4)}
                    <div className='shift-button-hor'><button onClick={() => this.rowShiftRight(4)} disabled={row4Disabled || buttonsDisabled} className='shift-button'><img className='chevron hor' src={chevronRight} alt='shift right'/></button></div>
                </div>
                <div className='button-row'>
                    <div className='shift-button-vert'><button onClick={() => this.columnShiftDown(0)} disabled={col0Disabled} className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div className={'shift-button-vert ' + ((endRow === 4 && endCol === 1) ? 'river-end' : '')}><button onClick={() => this.columnShiftDown(1)} disabled={col1Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div className={'shift-button-vert ' + ((endRow === 4 && endCol === 2) ? 'river-end' : '')}><button onClick={() => this.columnShiftDown(2)} disabled={col2Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div className={'shift-button-vert ' + ((endRow === 4 && endCol === 3) ? 'river-end' : '')}><button onClick={() => this.columnShiftDown(3)} disabled={col3Disabled || buttonsDisabled} className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                    <div className='shift-button-vert'><button onClick={() => this.columnShiftDown(4)} disabled={col4Disabled} className='shift-button'><img className='chevron vert' src={chevronDown} alt='shift down'/></button></div>
                </div>
                <button onClick={() => this.skipShift()} className='skip-button'>Skip Row/Column Shift</button>
            </div>
            </>
        )
        }
    }
}