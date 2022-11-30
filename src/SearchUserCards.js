import axios from 'axios';
import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import './SelectUserCards.css';
import ip from './ipaddress';
import { useNavigate } from 'react-router-dom';

const SearchUserCards = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);
  const getUsers = (e) => {
    axios
      .get(`http://${ip}:8000/users`, { params: { UserName: e.target.value } })
      .then((response) => {
        console.log('user is', response);
        setSearchResults(response.data.msg);
      });
  };

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="container-fluid" style={{ marginTop: '10rem' }}>
        <div class="w-50 mx-auto">
          Search user : <input type="input" onChange={getUsers} />
        </div>
        <ul class="w-50 mx-auto">
          {searchResults &&
            searchResults.map((user) => {
              return (
                <li
                  class="list-group-item border border-2 border-dark p-2 m-2
               rounded "
                  onClick={() => navigate(`/user/${user.UserId}`)}
                >
                  {user?.FirstName}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SearchUserCards;
