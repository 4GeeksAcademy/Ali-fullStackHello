import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
		<div className="container-fluid">
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<Link to="/demo" className="navbar-brand">
					<img
						className="d-inline-block align-text-top"
						alt="Logo"
						width="auto"
						height="24"
						src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
					/>
				</Link>

				<div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link" aria-current="page">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/Characters" className="nav-link">
								Characters
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/link" className="nav-link">
								Planets
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/ContactCards" className="nav-link">
								Contacts Agenda
							</Link>
						</li>
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
								Dropdown
							</a>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<a className="dropdown-item" href="#">
										Action
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Another action
									</a>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Something else here
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
);
};