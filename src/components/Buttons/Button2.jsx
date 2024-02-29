import React from 'react'
import "./style.css";

const Button2 = ({type, name, src, onClick, }) => {
  return (
    <>
        <button type='button' className={type} onClick={onClick}> 
            <img
            src={src}
            alt="My Image"
            width={18}
            height={18}
            className='mr-[8px]'
            />
          {name}
        </button>
    </>
  )
}

export default Button2

