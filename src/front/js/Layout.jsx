import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
/* imput custom component */
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Error404 } from "./component/Error404.jsx";
import { ContactCards } from "./pages/ContactCards.jsx";
/* import custom pages */
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { FormContact } from "./pages/FormContact.jsx";
import { FormEditContact } from "./pages/FormEditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { Planets } from "./pages/Planets.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { Starships } from "./pages/Starships.jsx";
import { StarshipDetails } from "./pages/StarshipDetails.jsx";


//Create your first component
const Layout = () => {
    //The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Profile />} path="/profile" />
                        {/* <Route element={<Error404/>} path="*"/> */}
                        <Route element={<ContactCards />} path="/contact-cards" />
                        <Route element={<FormContact />} path="/form-contact" />
                        <Route element={<FormEditContact />} path="/form-edit-contact" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharacterDetails />} path="/character-details" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetDetails />} path="/planet-details" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<StarshipDetails />} path="/starship-details" />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
