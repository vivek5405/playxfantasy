import React from "react";
import style from "./style.module.css";
import { Matches as MatchesSvg } from "../../assets/SvgCodes/Matches"
import SvgIcon from "../SvgIcon";
import { useNavigate } from "react-router-dom";
import {getFormatedTimeFromSeconds} from "../../utils/getFromatedDate";
import CountdownTimer from "./Counter";


    const shimmerItems = Array.from({ length: 3 }, (_, index) => (
      <div className="px-[15px]" key={index}>
        <div  className={`animate-pulse bg-white shadow rounded-md h-[160px] w-full mt-[20px] px-[15px] py-[10px]`}>
        <div className="flex place-items-center justify-between">
          <p className="rounded-[20px] bg-slate-200 h-[20px] w-[60px]"></p>
          <p className="rounded-[20px] bg-slate-200 h-[20px] w-[60px]"></p>
        </div>
        <div className="mt-[15px] flex place-items-center justify-between">
          <p className="rounded-[80px] bg-slate-200 h-[51px] w-[51px]"></p>
          <p className="rounded-[2px] bg-slate-200 h-[30px] w-[120px] translate-y-[10px]"></p>
          <p className="rounded-[80px] bg-slate-200 h-[51px] w-[51px]"></p>
        </div>
        <div className="flex place-items-center justify-between mt-[15px]">
          <p className="rounded-[10px] bg-slate-200 h-[20px] w-[80px]"></p>
          <p className="rounded-[20px] bg-slate-200 h-[30px] w-[130px]"></p>
          <p className="rounded-[10px] bg-slate-200 h-[20px] w-[80px]"></p>
        </div>
      </div>
      </div>
    ));


export default function Matches({ data, game }) {
  const navigate = useNavigate();
  function getRandomColor(colors) {
    const keys = Object.keys(colors);
    const randomIndex1 = Math.floor(Math.random() * keys.length);
    let randomIndex2;

    do {
        randomIndex2 = Math.floor(Math.random() * keys.length);
    } while (randomIndex2 === randomIndex1);

    const color1 = colors[keys[randomIndex1]];
    const color2 = colors[keys[randomIndex2]];

    return [color1, color2];
}
  if (!data || data.length === 0) {
    return (
      <>
        <div className={style.feature_main_matches} >
          <p className={style.title}> <span>Matches</span>
          </p>
          {shimmerItems}
        </div>
      </>
    );
  }
  return (
    <>
      <div className={style.feature_main_matches}>
        <p className={style.title}> Matches <img src='/png/matches/a32c3f08835806e7b545816173440bdf.png' width={24} height={24} alt="title_icon" style={{objectFit : 'contain', marginLeft : 6}}/></p>
        <div className={` ${style.matches} mt-[10px]`}>
          {data?.map((item, index) => (
            <div className={`${style.card} shadow`} key={index} >
              <div onClick={()=> navigate(`/contest`, { replace: false,  state: { game, mid : item?.match_id || item?.mid , team1_name : item?.teama?.short_name || item?.teams?.home?.abbr || item?.teams?.home?.shortname, team2_name : item?.teamb?.short_name || item?.teams?.away?.abbr || item?.teams?.away?.shortname, time : item?.timestamp_start || item?.timestampstart }  })}>
                <div className={style.top_section}>
                  <p className={style.team1_shortname}>{item?.teama?.short_name || item?.teams?.home?.abbr || item?.teams?.home?.shortname}</p>
                  <div className="relative">
                    <SvgIcon
                      className={style.series_name_bg}
                      iconName={MatchesSvg.icon5}
                    />
                    <div className={style.overlay1}>
                      <img
                        src="/png/6a96a8e2bcbb9ab3ae5c1127acbb9f95.png"
                        alt=""
                        width={10}
                        height={10}
                      />
                      <p className={style.series_name}>{item?.competition?.abbr || item?.competition?.cname}</p>
                    </div>
                  </div>

                  <p className={style.team2_shortname}>{item?.teamb?.short_name ||  item?.teams?.away?.abbr || item?.teams?.away?.shortname}</p>
                </div>
                <div className={style.middle_section}>
                  <div className={style.flag_wrapper1} >
                    <img
                      src={item?.teama?.logo_url || item?.teams?.home?.logo}
                      alt="teama_logo"
                    />
                  </div>

                  <div className={style.wrapper}>
                    <p className={style.vs}>VS</p>
                  </div>

                  <div className={style.flag_wrapper2} >
                    <img
                      src={item?.teamb?.logo_url || item?.teams?.away?.logo}
                      alt="teamb_logo"
                    />
                  </div>
                </div>
                <div className={style.bottom_wrapper}>
                  <div className="content mt-[10px] pt-[6px]">
                  <div className={style.content_area}>
                    <p className={style.team1_name}>{item?.teama?.name || item?.teams?.home?.tname}</p>
                    <div className={style.date_time_wrapper}>
                      <p className={style.time}>
                        <SvgIcon
                          className={style.time_icon}
                          iconName={MatchesSvg.icon3}
                        />
                        &nbsp; <CountdownTimer timestamp={item?.timestamp_start || item?.timestampstart}/>
                      </p>

                      <p className={style.date}>
                        <SvgIcon
                          className={style.date_icon}
                          iconName={MatchesSvg.icon4}
                        />
                        &nbsp; {getFormatedTimeFromSeconds(item?.timestamp_start || item?.timestampstart, "hh: mm A")} ({getFormatedTimeFromSeconds(item?.timestamp_start || item?.timestampstart, "DD MMM")})
                      </p>
                    </div>
                    <p className={style.team2_name}>{item?.teamb?.name || item?.teams?.away?.tname}</p>
                  </div>
                  <div className={style.hr}>&nbsp;</div>
                  <div className={style.last_data}>
                    <p className={style.mega_contest}>MEGA 5 Crore</p>
                    <SvgIcon
                      className={style.notification_icon}
                      iconName={MatchesSvg.icon7}
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}