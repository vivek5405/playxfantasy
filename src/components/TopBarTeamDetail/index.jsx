import React, { useState, useEffect, lazy, Suspense } from "react";
import style from "./style.module.css";
import { common } from "../../assets/SvgCodes/Common";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SvgIcon from "../SvgIcon";
const LazyWalletDropDown = lazy(() => import("../DropDown/WalletDropDown"));
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../Matches/Counter"

const TopBarTeamDetail = ({ name1, name2, time, fixed }) => {
  const navigate = useNavigate();

 
  const [visible, setVisible] = useState(false);
  const openWallet = () => {
    setVisible(!visible);
  };
  return (

      <div className={fixed ? style.topbar1_main_fixed : style.topbar1_main} >
        <button
          type="button"
          className="px-[12px]"
          onClick={() => navigate(-1)}
        >
        <SvgIcon iconName={common.back} />{" "}
        </button>
        <p className={style.topbar1_title}>{name1}</p>
        {name1 && name2 ? (<span>vs</span>) :  null}
        <p className={style.topbar1_title}>{name2}</p>
        {time ? (<div className={style.time}> <CountdownTimer timestamp={time}/> left</div>) :  null}

        <AccountBalanceWalletOutlinedIcon
          width={18}
          height={18}
          sx={{
            flexDirection: "right",
            marginLeft: "auto",
            marginRight: "30px",
            color: "white",
          }}
          onClick={openWallet}
        />

        <Suspense>
        <Suspense >
        {visible ? <LazyWalletDropDown isMenuOpen={visible} /> : null}
        </Suspense>
        </Suspense>
      </div>

  );
};

export default TopBarTeamDetail;
