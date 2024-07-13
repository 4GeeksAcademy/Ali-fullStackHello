import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);
    const character = store.character;
    useEffect(() => {
        return () => actions.setCharacter({})
    }, [])
    const handleImgError = (event) => {
        event.target.src= 'https://cdn-icons-png.freepik.com/256/2010/2010147.png?semt=ais_hybrid'
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card contact-card my-2">
                        <div className="card-body">
                            <img
                                className="card-img-top"
                                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                onError={handleImgError}
                                alt={character.name}
                            />
                            <div>
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">
                                    Gender: {character.properties?.gender}<br />
                                    Height: {character.properties?.height}<br />
                                    Eye Color: {character.properties?.eye_color}<br />
                                    Hair Color: {character.properties?.hair_color}<br />
                                </p>
                            </div>
                            <div>
                                <Link to="/characters">
                                    <button type="button" className="btn btn-primary">Characters List</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};