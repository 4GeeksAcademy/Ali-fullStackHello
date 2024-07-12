import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const PlanetDetails = () => {
    const { store, actions } = useContext(Context);
    const planet = store.planet;
    useEffect(() => {
        return () => actions.setPlanet({})
    }, [])

    return (
        <div className="container">
            <div className="card contact-card my-2">
                <div className="card-body">
                    <img
                        className=""
                        src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                    />
                        <div>
                            <h5 className="card-name">{planet.name}</h5>
                            <p>
                                Diameter: {planet.properties?.diameter}<br />
                                Gravity: {planet.properties?.gravity}<br />
                                Population: {planet.properties?.population}<br />
                                Terrain: {planet.properties?.terrain}<br />
                                Created: {planet.properties?.created}
                            </p>
                        </div>
                        <div>
                            <Link to="/Planets">
                                <button type="button" className="btn btn-primary">Planet List</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
    );
};