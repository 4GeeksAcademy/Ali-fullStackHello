import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const StarshipDetails = () => {
    const { store, actions } = useContext(Context);
    const starship = store.starship;
    useEffect(() => {
        return () => actions.setStarship({})
    }, [])

    return (
        <div className="container">
            <div className="card contact-card my-2">
                <div className="card-body">
                    <img
                        className=""
                        src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
                    />
                        <div>
                            <h5 className="card-name">{starship.name}</h5>
                            <p>
                                Model: {starship.properties?.model}<br />
                                Cargo capacity: {starship.properties?.cargo_capacity}<br />
                                Cost: {starship.properties?.cost_in_credits}<br />
                                Passengers: {starship.properties?.passengers}<br />
                            </p>
                        </div>
                        <div>
                            <Link to="/Starships">
                                <button type="button" className="btn btn-primary">Starships List</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

    );
};