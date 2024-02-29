import React, { useState } from 'react';
import style from './style.module.css';


const TabRounded = ({data, className, onTabChange, activeTab, className2 }) => {
  
  const handleTabClick = (value) => {
    onTabChange(value);
  };

  return (
    <div className={`px-[10px] py-[8px] ${className} ${style.tabrounded_main_container}`}>
      <div className={`${style.tabrounded_main_wrapper} ${className2}`}>
        {data?.map((item, index) => (
            <div className="px-[5px] flex items-center justify-center" key={index}>
              <button className={item?.value === activeTab ? style.tabrounded_active_tab : style.tabrounded_inactive_tab} onClick={() => handleTabClick(item?.value)}>
                {item.name} {item?.span && item?.span > 0 ? (<span>{item?.span }</span>) :  null}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TabRounded