import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    const updateEventList = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        updateEventList()
    }, [])

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">Game: {event.game.title}</div>
                        <div className="event__description">Description: {event.description}</div>

                        <div className="event__detail">
                            <a href={`/events/${event.id}/details`}>Details</a>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    deleteEvent(event.id).then(updateEventList)
                                }}>
                                Delete
                            </button>
                        </div>
                        <div>
                            {
                                event.joined 
                                ?<button
                                    onClick={() => {
                                        leaveEvent(event.id).then(updateEventList)
                                    }}>Leave</button>
                                    
                                :<button
                                    onClick={() => {
                                        joinEvent(event.id).then(updateEventList)
                                    }
                                }>Join</button>

                                }

                        </div>
                    </section>
                })
            }
        </article>
    </>
    )
}