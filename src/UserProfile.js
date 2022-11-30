import React, { useEffect } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import profile_default from './Image/profile_default.png';
import './UserProfile.css';
import { useNavigate, useParams } from 'react-router-dom';
import ip from './ipaddress';
import axios from 'axios';
import { useState } from 'react';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const [noOfFollowers, setFollowers] = useState(0);
  const [noOfFriends, setNoOfFriends] = useState(0);
  const [blocked, setBlocked] = useState('');
  const [currentUserData, setCurrentUserData] = useState({
    FirstName: 'Username',
  });
  const userId = localStorage.getItem('UserId');

  const followPost = () => {
    if (alreadyFollowed) return;
    if (!id) {
      window.alert('No id present to follow!');
    }
    let payload = {
      followerId: localStorage.getItem('UserId'),
      UserId: id,
    };
    axios
      .post(`http://${ip}:8000/follow`, payload)
      .then((response) => {
        if (response.status === 200) {
          window.alert('Successfully followed.');
          getFollowers();
        }
      })
      .catch((err) => window.alert(err));
  };

  const connect = () => {
    if (alreadyConnect) return;
    if (!id) {
      window.alert('No id present to follow!');
    }
    let payload = {
      connectionId: localStorage.getItem('UserId'),
      UserId: id,
    };
    axios
      .post(`http://${ip}:8000/connect`, payload)
      .then((response) => {
        if (response.status === 200) {
          window.alert('Successfully connect.');
          getFriends();
        }
      })
      .catch((err) => window.alert(err));
  };

  const getFollowers = () => {
    axios
      .get(`http://${ip}:8000/followers`, { params: { UserId: id } })
      .then((response) => {
        if (response.status === 200 && response.data.msg) {
          const data = response.data.msg.filter((el) => el !== null);
          setFollowers([...data]);
        }
      })
      .catch((err) => window.alert(err));
  };
  const getFriends = () => {
    axios
      .get(`http://${ip}:8000/is-friend`, {
        params: { UserId: id, connectionId: userId },
      })
      .then((response) => {
        console.log('is friend', response);
        if (response.status === 200 && response.data.msg) {
          setAlreadyConnect(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  const checkIsFollower = () => {
    axios
      .get(`http://${ip}:8000/is-follower`, {
        params: { followerId: localStorage.getItem('UserId'), UserId: id },
      })
      .then((response) => {
        if (response.status === 200 && response.data.msg === 1) {
          setAlreadyFollowed(true);
        }
      })
      .catch((err) => window.alert(err));
  };
  const checkRequestSent = () => {
    axios
      .get(`http://${ip}:8000/is-pending`, {
        params: { connectionId: localStorage.getItem('UserId'), UserId: id },
      })
      .then((response) => {
        if (response.status === 200 && response.data.msg === 1) {
          setAlreadyConnect(true);
        }
      })
      .catch((err) => window.alert(err));
  };
  const getUserDetails = () => {
    axios
      .get(`http://${ip}:8000/userDetails`, {
        params: { UserId: id },
      })
      .then((response) => {
        if (response && response.data) {
          setCurrentUserData(response.data?.msg);
        }
      })
      .catch((err) => window.alert(err));
  };

  const blockUser = () => {
    axios
      .post(`http://${ip}:8000/block`, {
        connectionId: localStorage.getItem('UserId'),
        UserId: id,
      })
      .then((response) => {
        if (
          response &&
          (response.status === 200) & (response.data.msg === 'blocked')
        ) {
          setBlocked(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    if (id) {
      checkIsFollower();
      getUserDetails();
      getFollowers();
      getFriends();
      checkRequestSent();
    }
  }, [id]);

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="profileContainer" id="userProfileCard">
        <div className="card text-center user-profile-card">
          <img
            src={profile_default}
            className="card-img-top w-50 mx-auto mt-3 img-thumbnail card-user-image"
            alt="User Profile"
          />
          <div className="card-body">
            <h5 className="card-title text-light">
              {currentUserData.FirstName}
            </h5>
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-around m-2">
              {alreadyFollowed ? (
                ''
              ) : (
                <button
                  type="button"
                  className="btn btn-light w-25"
                  onClick={followPost}
                >
                  {alreadyFollowed ? 'Following' : 'Follow'}
                </button>
              )}
              {alreadyConnect ? (
                ''
              ) : (
                <button
                  type="button"
                  className="btn btn-light w-25"
                  onClick={connect}
                >
                  Connect
                </button>
              )}
            </div>
            <div className=" d-flex justify-content-around m-2">
              <button
                type="button"
                className="btn btn-light w-25"
                onClick={() => navigate(`/followers/${id}`)}
              >
                Followers &nbsp;
                {noOfFollowers.length}
              </button>
              <button type="button" className="btn btn-light w-25">
                Friends &nbsp;{noOfFriends}
              </button>
              <button
                onClick={() => blockUser()}
                type="button"
                className="btn btn-light w-25"
              >
                Block
              </button>
            </div>

            {noOfFollowers.length ? (
              <div className="d-flex justify-content-around m-2">
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/ratings/${id}`)}
                >
                  {`${currentUserData.FirstName} rated news`}
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/watch-later/${id}`)}
                >
                  {`${currentUserData.FirstName} watch later news`}
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/friends/${id}`)}
                >
                  {`${currentUserData.FirstName} friends`}
                  friends
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
