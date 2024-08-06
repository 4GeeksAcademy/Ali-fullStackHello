import React, { useContext, useState } from "react";
import { Context } from '../store/appContext.js'
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const { actions } = useContext(Context);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleFirstnameChange = (event) => {setFirstname(event.target.value);};
  const handleLastnameChange = (event) => {setLastname(event.target.value);};
  const handleEmailChange = (event) => {setEmail(event.target.value);};
  const handlePasswordChange = (event) => {setPassword(event.target.value);};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { firstname, lastname, email, password };
    // fetch to /api/signup sending dataToSend
    const uri = process.env.BACKEND_URL + '/api/signup';
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(uri, options);
    if (!response.ok) {
      // tratar el error
      console.log('Error: ', response.status, response.statusText);
      return
    }
    const data = await response.json()
    console.log(data);
    // Save the token and user on the localStorage
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.results))
    // actions: si está logueado, datos del usuario, el mensaje
    actions.setIsLoged(true);
    actions.setCurrentUser(data.results);
    actions.setAlert({visible: true, back: 'info', text: data.message})
    navigate('/profile')
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">Create your Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="firstname" className="mb-1">First Name:</label>
                  <input type="text" className="form-control" id="firstname"
                    value={firstname} onChange={handleFirstnameChange} required/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="lastname" className="mb-1">Last Name:</label>
                  <input type="text" className="form-control" id="lastname"
                    value={lastname} onChange={handleLastnameChange} required/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">Email:</label>
                  <input type="email" className="form-control" id="email"
                    value={email} onChange={handleEmailChange} required/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">Password:</label>
                  <input type="password" className="form-control" id="password"
                    value={password} onChange={handlePasswordChange} required/>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};