import React, { useEffect, useState } from 'react';
import './navbar2.css';
import { NavLink } from 'react-router-dom';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { countries } from 'country-data';
import { Outlet, useNavigate } from 'react-router-dom';

const lookup = require('coordinate_to_country');

const Navbar2 = () => {
  const [country, SetCountry] = useState('Canada');
  const navigate = useNavigate();
  const systemGeneratedCategories = [
    'trending',
    'canada',
    'weather',
    'sports',
    'science',
    'technology',
    'politics',
    'education',
  ];
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
    }
  }

  const showPosition = (position) => {
    SetCountry(
      countries[lookup(position.coords.latitude, position.coords.longitude)]
        .name
    );
  };

  const positionError = (error) => {
    if (error.PERMISSION_DENIED) {
      window.alert('Error: permission denied');
    } else {
      window.alert('Error Please reload WebSite');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="navbar2">
      {systemGeneratedCategories.map((el) => {
        return (
          <NavLink
            to={`/news/${el}`}
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            {el}
          </NavLink>
        );
      })}
      <button
        onClick={() => {
          navigate('/select-categories');
        }}
      >
        Choose categories
      </button>
    </div>
  );
};

export default Navbar2;
