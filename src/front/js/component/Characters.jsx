import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Characters = () => {
    const { store, actions } = useContext(Context);

   const handleOnClick = (url) =>{
    actions.getCharacter(url);
   };


    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            {store.characters.map((characters) => (
                <ul key={characters.uid}  className="list-group">
                    <li className="d-flex justify-content-between">
                        <div className="card contact-card my-2">
                            <div className="card-body d-flex">
                                <img
                                    className="me-4"
                                    src={`https://starwars-visualguide.com/assets/img/characters/${characters.uid}.jpg`}
                                    alt=""
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <div className="container">
                                    <div>
                                        <h5 className="card-name">{characters.name}</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <Link to="/CharacterDetail">
                                            <button type="button" onClick={() => handleOnClick(characters.url)}  className="btn btn-primary">See More</button>
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



/* 
<div className="container">
<div className="card">
    <img src="https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080"
        className="card-img-top" alt="..." />
    <div className="card-body">
        <h5 className="card-title">Han Solo</h5>
        <p className="card-text">Gender: Male.</p>
        <p className="card-text">Eye-Color: Blue.</p>
        <p className="card-text">Hair-Color: Brown.</p>
        <div>
            <Link to="/ConatctCards">
                <button type="button" className="btn btn-primary">See More</button>
            </Link>
        </div>
    </div>
</div>
</div> */