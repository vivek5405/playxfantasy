import React from "react";
import style from "./style1.module.css";
import SvgIcon from "../../components/SvgIcon";
import { CreateTeamSvgIcon } from "../../assets/SvgCodes/CreateTeam";

const CreateTeamPlayersCard = ({
  data,
  isSelected,
  handleCardClick,
  team1_id,
  team2_id,
  team1_name,
  team2_name,
  lock,
}) => {
  // Update the role count when the player is selected

  return (
    <>
      <div className={style.ruler}>&nbsp;</div>
      <div
        onClick={() => {
          handleCardClick(data);
        }}
        className={`${style.CreateTeamPlayersCard} ${
          isSelected ? style.active_card : ""
        } ${lock && !isSelected ? style.lock : ""}`}
      >
        <div className={style.profile_wrapper}>
          <div className={style.left}>
            <SvgIcon iconName={CreateTeamSvgIcon.icon5} />
            <p
              className={
                data?.tid === team1_id ? style.team_namea : style.team_nameb
              }
            >
              {data?.tid === team1_id ? team1_name : team2_name}
            </p>
          </div>
          <img
            src="https://resources.evertonfc.com/players/side/480x540/p212319.png"
            alt=""
          />
        </div>
        <div className={style.details_wrapper}>
          <p className={style.name}>{data?.short_name || data?.name}</p>
          <p className={style.selected_by}>Sel by 71.23%</p>
          <div className={style.played_last}>
            <p className={style.status_active}></p>
            <p className={style.text_active}>Played last match</p>
          </div>
        </div>
        <p className={style.points}>65</p>
        <p className={style.credit}>
          {data?.fantasy_player_rating || data?.rating || data?.fantasy_credit}
        </p>
        <p
          className={
            isSelected ? style.select_icon_minus : style.select_icon_plus
          }
        >
          {" "}
          <span>{isSelected ? "-" : "+"}</span>{" "}
        </p>
      </div>
    </>
  );
};

export default CreateTeamPlayersCard;
