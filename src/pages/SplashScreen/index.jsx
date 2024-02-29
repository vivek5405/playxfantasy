import style from './style.module.css'
import { memo, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper'
import { useNavigate } from 'react-router-dom';


const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/home')
    }, 2000);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  return (
       
        <div className={style.splash_main}>
            <img src='/png/home_logo.png'  alt='logo'/>
        </div>

        

  )
}

export default memo(SplashScreen)