import React from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import profile_default from './Image/profile_default.png';
import './UserProfile.css';
export default function UserProfile() {
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
              <button type="button" class="btn btn-light w-25">
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
