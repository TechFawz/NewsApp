import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import axios from 'axios';
import ip from './ipaddress';
export default function WatchLater() {
  return (
    <div>
      <Navbar1 />
      <Navbar2 />
      WatchLater
    </div>
  );
}
