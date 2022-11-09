import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById } from "../../managers/GameManager";


export const GameDetail = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const navigate = useNavigate()


    useEffect(() => {
        getGameById(gameId)
            .then(setGame);
    }, [gameId]);

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: `/games/${gameId}/edit` })
                }}
            >Edit Game</button>
            <section className="game">
                <h3 className="game__name">{game.title}</h3>
                <div className="game__type">Game Type: {game.game_type?.label}</div>
                <div className="game__maker">Maker: {game.maker}</div>
                <div className="game__players">{game.number_of_players} players needed</div>
                <div className="game__skillLevel">Skill level is {game.skill_level}</div>
            </section>
        </>
    );
}