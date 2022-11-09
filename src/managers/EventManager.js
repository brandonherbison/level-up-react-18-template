export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST", body: JSON.stringify(event)
    })
        .then(response => response.json())
}
export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        method: "PUT", body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())

};

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })
}

export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })
  }
  
  export const joinEvent = eventId => {
      // TODO: Write the POST fetch request to join and event
        return fetch(`http://localhost:8000/events/${eventId}/signup`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            method: "POST"
        })
  }