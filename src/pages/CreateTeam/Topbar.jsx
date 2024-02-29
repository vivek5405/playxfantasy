import React from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../../components/Matches/Counter";
import { common } from "../../assets/SvgCodes/Common";
import SvgIcon from "../../components/SvgIcon";

const Topbar = ({time}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.topBar_section}>
        <button
          type="button"
          className="px-[12px]"
          onClick={() => navigate(-1)}
        >
          <SvgIcon iconName={common.back} />{" "}
        </button>

        {time ? (<div className={'time'}> <CountdownTimer timestamp={time}/> left</div>) :  null}

        <p className={style.faq}>?</p>
      </div>
    </>
  );
};

export default Topbar;
