import React, { useEffect, useRef, useState, UseState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";



function LoginPage() {

    const navigate = useNavigate();
    const [WrongPassword, SetWrongPassword] = useState(false);
    const [Seen, SetSeen] = useState(false);
    const IdRef = useRef();
    const PasswordRef = useRef();



    const StyleForWrongPassword = () => {
        if (WrongPassword) {
            return { display: "block", }
        }
        else {
            return { display: "none", }
        }
    }

    useEffect(() => {
        if (Seen) {
            document.getElementById("LoginDivShowPasswordIcon").style.display = "none";
            document.getElementById("LoginDivClosePasswordIcon").style.display = "block";
            document.getElementById("LoginDivInputPassword").type = "text";

        }

        else {
            document.getElementById("LoginDivShowPasswordIcon").style.display = "block";
            document.getElementById("LoginDivClosePasswordIcon").style.display = "none";
            document.getElementById("LoginDivInputPassword").type = "password";
        }
    })

    return (
        <div className="ContaintContainer">

            <div className="LoginHeading" >Login <FontAwesomeIcon icon={faUser} /> </div>
            <div className="LoginContainer">
                <div className="input-group flex-nowrap LoginDivInsideDiv">
                    <span className="input-group-text" id="addon-wrapping">
                        @
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        ref={IdRef}
                    />
                </div>
                <div className="input-group flex-nowrap LoginDivInsideDiv">
                    <span className="input-group-text" id="addon-wrapping">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        id="LoginDivInputPassword"
                        ref={PasswordRef}

                    />
                    <span
                        className="input-group-text"
                        id="LoginDivShowPassword"
                        onClick={() => { SetSeen(!Seen) }}
                    >
                        <FontAwesomeIcon icon={faEyeSlash} id="LoginDivShowPasswordIcon" />
                        <FontAwesomeIcon icon={faEye} id="LoginDivClosePasswordIcon" />
                    </span>
                </div>

                <p className="WrongPasword" style={StyleForWrongPassword()}>Your Username or Password is Wrong. Please try again</p>

                <div>
                    <div className='CreateAccountButton' onClick={(e) => { CheckLogin(IdRef.current.value, PasswordRef.current.value,SetWrongPassword,navigate )}}>Login</div>
                    <div className='CreateAccountButton'> <FontAwesomeIcon icon={faGoogle} className="GoogleIcon" /> Login With Google</div>
                    <div className='CreateAccountButton' onClick={()=>{navigate("/sign_up")}}>Create Account</div>

                </div>


            </div>

        </div>
    )

}



function CheckLogin(id, password ,SetWrongPassword,navigate) {
    

    const login_details = {
        id: id,
        password: password
    }

    axios.get('http://localhost:8000/check_login', { params: login_details }).then(res => {
        if (res.data.status == 200) {
            navigate(`/after_login`);
        }
        else {
            SetWrongPassword(true);
        }

    });



}
export default LoginPage