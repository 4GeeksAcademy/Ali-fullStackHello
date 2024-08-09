import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { Home } from "./Home.jsx";


export const Profile = () => {
  const { store } = useContext(Context)

  return (
    !store.currentUser ?
      <Home />
      :
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card contact-card my-2">
              <div className="card-body">
                <img
                  className="card-img-top"
                  src={`https://i0.wp.com/mir-s3-cdn-cf.behance.net/project_modules/1400/3aba9f29238821.5681474de00fd.png?ssl=1`}
                  alt="Profile"
                />
                <div>
                  <h5 className="card-title">{store.currentUser.email}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                    <Link to="/">
                        <button type="button" className="btn btn-primary">Edit Profile</button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};