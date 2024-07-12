import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);
    const character = store.character;
    useEffect(() => {
        return () => actions.setCharacter({})
    }, [])

    return (
        <div className="container">
            <div className="card contact-card my-2">
                <div className="card-body">
                    <img
                        className=""
                        src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                    />
                        <div>
                            <h5 className="card-name">{character.name}</h5>
                            <p>
                                Geneder: {character.properties?.gender}<br />
                                Height: {character.properties?.height}<br />
                                Eye Color: {character.properties?.eye_color}<br />
                                Hair Color: {character.properties?.hair_color}<br />
                            </p>
                        </div>
                        <div>
                            <Link to="/Characters">
                                <button type="button" className="btn btn-primary">Characters List</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

    );
};