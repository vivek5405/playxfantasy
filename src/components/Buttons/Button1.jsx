import React, { memo } from 'react'
import "./style.css";

const Button1 = ({className, name, onClick, type}) => {
  return ( <button type={type} className={className} onClick={onClick}>{name}</button>)
}

export default memo(Button1)