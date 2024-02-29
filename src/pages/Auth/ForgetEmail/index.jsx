import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { useState, useEffect, memo, useRef } from "react";
import SvgIcon from "../../../components/SvgIcon";
import { Auth } from "../../../assets/SvgCodes/Auth";
import { useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import Button1 from "../../../components/Buttons/Button1";
import { notify } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";

const Forget = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const usersRef = useRef({
        email : "",
        otp : "",
        password : "",
        cpassword : ""
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      usersRef.current[name] = value;
    };

    const forgetPassword = async (e) => {
        e.preventDefault();
        const { email, otp, password, cpassword } = usersRef.current;
        if(!email) return notify("Please enter a valid email address")
        if(!otp) return notify("Please enter a valid OTP")
        if(!password) return notify("Please enter a valid password")
        if(password != cpassword) return notify("Confirm password not match")
        setLoading(true);
        const data = await fetchDataFromApi("/auth/forget-password-email", {
          email,otp,password,cpassword
        });
        setLoading(false);
        if (data?.status) {
          notify(data?.message);
          navigate('/email-login', { replace: true })
        } else {
          notify(data?.message);
        }
      };
    
      const sendOtp = async () => {
        if(counter > 0) return notify("Please wait...");
        const { email} = usersRef.current;
        if(!email) return notify("Please enter a valid email address")
        setLoading(true);
        const data = await fetchDataFromApi("/auth/send-otp-email", { email});
        setLoading(false);
        if (data?.status) {
          setCounter(60)
          notify(data?.message);
        } else {
          notify(data?.message);
        }
      }


    //password icon handle
    const [showPassword, setShowPassword] = useState(false);
    const [cshowPassword, csetShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword((showPassword) => !showPassword);
    };
    const ctoggleShowPassword = () => {
      csetShowPassword((cshowPassword) => !cshowPassword);
    };

    //otp counter handler
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if(counter > 0) {
                setCounter(counter - 1)
            }
        }, 1000);
        return () => clearInterval(interval);
    })

  return (
    <>
      <ContentWrapper classname="bg-1">
        <Spinner open={loading}/>
        <div className={style.register_main}>
          <TopBarDesign/>
          <form className={style.register_section} onSubmit={forgetPassword}>
            <p className={style.title}>Forgot Password</p>
            <div className={style.form} >
            <div className="input_container">
               
            <input
                type="email"
                className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                value={usersRef.email}
              />
              </div>
              <div className="input_container mt-[16px]">
              <input
                type="number"
                className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                name="otp"
                placeholder="Enter your OTP"
                onChange={handleChange}
                value={usersRef.otp}
              />
              <p className={style.send_otp} onClick={sendOtp}>{counter > 0 ? `${counter} sec` : 'SendOTP'}</p> 
              </div>

              

              <div className="input_container mt-[16px]">
              <input
                type={showPassword ? "text" : "password"}
                className={`border-transparent  focus:border-transparent focus:ring-opacity-0 inputStyle`}
                name="password"
                placeholder="Enter new password"
                onChange={handleChange}
                value={usersRef.password}
                />
                <SvgIcon iconName={showPassword ? Auth.icon1 : Auth.icon2}  className="password_eye" onClick={toggleShowPassword}/>
              </div>

              <div className="input_container mt-[16px]">
              <input
                type={cshowPassword ? "text" : "password"}
                className={`border-transparent  focus:border-transparent focus:ring-opacity-0 inputStyle`}
                name="cpassword"
                placeholder="Confirm new password"
                onChange={handleChange}
                value={usersRef.cpassword}
                />
                <SvgIcon iconName={cshowPassword ? Auth.icon1 : Auth.icon2}  className="password_eye" onClick={ctoggleShowPassword}/>
              </div>
             
              <Button1 className="button-blue mt-[40px]" name="Change Password" type="submit" />
            </div>
          
          </form>

        </div>
      </ContentWrapper>
    </>
  );
};

export default memo(Forget);
