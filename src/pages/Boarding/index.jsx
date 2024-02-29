import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import ContentWrapper from '../../components/ContentWrapper'
import TopBarDesign from '../../components/TopBarDesign';
import Button1 from '../../components/Buttons/Button1';
import { memo } from 'react';


const Boarding = () => {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <div className={style.boarding_main}>
          <TopBarDesign/>
          <div className={style.boarding_crausel}>
            {/* <BoardingCrausel/> */}
          </div>
          <Button1 className="button-blue mt-[10px]" name="Log In With Email" onClick={()=> navigate('/email-login')} type="btn"/>
          <Button1 className="button-transparent mt-[16px]" name="Log In With Phone Number" onClick={()=> navigate('/phone-login')} type="btn"/>
          <p className={style.dnt_hv_an_acc}>Don’t have an account?</p>
          <Button1 className="button-green mt-[16px]" name="Register Now" onClick={()=> navigate('/register')} type="btn"/>
  
        </div>
    </ContentWrapper>
  )
}

export default memo(Boarding)

