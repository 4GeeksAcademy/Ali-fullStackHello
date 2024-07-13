import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const FormEditContact = () => {
    const { store, actions } = useContext(Context);
    const [ name, setName ] = useState(store.currentContact.name);
    const [ email, setEmail ] = useState(store.currentContact.email);
    const [ phone, setPhone ] = useState(store.currentContact.phone);
    const [ address, setAddress ] = useState(store.currentContact.address);

    useEffect(() => {
        setName(store.currentContact.name);
        setEmail(store.currentContact.email);
        setPhone(store.currentContact.phone);
        setAddress(store.currentContact.address);
    }, [store.currentContact]);
    
    const handleEditContact = async (event) => {
        event.preventDefault()
        const contact = {
            name: name,
            email: email,
            phone: phone,
            address: address,
        };   

        await actions.saveEditContact(contact, store.currentContact.id);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    };
    
    return (
        <div className="className container mt-3">
        <form onSubmit={handleEditContact}>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Full Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Full Name"
                onChange={(event) =>setName(event.target.value)} 
                value={name}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" id="inputEmail" placeholder="Enter Email"
                onChange={(event) =>setEmail(event.target.value)} 
                value={email}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input type="text" className="form-control" id="inputPhone" placeholder="Enter Phone"
                onChange={(event) =>setPhone(event.target.value)}
                value={phone}/>
            </div>
            <div className="form-group mt-2">
                <label htmlFor="exampleInputEmail1">Address</label>
                <input type="text" className="form-control" id="inputPhone" placeholder="Enter Adress"
                onChange={(event) =>setAddress(event.target.value)} 
                value={address}/>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-primary me-2">Save</button>
                <Link to="/conatct-cards">
                    <button type="button" className="btn btn-primary">Contact list</button>
                </Link>
            </div>
        </form>
        </div>

    )

}