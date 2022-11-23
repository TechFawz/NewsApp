import React, { useEffect, useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import axios from 'axios';
import ip from './ipaddress';
export default function Ratings() {
  const [ratings, setRatings] = useState([]);
  const userId = localStorage.getItem('UserId');
  useEffect(() => {
    const data = { UserId: userId };
    axios
      .get(`http://${ip}/8000/rate`, { params: data })
      .then((response) => {
        console.log('repsonse form ratingins is', response);
        setRatings(response);
      })
      .catch((error) => {
        console.log('error while fetching ratings', error);
      });
  }, []);
  return (
    <div>
      <Navbar1 />
      <Navbar2 />
      {/* {ratings.length > 0 &&
        ratings.map((data, index) => {
          return (
            <div className="Card" key={index}>
              <img src={data.urlToImage} className="CardImage" alt="" />

              <div className="CardDetails">
                <div className="CardHeading">{data.title}</div>
                <div className="CardSubTitle">{data.description}</div>

                <p
                  className="CardContaint"
                  style={{ display: containtDisplay ? 'block' : 'none' }}
                >
                  {data.content}
                </p>

                <div className="CardOption">
                  <div className="lastupdate">
                    <div>{data.source.name}</div>
                    <div>{new Date(data.publishedAt).toDateString()}</div>
                    <div className="LastUpdate">
                      Last Update -{' '}
                      {msToTime(new Date() - new Date(data.publishedAt))}
                    </div>
                  </div>
                  <div className="CardLink">
                    <div
                      className="SmallButton"
                      onClick={() => SetContaintDisplay(!containtDisplay)}
                    >
                      {containtDisplay ? 'Less' : 'More'}
                    </div>
                    <a className="SmallButton" href={data.url}>
                      Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}
    </div>
  );
}
