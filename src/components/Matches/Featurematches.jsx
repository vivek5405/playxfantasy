import React from "react";
import style from "./style.module.css";
import {Matches} from "../../assets/SvgCodes/Matches"
import SvgIcon from "../SvgIcon";
import { useNavigate } from "react-router-dom";
import {getFormatedTimeFromSeconds} from "../../utils/getFromatedDate"
import CountdownTimer from "./Counter";


// const shimmerItems = Array.from({ length: 2 }, (_, index) => (
//   <div
//     key={index}
//     className={`animate-pulse bg-white shadow rounded-md h-[150px] w-[280px] mt-[10px] px-[15px] py-[10px] m-[1px]`}
//   >
//     <div className="flex place-items-center justify-between">
//       <p className="rounded-[20px] bg-slate-200 h-[17px] w-[40px]">&nbsp;</p>

//       <p className="rounded-[20px] bg-slate-200 h-[17px] w-[40px]">&nbsp;</p>
//     </div>
//     <div className="mt-[15px] flex place-items-center justify-between">
//       <p className="rounded-[80px] bg-slate-200 h-[38px] w-[38px]">&nbsp;</p>
//       <p className="rounded-[2px] bg-slate-200 h-[27px] w-[100px] translate-y-[10px] mx-[20px]">&nbsp;</p>
//       <p className="rounded-[80px] bg-slate-200 h-[38px] w-[38px]">&nbsp;</p>
//     </div> 
//     <div className="flex place-items-center justify-between mt-[15px]">
//       <p className="rounded-[10px] bg-slate-200 h-[17px] w-[50px]">&nbsp;</p>
//       <p className="rounded-[20px] bg-slate-200 h-[20px] w-[90px] mx-[20px]">&nbsp;</p>
//       <p className="rounded-[10px] bg-slate-200 h-[17px] w-[50px]">&nbsp;</p>
//     </div>
//   </div>
// ));

export default function Featurematches({ data, game }) {
   const navigate = useNavigate();

   const nextPage = (item) => {
    navigate(`/contest/${game}/${item?.match_id}`) 
    localStorage.setItem('state', JSON.stringify({ game, mid : item?.match_id || item?.mid , team1_name : item?.teama?.short_name || item?.teams?.home?.abbr || item?.teams?.home?.shortname, team2_name : item?.teamb?.short_name || item?.teams?.away?.abbr || item?.teams?.away?.shortname, time : item?.timestamp_start || item?.timestampstart } ))
    }

  return (
    <>
      <div className={style.feature_main}>
        <p className={style.title}>
          Feature <span className={style.title_span}>Matches</span> <img src='/png/matches/29534706e0ad6b8d3001357684e384fe.png' width={20} height={20} alt="title_icon" style={{objectFit : 'contain'}}/>
        </p>
        <div className={`px-[16px] scroll_x  ${style.featurematches} gap-3 `}>
          {data?.map((item, index) => (
            <div className={`shadow ${style.card}`} key={index} >
              <div onClick={()=> nextPage(item)}>
                <div className={style.top_section}>
                  <p className={style.team1_shortname}>{item?.teama?.short_name || item?.teams?.home?.abbr || item?.teams?.home?.shortname}</p>
                  <div className=" relative">
                    <SvgIcon
                      className={style.series_name_bg}
                      iconName={Matches.icon1}
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

                  <p className={style.team2_shortname}>{item?.teamb?.short_name}</p>
                </div>
                <div className={style.middle_section}>
                  <div className={style.flag_wrapper1}  >
                    <img
                      src={item?.teama?.logo_url || item?.teams?.home?.logo}
                      alt="teama_logo"
                      className="team_logo"
                    />
                  </div>

                  <div className={style.wrapper}>
                    <p className={style.vs}>VS</p>
                  </div>

                  <div className={style.flag_wrapper2} >
                    <img
                      src={item?.teamb?.logo_url || item?.teams?.away?.logo}
                      alt="teamb_logo"
                      className="team_logo"
                    />
                  </div>
                </div>
                <div className={style.bottom_wrapper}>
                  <SvgIcon
                    className={style.bottom}
                    iconName={Matches.icon2}
                  />

                  <div className={style.content_area}>
                    <p className={style.team1_name}>{item?.teama?.name || item?.teams?.home?.tname}</p>
                    <div className={style.date_time_wrapper}>
                      <p className={style.time}>
                        <SvgIcon
                          className={style.time_icon}
                          iconName={Matches.icon3}
                        />
                        &nbsp; <CountdownTimer timestamp={item?.timestamp_start || item?.timestampstart}/>
                      </p>

                      <p className={style.date}>
                        <SvgIcon
                          className={style.date_icon}
                          iconName={Matches.icon4}
                        />
                        &nbsp; {getFormatedTimeFromSeconds(item?.timestamp_start || item?.timestampstart, "hh: mm A")} ({getFormatedTimeFromSeconds(item?.timestamp_start || item?.timestampstart, "DD MMM")})
                      </p>
                    </div>
                    <p className={style.team2_name}>{item?.teamb?.name || item?.teams?.away?.tname}</p>
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
