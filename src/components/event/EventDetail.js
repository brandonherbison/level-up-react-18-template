import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../managers/EventManager";


export const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate()


    useEffect(() => {
        getEventById(eventId)
            .then(setEvent);
    }, [eventId]);

    return (
        <>
            <section className="game">
                <h3 className="event__description">{event.description}</h3>
                <div className="event__game">Game: {event.game?.title}</div>
                <div className="event__datetime">Date and Time: {event.date} at {event.time}</div>
                <div className="event__organizer">Organizer: {event.organizer?.full_name}</div>
            </section>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: `/events/${eventId}/edit` })
                }}
            >Edit Event</button>
        </>
    );
}