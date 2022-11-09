import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameById, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const GameEdit = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: "",
        number_of_players: "",
        title: "",
        maker: "",
        game_type: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getGameById(gameId).then(data => setCurrentGame(data))
    }, [gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGameState = { ...currentGame }
        newGameState[domEvent.target.id] = domEvent.target.value
        setCurrentGame(newGameState)

        
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" id="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" id="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" id="number_of_players"required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select value={currentGame.game_type} name="gameType" id="game_type" className="form-control"
                        onChange={changeGameState}>
                        <option value="0">Select a game type</option>
                        {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(navigate({ pathname: "/games" }))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}