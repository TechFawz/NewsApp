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
  const [userData, setUserData] = useState(null);
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
          window.alert('Successfully followed.');
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
          setFollowers(data);
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
          setNoOfFriends(response.data.msg);
        }
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    if (id) {
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
      // axios
      //   .get(`http://${ip}:8000/is-connect`, {
      //     params: { followerId: localStorage.getItem('UserId'), UserId: id },
      //   })
      //   .then((response) => {
      //     if (response.status === 200 && response.data.msg === 1) {
      //       setAlreadyConnect(true);
      //     }
      //   })
      //   .catch((err) => window.alert(err));

      axios
        .get(`http://${ip}:8000/userDetails`, {
          params: { UserId: id },
        })
        .then((response) => {
          console.log('@@@@', response);
          if (response.data.msg) {
            setUserData(response.data.msg);
          }
        })
        .catch((err) => window.alert(err));

      getFollowers();
      getFriends();
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
              {userData ? userData?.FirstName : ''}
            </h5>
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-around m-2">
              <button
                type="button"
                className="btn btn-light w-25"
                onClick={followPost}
              >
                {alreadyFollowed ? 'Following' : 'Follow'}
              </button>
              <button
                type="button"
                className="btn btn-light w-25"
                onClick={connect}
              >
                Connect
              </button>
            </div>
            <div className=" d-flex justify-content-around m-2">
              <button
                type="button"
                className="btn btn-light w-25"
                onClick={() => navigate(`/followers/${id}`)}
              >
                Followers &nbsp;{noOfFollowers.length}
              </button>
              <button type="button" className="btn btn-light w-25">
                Friends &nbsp;{noOfFriends}
              </button>
            </div>

            {noOfFollowers.length ? (
              <div className="d-flex justify-content-around m-2">
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/ratings/${id}`)}
                >
                  {userData ? userData?.FirstName : ''}'s rated news
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/watch-later/${id}`)}
                >
                  {userData ? userData?.FirstName : ''}'s watch later news
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/friends/${id}`)}
                >
                  {userData ? userData?.FirstName : ''}'s friends
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
