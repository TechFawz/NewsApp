import { faLess } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import './card.css';
import logo from './Image/logo.png';
import { Rating } from 'react-simple-star-rating';

function Card(item) {
  const data = item.data;
  const [containtDisplay, SetContaintDisplay] = useState(false);
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    item.saveRating(rate, data);
    // other logic
  };
  const handleWatchLater = () => {
    item.saveWatchLater(data);
  };
  return (
    <div className="Card">
      <img src={data.urlToImage} className="CardImage" />

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
              Last Update - {msToTime(new Date() - new Date(data.publishedAt))}
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
        <div className="CardOption">
          <Rating onClick={handleRating} size={20} />
          <div className="CardLink" style={{ cursor: 'pointer' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleWatchLater}
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function msToTime(duration) {
  var seconds = Math.ceil(duration / 1000);
  var minutes = Math.floor(duration / (1000 * 60));
  var hours = Math.floor(duration / (1000 * 60 * 60));
  var days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (hours == 0) {
    return <div>{minutes} min</div>;
  } else if (days == 0) {
    return <div>{hours} hrs</div>;
  } else {
    return <div>{days} days</div>;
  }
}
export default Card;
