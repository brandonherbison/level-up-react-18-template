//import all necessary components
import { useState, useEffect } from "react"
import { createEvent } from "../../managers/EventManager"
import { useNavigate } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"



export const EventForm = () => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: 0
    })
    // get games and set the state of games
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const constructNewEvent = () => {
        const event = {
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game: parseInt(currentEvent.game)
        }

        // Send POST request to your API
        createEvent(event)
            .then(() => navigate("/events"))
    }
    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.id] = event.target.value
        setCurrentEvent(newEventState)
    }

    return <>
        {/* form to create new event */}
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" id="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" id="game" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                        <option value="0">Select a game</option>
                        {games.map(game => (
                            <option key={game.id} value={game.id}>
                                {game.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewEvent()
                }}
                className="btn btn-primary">Create</button>
        </form>
    </>
}
