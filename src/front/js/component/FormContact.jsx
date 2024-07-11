import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const FormContact = () => {
    const { store, actions } = useContext(Context);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');

    const handleCreateContact = async (event) => {
        event.preventDefault()
        const newContact = {
            name,
            email,
            phone,
            address,
        };   
        await actions.createContact(newContact);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    };
    
    return (
        <div className="className container mt-3">
        <form onSubmit={handleCreateContact}>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Full Name</label>
                <input type="text" className="form-control" onChange={(event) =>setName(event.target.value)} id="inputName" placeholder="Enter Full Name"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" onChange={(event) =>setEmail(event.target.value)} id="inputEmail" placeholder="Enter Email"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input type="text" className="form-control" onChange={(event) =>setPhone(event.target.value)} id="inputPhone" placeholder="Enter Phone"/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Address</label>
                <input type="text" className="form-control" onChange={(event) =>setAddress(event.target.value)} id="inputPhone" placeholder="Enter Adress"/>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <Link to="/ContactCards">
                    <button type="button" className="btn btn-primary">Contact list</button>
                </Link>
            </div>
        </form>
        </div>

    )

}