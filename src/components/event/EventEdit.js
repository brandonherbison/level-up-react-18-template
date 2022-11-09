//import all necessary components
import { useState, useEffect } from "react"
import { getEventById, updateEvent } from "../../managers/EventManager"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"



export const EventEdit = () => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    const { eventId } = useParams();

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: ""
    })
    // get games and set the state of games
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        getEventById(eventId).then(data => setCurrentEvent({
            description: data.description,
            date: data.date,
            time: data.time,
            game: data.game.id
    }))
    }, [eventId])

    const updateCurrentEvent = () => {
        const event = {
            id: eventId,
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game: parseInt(currentEvent.game)
        }

        // Send POST request to your API
        updateEvent(event)
        .then(navigate({ pathname: "/events" }))
    }
    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.id] = event.target.value
        setCurrentEvent(newEventState)
    }

    return <>
    {/* form to create new event */}
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event</h2>
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
                    updateCurrentEvent()
                }}
                className="btn btn-primary">Update</button>
        </form>
    </>
}
