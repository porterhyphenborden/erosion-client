import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import screenshotSetup from '../../images/screenshot-setup.png'
import screenshot1 from '../../images/screenshot1.png'
import screenshot2 from '../../images/screenshot2.png'
import './RulesPage.css'

export default class RulesPage extends Component {

    static contextType = ErosionContext

    componentDidMount() {
        this.context.backdropClickHandler()
    }

    render() {
        return (
            <div className='rules'>
                <h2>How to Play Erosion</h2>
                <div role="navigation" className="page-nav">
                    <a href="#intro">Intro</a>
                    <a href="#setup">Setup</a>
                    <a href="#gameplay">Gameplay</a>
                    <a href="#scoring">Scoring</a>
                </div>
                <section>
                    <h3 id="intro">Intro</h3>
                    <p>
                    Erosion is a single-player puzzle game where you, an alien colonist, are tasked with terraforming a new planet. Given a map of the terrain, you must manipulate the terrain to make the river reach a future colony site, creating as much fertile soil along the way as possible. You will receive a bonus if the river reaches the desired endpoint, and bonuses for createing fertile land along the way. If the river ends on the wrong side of the map, you will be penalized!
                    </p>
                </section>
                <section>
                    <h3 id="setup">Setup</h3>
                    <img src={screenshotSetup} alt='screenshot of game setup' className='screenshot setup' />
                    <p>
                    The map is made of varying terrain types, with different resistances. A tile may be one of the following:
                    </p>
                    <ul>
                        <li>Quartz - resistance of 7</li>
                        <li>Granite - resistance of 5</li>
                        <li>Limestone - resistance of 3</li>
                        <li>Sandstone - resistance of 2</li>
                        <li>Soil - resistance of 1</li>
                    </ul>
                    <p>
                    The river's starting point is indicated by a dark blue background, and the end point by light blue. The player shift the terrain with the arrow buttons at the top/bottom or right/left of each column or row. The current erosion target is indicated by a red outline.
                    </p>
                </section>
                <section>
                    <h3 id="gameplay">Gameplay</h3>
                    <h4>Gameplay proceeds as follows:</h4>
                        <ul>
                            <li>
                                The player either shifts one row/column of the map, or chooses the leave the map as is.
                            </li>
                            <li>
                                The riverhead will erode a tile by 1 resistance. The tile that is eroded will either be the tile in the river's course, or, if the tile to either side of the riverhead has a resistance that is 2 or more lower than the tile in the river's course, the river will change course and erode that tile instead. If the tile is eroded to a resistance of zero, that tile becomes part of the river, and it's location is the new riverhead.
                            </li>
                            <li>
                                If the river reaches the end of the map, the game is over.
                            </li>
                        </ul>
                    <h4>Changing course:</h4>
                    <p>
                    When the river meets a tile with a resistance that is 2 or more higher than one or both tiles to either side of the riverhead, the resistance of those tiles is compared. If both tiles to either side of the riverhead have a lower resistance by two or more, the tile with the lower resistance will be the new erosion target. If there is a tie, the tile closest to the river end point will be eroded, and if again a tile, one will be randomly chosen. The direction of the river then changes, and the tile in it's path is the next erosion target.
                    </p>
                    <div className='screenshot-container'>
                        <div className='img-caption-container'>
                            <img src={screenshot1} alt='screenshot of gameplay' className='screenshot gameplay' />
                            <p className='mobile-caption'>The resistance of the current erosion target (in red) is compared to the resistance of the tiles adjacent to the riverhead (in blue). If the resistance of one or both of those tiles is less by 2 or more, the river will change course and erode the new target.</p>
                        </div>
                        <div className='img-caption-container'>
                            <img src={screenshot2} alt='screenshot of gameplay' className='screenshot gameplay' />
                            <p className='mobile-caption'>The river has changed course and fully eroded it's target. That tile has become part of the river. The new target (in red) will be the next tile in line according to the river's direction (in this case, right).</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 id="scoring">Scoring</h3>
                    <p>
                    Throughout the game, points are awarded for any tiles other than soil that are fully eroded to a resistance of zero (100 points per the original resistance of that tile type). At the end of the game, final scoring bonuses are awarded for where the river ended up exiting the map, and the soil tiles remaining along the river.
                    </p>
                        <ul>
                            <li>
                                End point bonus: Getting your river to the desired endpoint awards extra points!
                                <ul>
                                    <li>If the river exited the map at the desired location exactly, a final score bonus of 1.5x the score is awarded.</li>
                                    <li>If the river exited the map on the same side as the desired location, no bonus and no penalty are awarded.</li>
                                    <li>If the river exited the map on a different side from the desired location, a score penalty of .75x the score is given.</li>
                                </ul>
                            </li>
                            <li>
                                Soil bonus: The more fertile soil along your river, the better! For each river tile, a bonus of 300 point is granted for each adjacent soil tile.
                            </li>
                        </ul>
                </section>
            </div>
        )
    }
}