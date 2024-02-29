import Cricket_png from "/png/home-tab/cricket.png";
import Football_png from "/png/home-tab/football.png";
import Kabaddi_png from "/png/home-tab/kabaddi.png";
import "./style.css";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const ColorTabs = ({value, handleChange}) => {

  return (

      <Tabs value={value} onChange={handleChange}  variant="fullWidth" sx={tabsStyles} >
        <Tab
          icon={
            <img
              src={Cricket_png}
              alt="Cricket"
              className="tab_icon mr-[7px] translate-y-[3px]"
            />
          }
          label="Cricket"
          value="Cricket"
          sx={tabStyles}
        />
        <Tab
          icon={<img src={Football_png} alt="Football" className="tab_icon mr-[7px] translate-y-[2px]" />}
          label="Football"
          value="Football"
          sx={tabStyles}
        />
        <Tab
          icon={<img src={Kabaddi_png} alt="Kabaddi" className="tab_icon mr-[7px] translate-y-[2px]" />}
          label="Kabaddi"
          value="Kabaddi"
          sx={tabStyles}
        />
      </Tabs>
 
  );
};

const tabsStyles = {
  maxHeight: 45,
  display: 'flex',
  backgroundColor: '#1B1C26'
  
};

const tabStyles = {
  color: value => value === "Cricket" ? "#fff" : "#eee",
  fontFamily: "var(--font1)",
  textTransform: "capitalize",
  fontSize: 12,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  Transform : 'TranslateY(-5px)',
};

export default React.memo(ColorTabs);
