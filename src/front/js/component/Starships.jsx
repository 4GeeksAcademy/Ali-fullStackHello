import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Starships = () => {
    const { store, actions } = useContext(Context);

   const handleOnClick = (url) =>{
    actions.getStarships(url);
   };


    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            {store.starships?.map((starships) => (
                <ul key={starships.uid}  className="list-group">
                    <li className="d-flex justify-content-between">
                        <div className="card contact-card my-2">
                            <div className="card-body d-flex">
                                <img
                                    className="me-4"
                                    src={`https://starwars-visualguide.com/assets/img/starships/${starships.uid}.jpg`}
                                    alt=""
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <div className="container">
                                    <div>
                                        <h5 className="card-name">{starships.name}</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <Link to="/StarshipDetails">
                                            <button type="button" onClick={() => handleOnClick(starships.url)}  className="btn btn-primary">See More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
        </div>


    );
};
