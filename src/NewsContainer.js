import React, { useEffect, useState } from 'react';
import './NewContainer.css';
import Card from './card';
import logo from './Image/logo.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ip from './ipaddress';

function NewContainer() {
  const [data, SetData] = useState([]);

  const location = useLocation();
  const currentRoute = location.pathname;
  const id = currentRoute.split('/')[2];

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${id}&apiKey=4cc62fc209b046e6bdf98fc4fcf9abbc`
      )
      .then(function (respone) {
        let array = respone.data.articles.sort(function (a, b) {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });

        SetData(array);
      });
  }, [id]);

  return (
    <div id="NewContainter" className="NewContainter">
      {Insert(data)}
    </div>
  );
}

function Insert(data) {
  if (data.length == 0) {
    return (
      <div className="reload">
        Please reload WebSite
        <FontAwesomeIcon
          onClick={() => {
            window.location.reload();
          }}
          icon={faRefresh}
          style={{ padding: '10px', cursor: 'pointer' }}
        />
      </div>
    );
  }
  const width = window.innerWidth;
  let size = (width - (width % 400)) / 400;
  if (size === 0) {
    size = 1;
  }
  const dataArray = DivideArray(data, size);
  return dataArray.map((item, index) => {
    return <CardContainer data={item} key={index} />;
  });
}

function DivideArray(array, size) {
  const resultArray = [];
  for (let i = 0; i < array.length; i += size) {
    resultArray.push(array.slice(i, i + size));
  }

  return resultArray;
}

function CardContainer(item) {
  const data = item.data;
  const [starData, setStarData] = useState({
    starCount: 0,
    starData: null,
  });
  const userId = localStorage.getItem('UserId');
  //   {
  //     "UserId":"1",
  //     "author":"SJ",
  //     "content":"S",
  //     "description":"SJ5",
  //     "publishedAt":"22Nov22",
  //     "title":"hello",
  //     "url":"13raeg",
  //     "urlToImage":"test.com",
  //     "ratings":0,
  //     "watchList": 1
  // }
  const saveRating = (count, data) => {
    setStarData({
      ...starData,
      starCount: count,
      starData: data,
    });
    const {
      author,
      content,
      description,
      publishedAt,
      title,
      url,
      urlToImage,
    } = data;
    axios
      .post(`http://${ip}:8000/rate`, {
        UserId: userId,
        author,
        content,
        description,
        publishedAt,
        title,
        url,
        urlToImage,
        ratings: count,
        watchList: 0,
      })
      .then((response) => {
        window.alert('rating save successfully!');
        console.log('response after ratings is', response);
      })
      .catch((error) => {
        alert('error while save rating');
        console.log('error while rating', error);
      });
  };
  const saveWatchLater = (data) => {
    axios
      .post(`http://${ip}:8000/watch`, {
        ...data,
        UserId: userId,
        ratings: 0,
        watchList: 1,
      })
      .then((response) => {
        window.alert('watch later save successfully!');
        console.log('response after watch is', response);
      })
      .catch((error) => {
        alert('error while saving watch later');
        console.log('error while watchlater', error);
      });
  };
  return (
    <div className="CardContainer">
      {data.map((item, index) => {
        return (
          <Card
            key={index}
            data={item}
            saveRating={saveRating}
            saveWatchLater={saveWatchLater}
          />
        );
      })}
    </div>
  );
}

export default NewContainer;
