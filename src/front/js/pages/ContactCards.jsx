import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const ContactCards = () => {
    const { store, actions } = useContext(Context)
    const handleInputChange = (event) => {
        actions.setAgendaName(event.target.value)
    }
    const handleCreateAgenda = (event) => {
        event.preventDefault()
        actions.createAgenda()
    }
    const handleDeleteContact = (contact) => {
        actions.deleteContact(contact)
    }
    
    return (
        <div className="container">
            {/* Ternary if there is no agenda it will renderize a submit to create an agenda */}
            {!store.isAgenda ? (
                <div className="container mt-5">
                    <h3 className="text-success text-center">CREATE YOUR AGENDA</h3>
                    {/* {store.agendaExist ? <h6 className="text-danger text-center mt-4">AGENDAS'S NAME ALREADY EXIST</h6> : null} */}
                    <form onSubmit={handleCreateAgenda}>
                        <label htmlFor="exampleAgenda" className="form-label mt-5">Create Agenda</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleAgenda"
                            aria-describedby="userHelp"
                            placeholder="Type Agenda's Name"
                            value={store.slug}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="btn btn-primary mt-2 justify-content-center">Create Agenda</button>
                    </form>
                </div>
            ) : (
                <>
                    <ul className="list-group">
                        {store.contacts.map((contact, index) => (
                            <li key={index} className="d-flex">
                                <div className="card contact-card my-2">
                                    <div className="card d-flex">
                                        <img
                                            className="me-4"
                                            src="https://static.wikia.nocookie.net/breakingbad/images/3/3a/Alfombra-breaking-bad-mod3-large2.jpg/revision/latest?cb=20190622081645&path-prefix=es"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <div className="container">
                                            <div>
                                                <h5 className="card-name">{contact.name}</h5>
                                                <p className="card-text">
                                                    <i className="fas fa-map-marker-alt me-2"></i>{contact.address}<br />
                                                    <i className="fas fa-phone me-2"></i>{contact.phone}<br />
                                                    <i className="fas fa-envelope me-2"></i>{contact.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div>
                                                <Link to="/form-edit-contact">
                                                    <i className="fas fa-edit mx-3 text-dark btn btn-secondary" onClick={() => actions.editContact(contact)}></i>
                                                </Link>
                                            </div>
                                            <div>
                                                <i className="fas fa-trash-alt text-dark btn btn-secondary" onClick={() => handleDeleteContact(contact)}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="my-2">
                        <Link to="/form-contact">
                            <button className="btn btn-success justify-content-center">Add New Contact</button>
                        </Link>
                    </div>
                </>
            )
            }

        </div>
    );
}


