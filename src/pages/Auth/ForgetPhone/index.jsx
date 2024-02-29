import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { useState, memo, useEffect, useRef} from "react";
import SvgIcon from "../../../components/SvgIcon";
import { Auth } from "../../../assets/SvgCodes/Auth";
import { useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import { notify } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";
import Button1 from "../../../components/Buttons/Button1";

const Forget = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const usersRef = useRef({
        phone : "",
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
        const { phone, otp, password, cpassword } = usersRef.current;
        if(!phone) return notify("Please enter a valid phone number")
        if(!otp) return notify("Please enter a valid OTP")
        if(!password) return notify("Please enter a valid password")
        if(password != cpassword) return notify("Confirm password not match")
        setLoading(true);
        const data = await fetchDataFromApi("/auth/forget-password-phone", {
        phone,
        otp,
        password,
        cpassword
        });
        setLoading(false);
        if (data?.status) {
        notify(data?.message);
        navigate('/phone-login', { replace: true })
        } else {
        notify(data?.message);
        }
    };

    const sendOtp = async () => {
        if(counter > 0) return notify("Please wait...");
        const { phone} = usersRef.current;
        if(!phone) return notify("Please enter a valid phone number")
        setLoading(true);
        const data = await fetchDataFromApi("/auth/send-otp-phone", { phone});
        setLoading(false);
        if (data?.status) {
        notify(data?.message);
        setCounter(60);
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
          <div className={style.register_section}>
            <p className={style.title}>Forgot Password</p>
            <div className={style.form} >
              <div className="input_container">
                <p className="phone_country">+91 |</p>
                <input
                  type="tel"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0  inputStyle`}
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={usersRef.phone}
                />
              </div>
              <div className="input_container mt-[16px]">
              <input
                type="number"
                className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                name="otp"
                placeholder="Enter your OTP"
                onChange={handleChange}
                value={usersRef.email}
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
             
              <Button1 className="button-blue mt-[40px]" name="Change Password" onClick={forgetPassword} type="btn" />
            </div>
          
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default memo(Forget);
