import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
/* imput custom component */
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Error404 } from "./component/Error404.jsx";
import { ContactCards } from "./component/ContactCards.jsx";
/* import custom pages */
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { FormContact } from "./component/FormContact.jsx";
import { FormEditContact } from "./component/FormEditContact.jsx";
import { Characters } from "./component/Characters.jsx";
import { CharacterDetails } from "./component/CharacterDetails.jsx";
import { Planets } from "./component/Planets.jsx";
import { PlanetDetails } from "./component/PlanetDetails.jsx";
import { Starships } from "./component/Starships.jsx";
import { StarshipDetails } from "./component/StarshipDetails.jsx";


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
                        {/* <Route element={<Home />} path="/" /> */}
                        {/* <Route element={<Error404/>} path="*"/> */}
                        <Route element={<ContactCards />} path="/ContactCards" />
                        <Route element={<FormContact />} path="/FormContact" />
                        <Route element={<FormEditContact />} path="/FormEditContact" />
                        <Route element={<Characters />} path="/Characters" />
                        <Route element={<CharacterDetails />} path="/CharacterDetails" />
                        <Route element={<Planets />} path="/Planets" />
                        <Route element={<PlanetDetails />} path="/PlanetDetails" />
                        <Route element={<Starships />} path="/Starships" />
                        <Route element={<StarshipDetails />} path="/StarshipDetails" />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
