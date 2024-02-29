import React, { memo } from "react";
import ExpertCard from "./Card";
import style from "./style.module.css";


const Experts = () => {
  return (
    <div className={style.expert_main}>
      <ExpertCard/>
      <ExpertCard/>
      <ExpertCard/>
      <ExpertCard/>
      <ExpertCard/>
    </div>
  );
};

export default memo(Experts);
