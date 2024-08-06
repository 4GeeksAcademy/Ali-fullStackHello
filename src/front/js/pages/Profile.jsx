import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Home } from "./Home.jsx";


export const Profile = () => {
  const { store } = useContext(Context)

  return (
    !store.currentUser ? 
      <Home/>
    :
      <div className="container">
        <div className="card">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{store.currentUser.email}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
  )
}