import React from 'react'
import style from "./style1.module.css";
import SvgIcon from "../SvgIcon";
import { contest } from "../../assets/SvgCodes/Contest";


const Contest_Card = ({data, onClick}) => {
 
  return (
    <>
     <div className={`${style.contest1_wrapper_card} contest_card_click`} onClick={onClick} key={data?._id}>
                <div className={style.top_wrapper}>
                  <p className={style.pool_title}>Prize Pool</p>
                  <p className={` mr-[5px] ${style.entre_fee_title}`}>
                    Entry Fee
                  </p>
                </div>
                <div className={`mt-[4px] ${style.top_wrapper}`}>
                  <p className={style.pool_prize}>{data?.pool_prize_string}</p>
                  <p className={style.entre_fee}>₹{data?.entry_amount}</p>
                </div>
                <div className="px-[12px]">
                  <div className="w-full rounded-full h-[8px] mt-[16px] bg-[#2B2C35] ">
                    <div
                      className=" h-[8px] rounded-full bg-[#FFBA4F]"
                      style={{
                        width: `${
                          (data?.fill_entries * 100) / data?.total_entries
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className={`mt-[4px] px-[4px] ${style.top_wrapper}`}>
                  <p className={style.spot_left}>
                    {data?.total_entries - data?.fill_entries} spots left
                  </p>
                  <p className={style.spot_total}>
                    {data?.total_entries} spots
                  </p>
                </div>

                <div className={style.bottom_wrapper}>
                  <SvgIcon
                    iconName={contest?.icon1}
                    className={style.bottom_wrapper_icon}
                  />
                  <p className={style.bottom_wrapper_txt}>
                    ₹{data?.league_prize[0]?.prize_amt}
                  </p>

                  <SvgIcon
                    iconName={contest?.icon2}
                    className={style.bottom_wrapper_icon2}
                  />
                  <p className={style.bottom_wrapper_txt}>
                    {(
                      (data?.total_winners_count * 100) /
                      data?.total_entries
                    ).toFixed(0)}
                    %
                  </p>

                  <SvgIcon
                    iconName={contest?.icon3}
                    className={style.bottom_wrapper_icon2}
                  />
                  <p className={style.bottom_wrapper_txt}>
                    &nbsp;Upto {data?.max_entry}
                  </p>

                  {data?.confirm_league && (
                    <>
                      <SvgIcon
                        iconName={contest?.icon4}
                        className={style.bottom_wrapper_icon1}
                      />
                      <p className={style.bottom_wrapper_txt1}>
                        &nbsp;Guaranteed
                      </p>
                    </>
                  )}
                </div>
      </div>
    </>
  )
}

export default Contest_Card