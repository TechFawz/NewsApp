import { faLess } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import "./card.css";
import logo from "./Image/logo.png";

function Card(item) {

    const data = item.data;
    const [containtDisplay, SetContaintDisplay] = useState(false);


    return (
        <div className="Card">
            <img src={data.urlToImage} className="CardImage" />

            <div className="CardDetails">
                <div className="CardHeading">{data.title}</div>
                <div className="CardSubTitle">{data.description}</div>

                <p className="CardContaint"  style={{display: containtDisplay ? "block" : "none"}}>{data.content}</p>

                <div className="CardOption">
                    <div className="lastupdate">
                        <div>{data.source.name}</div>
                        <div>{new Date(data.publishedAt).toDateString()}</div>
                        <div className="LastUpdate">Last Update - {msToTime(new Date()-new Date(data.publishedAt))}</div>


                    </div>
                    <div className="CardLink">
                        <div className="SmallButton" onClick={()=>SetContaintDisplay(!containtDisplay)}>{containtDisplay ? "Less" : "More"}</div>
                        <a className="SmallButton"  href={data.url}>Link</a>
                    </div>
                </div>
            </div>

        </div>
    )

}


function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(hours==0)
    {
        return(<div>{minutes/1} min</div>)
    }
    else if(hours<24)
    {
        return(<div>{hours/1} hrs</div>)

    }
    else
    {
        return(<div>{hours/24} days</div>)
    }
  
  }
export default Card;