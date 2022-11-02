import React, { useRef } from 'react';
import "./navbar1.css";
import logo from "./Image/logo.png";
import { useNavigate } from 'react-router-dom';
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Navbar1() {

    const value = useRef();
    const navigate = useNavigate();

    const handleKeyDown = (e)=>{
        if(e.key=="Enter")
        {
            navigate(`/news/${value.current.value}`);
        }
    }
    return (
        <div className='navbar1'>
            <img src={logo} className="logo" />

            <div className='searchbar'>
                <input ref={value} type="text" className='searchinput' placeholder='Search for topics, location & sources' onKeyDown={handleKeyDown}  />
                <FontAwesomeIcon onClick={()=>{navigate(`/news/${value.current.value}`)}} className = "searchicon" icon={faSearch} />
            </div>

            <FontAwesomeIcon className='profile' icon={faUser} />

        </div>
    )

}



export default Navbar1;