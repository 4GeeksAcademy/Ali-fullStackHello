import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="container">
			<nav className="navbar navbar-light bg-light">
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-success">Add New Contact</button>
					</Link>
				</div>
			</nav>
		</div>
	);
};
