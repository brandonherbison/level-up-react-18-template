import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { deleteGame, getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    const updateGameList = () => {
        getGames().then(data => setGames(data))
    }

    useEffect(() => {
        updateGameList()
    }, [])

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">
                            <a href={`/games/${game.id}/details`}>{game.title}</a>
                        </div>
                        <div className="game__maker">by {game.maker}</div>
                        <div>
                            <button
                                onClick={() => {
                                    deleteGame(game.id).then(updateGameList)
                                }}>
                                Delete
                            </button>
                        </div>


                    </section>
                })
            }
        </article>
    </>
    )
}

