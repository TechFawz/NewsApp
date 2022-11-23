import React, { useEffect, useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import axios from 'axios';
import ip from './ipaddress';
import Multiselect from 'multiselect-react-dropdown';
export default function SelectCategories() {
  return (
    <div>
      <Navbar1 />news
      <Navbar2 />
      <div className="mt-5" style={{ marginTop: '6rem' }}>
        <Multiselect
          options={[
            { name: 'ram', id: '1' },
            { name: 'taksh', id: 2 },
          ]} // Options to display in the dropdown
          selectedValues={[]} // Preselected value to persist in dropdown
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
    </div>
  );
}
