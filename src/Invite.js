import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import './Invite.css';
import axios from 'axios';
import ip from './ipaddress';

const Invite = () => {
  const [email, setEmail] = useState('');

  const sendInvite = (e) => {
    e.preventDefault();
    axios
      .post(`http://${ip}:8000/invite`, { email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="InviteContainer">
        <div className="formContainer">
          <div className="formDiv">
            <h3>
              <label htmlFor="">Enter e-mail for invitation</label>
            </h3>
            <form onSubmit={sendInvite}>
              <input
                className="emailInput"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="abc@xyz.com"
              />
              <div className="btnDiv">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
