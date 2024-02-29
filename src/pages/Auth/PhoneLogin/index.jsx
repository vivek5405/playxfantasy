import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { memo, useRef, useState } from "react";
import SvgIcon from "../../../components/SvgIcon";
import { Auth } from "../../../assets/SvgCodes/Auth";
import { useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import Button1 from "../../../components/Buttons/Button1";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";
import { notify, ToastProvider } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";

const PhoneLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const usersRef = useRef({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    usersRef.current[name] = value;
  };

  const Login = async (e) => {
    e.preventDefault();
    const { phone, password } = usersRef.current;
    if(!phone) return notify("Please enter a valid phone number")
    if(!password) return notify("Please enter a valid password")
    setLoading(true);
    const data = await fetchDataFromApi("/auth/phone-login", {
      phone,
      password,
    });
  
    if(data?.error) navigate(data?.error, {replace: true, state: {phone}});
    if (data?.status) {
      notify(data?.message);
      window.location("/")
    } else {
      notify(data?.message);
    }
    setLoading(false);
  };

  //password icon handle
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <>
      <ContentWrapper>
        <Spinner open={loading} />
        <ToastProvider/>
        <div className={style.login_main}>
          <TopBarDesign />
          <div className={style.login_section}>
            <p className={style.title}>Login</p>
            <p className={style.description}>Welcome Login to your account.</p>
            <form className={style.form} onSubmit={Login}>
              <div className="input_container">
                <p className="phone_country">+91 |</p>
                <input
                  type="number"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0  inputStyle`}
                  name="phone"
                  placeholder="Enter your phone number"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={usersRef.phone}
                />
              </div>

              <div className="input_container mt-[30px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border-transparent  focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={usersRef.password}
                />
                <SvgIcon
                  iconName={showPassword ? Auth.icon1 : Auth.icon2}
                  className="password_eye"
                  onClick={toggleShowPassword}
                />
              </div>
              <p
                onClick={() => navigate("/forget-phone")}
                className={style.forget}
              >
                Forget Password ?
              </p>
              <Button1
                className="button-blue mt-[40px]"
                name="Log In"
                type="submit"
              />
            </form>
            <p className={style.dont_hv_an_acc}>Don’t have an account?</p>
            <Button1
              className="button-green mt-[8px]"
              name="Register Now"
              onClick={() => navigate("/register")}
              type="btn"
            />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default memo(PhoneLogin);
