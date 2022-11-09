import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { GameDetail } from "../components/game/GameDetail"
import { GameEdit } from "../components/game/GameEdit"
import { EventDetail } from "../components/event/EventDetail"
import { EventEdit } from "../components/event/EventEdit"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:gameId/details" element={<GameDetail />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId/details" element={<EventDetail />} />
                <Route path="/events/:eventId/edit" element={<EventEdit />} />
            </Route>
        </Routes>
    </>
}
