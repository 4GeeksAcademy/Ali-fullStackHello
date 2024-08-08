import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleRemoveFavorite = (element) => { actions.removeFavorite(element)}; 
	const handleLogout = () => {
        actions.logout();
    };

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">  
				<img
					className="logo"
					alt="Logo"
					width="auto"
					height="24"
					src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
				/>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/characters">Characters</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/planets">Planets</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/starships">Starships</Link>
						</li>
						<Link to="/agenda-contact">
							<button className="btn btn-warning me-2">Agenda Contact</button>
						</Link>
					</ul>
					<ul className="navbar-nav mb-2 mb-lg-0">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Favorites
							</a>
							<ul className="dropdown-menu dropdown-menu-end bg-warning">
								{store.favorites.length === 0 ? (
									<li className="dropdown-item">No Favorites</li>
								) : (
									store.favorites.map(element => (
										<li key={element.uid} className="dropdown-item d-flex justify-content-between align-items-center">
											{element.name}
											<i className="fas fa-trash-alt"
												onClick={() => handleRemoveFavorite(element)}></i>
										</li>
									))
								)}
							</ul>
						</li>
					</ul>
					<div className="ml-auto">
					{store.isLoged ? 
						<>
							<Link to="/">
							<button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>
							</Link>
						</>
					: 
						<>
							<Link to="/login">
								<button className="btn btn-primary ms-2">Login</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-success ms-2">Signup</button>
							</Link>
						</>
					}
				</div>
				</div>
			</div>
		</nav>
	);
};
