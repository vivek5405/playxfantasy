import React from "react";
import style from "./style1.module.css";
import Contest_Card from "./Contest_Card";
import { useNavigate } from "react-router-dom";


const Contest1 = ({ data, game}) => {
  const navigate = useNavigate();
  return (
    <div className="">
      {data?.items?.map((item, index) =>
        item?.items?.length > 0 ? (
          <div className={style.contest1_wrapper} key={index}>
            <div className="flex">
              <img
                src={item?.image_url}
                alt="image"
                className={style.contest1_wrapper_image}
              />
              <p className={style.contest1_wrapper_title}>{item?.title}</p>
            </div>

            {item?.items?.map((item2, index) => (
              <Contest_Card data={item2} key={index} onClick={()=> navigate(`/contest-details`, { replace: false,  state: { game, cid : item2?._id, mid : data?.matchDetails?.match_id || data?.matchDetails?.mid , team1_name : data?.matchDetails?.teama?.short_name || data?.matchDetails?.teams?.home?.abbr || data?.matchDetails?.teams?.home?.shortname, team2_name : data?.matchDetails?.teamb?.short_name || data?.matchDetails?.teams?.away?.abbr || data?.matchDetails?.teams?.away?.shortname, time : data?.matchDetails?.timestamp_start || data?.matchDetails?.timestampstart }  })}
              />
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Contest1;
