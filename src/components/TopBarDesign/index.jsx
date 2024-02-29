import { memo } from 'react';
import style from './style.module.css';

const TopBarDesign = () => {
  return (
    <div className={style.top_bg}>
            <img
              src="/png/home_logo.png"
              className={style.top_icon}
              alt="boarding-image"
            />
    </div>
  )
}

export default memo(TopBarDesign)