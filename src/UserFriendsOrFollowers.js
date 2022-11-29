import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ip from './ipaddress';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';

const UserFriendsOrFollowers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let pathname = location.pathname.includes('friends')
      ? 'friends'
      : 'followers';
    axios
      .get(`http://${ip}:8000/${pathname}`, { params: { UserId: id } })
      .then((response) => {
        if (response && response.data) {
          setFriends(response.data.msg.filter((data) => data !== null));
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  }, [id, location.pathname]);

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="container-fluid" style={{ marginTop: '10rem' }}>
        <ul className="w-75 mx-auto">
          {friends.length > 0
            ? friends.map((user, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item border border-2 border-dark p-2 m-2
               rounded  d-flex justify-content-between align-items-center"
                    onClick={() => navigate(`/user/${user.UserId}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span> {user.FirstName}</span>
                    <button className="btn btn-primary"> Connect</button>
                  </li>
                );
              })
            : `No ${location.pathname.split('/')[1]}  to show.`}
        </ul>
      </div>
    </>
  );
};

export default UserFriendsOrFollowers;
