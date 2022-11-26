import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';

const PendingRequests = () => {
  const [pendingResults, setPendingResults] = useState([
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
      <div style={{ marginTop: '10rem' }}>
        <ul class="w-75 mx-auto">
          {pendingResults.map((user) => {
            return (
              <li
                class="list-group-item border border-2 border-dark p-2 m-2
               rounded d-flex justify-content-between "
              >
                <span>{user.name}</span>
                <div>
                  <button className="btn btn-primary mx-1">Accept</button>
                  <button className="btn btn-danger mx-1 ">Reject</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default PendingRequests;
