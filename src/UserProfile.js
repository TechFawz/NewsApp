import React, { useEffect } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import profile_default from './Image/profile_default.png';
import './UserProfile.css';
import { useParams } from 'react-router-dom';
import ip from './ipaddress';
import axios from 'axios';
import { useState } from 'react';

export default function UserProfile() {
  const { id } = useParams();
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [noOfFollowers, setNoOfFollowers] = useState(0);

  const followPost = () => {
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

  const getFollowers = () => {
    axios
      .get(`http:${ip}:8000/followers`, { params: { UserId: id } })
      .then((response) => {
        if (response.status === 200 && response.data.msg) {
          setNoOfFollowers(response.data.msg);
        }
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http:${ip}:8000/is-follower`, {
          params: { followerId: localStorage.getItem('UserId'), UserId: id },
        })
        .then((response) => {
          if (response.status === 200 && response.data.msg === 1) {
            setAlreadyFollowed(true);
          }
        })
        .catch((err) => window.alert(err));

      getFollowers();
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
            <h5 className="card-title text-light">User Name</h5>
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-around m-2">
              <button
                type="button"
                class="btn btn-light w-25"
                onClick={followPost}
              >
                Follow
              </button>
              <button type="button" class="btn btn-light w-25">
                Connect
              </button>
            </div>
            <div className=" d-flex justify-content-around m-2">
              <button type="button" class="btn btn-light w-25">
                Followers
              </button>
              <button type="button" class="btn btn-light w-25">
                Friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
