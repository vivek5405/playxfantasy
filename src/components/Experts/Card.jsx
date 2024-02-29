import style from "./style.module.css";
import SvgIcon from "../SvgIcon";
import { experts } from "../../assets/SvgCodes/Expert";

const ExpertCard = () => {
  return (
    <div className={style.expert_card}>
      <div className={style.expert_card_title_wrapper}>
        <SvgIcon
          iconName={experts?.icon1}
          className={style.expert_card_title_wrapper_icon}
        />
        <div className={style.expert_card_title}>
          <img src="/png/c55213ab93d024ba0caab3fb576fc9ea.png" alt="" />
          <p>Fantasy Expert</p>
        </div>
      </div>
      <div className={style.expert_card_data_wrapper}>
        <img
          src="/png/fc37eb4c69a98295d3b75727c20d3a99.png"
          alt=""
          className={style.expert_card_data_wrapper_avatar}
        />
        <div className={style.expert_card_data_right}>
          <p className={style.expert_card_data_right_name}>Rahul tater</p>
          <div className="flex my-[2px]">
            <SvgIcon
              iconName={experts?.icon2}
              className={style.expert_card_data_right_icon}
            />
            <p className={style.expert_card_data_right_followers}>
              3L followers
            </p>
          </div>
          <button type="button" className={style.expert_card_data_right_button}><SvgIcon iconName={experts?.icon3} className="mr-[4px]"/> Follow</button>
        </div>
      </div>
      <div className={`${style.expert_card_data_mid_wrapper} grid grid-cols-2`}>
        <div className={style.button}>
            <div className={style.img_wrapper}><img src="/png/333e248a0efd0fc4f442474685405c3b.png" alt="" /></div>
            <div className="ml-[8px]">
              <p className={style.title}>Playing since</p>
              <p className={style.data}>2016</p>
            </div>
        </div>
        <div className={`${style.button} ml-[10px]` }>
            <div className={style.img_wrapper}><img src="/png/6df9a89bff2a940271348aa2634a2835.png" alt="" /></div>
            <div className="ml-[8px]">
              <p className={style.title}>Lifetime winnings</p>
              <p className={style.data}>3.2 Crore</p>
            </div>
        </div>
      </div>
      <button type="button" className={style.get_free_button}>Get Free Team</button>
    </div>
    
  )
}

export default ExpertCard