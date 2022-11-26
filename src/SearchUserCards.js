import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import './SelectUserCards.css';

const SearchUserCards = () => {
  const [searchResults, setSearchResults] = useState([
    { name: 'User One' },
    { name: 'User Two' },
    { name: 'User Three' },
    { name: 'User Four' },
    { name: 'User Five' },
    { name: 'User Six' },
  ]);

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="container-fluid" style={{ marginTop: '10rem' }}>
        <ul class="w-75 mx-auto">
          {searchResults.map((user) => {
            return (
              <li
                class="list-group-item border border-2 border-dark p-2 m-2
               rounded "
              >
                {user.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchUserCards;
