import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const AddFavorites = () => {
    const { actions } = useContext(Context);
    const [newFavorite, setNewFavorite] = useState("");
    const handleAddFavorite = () => {
        if (newFavorite.trim()) {
            actions.addFavoriteInput(newFavorite);
            setNewFavorite("");
        }
    };
    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card bg-dark text-white border-dark my-3">
                        <div className="card-body">
                            <h5 className="card-title">Add to Favorites</h5>
                            <p className="card-text">Enter an item name to add it to your favorites.</p>
                            <div className="mb-3">
                                <label htmlFor="favoriteInput" className="form-label">Favorite Item</label>
                                <input
                                    type="text"
                                    id="favoriteInput"
                                    className="form-control"
                                    value={newFavorite}
                                    onChange={(e) => setNewFavorite(e.target.value)}
                                    placeholder="Enter item name"
                                />
                            </div>
                            <button className="btn btn-success" onClick={handleAddFavorite}>Add to Favorites</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};