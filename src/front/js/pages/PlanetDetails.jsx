import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const PlanetDetails = () => {
    const { store, actions } = useContext(Context);
    const planet = store.planet;
    useEffect(() => {
        return () => actions.setPlanet({})
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
                            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                            onError={handleImgError}
                            alt={planet.name}
                        />
                        <div>
                            <h5 className="card-title">{planet.name}</h5>
                            <p className="card-text">
                                Gravity: {planet.properties?.gravity}<br />
                                Diameter: {planet.properties?.diameter}<br />
                                Population: {planet.properties?.population}<br />
                                Terrain: {planet.properties?.terrain}<br />
                                Created: {planet.properties?.created}
                            </p>
                        </div>
                        <div>
                            <Link to="/planets">
                                <button type="button" className="btn btn-primary">Planet List</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};