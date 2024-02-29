import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { useState, } from "react";
import SvgIcon from "../../../components/SvgIcon";
import { Auth } from "../../../assets/SvgCodes/Auth";
import { useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import { notify } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";
import Button1 from "../../../components/Buttons/Button1";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setusers] = useState({
    phone: "",
    email: "",
    password: "",
    cpassword: "",
    inviteCode: "",
  });

  const Register = async () => {
    setLoading(true);
    const data = await fetchDataFromApi("/auth/register", {
      phone: users?.phone,
      email: users?.email,
      password: users?.password,
      cpassword: users?.cpassword,
      inviteCode: users?.inviteCode,
    });
    setLoading(false);
    if (data?.status) {
      notify(data?.message);
      navigate("/verify-otp", { replace: true, state: { phone: users?.phone} })
    } else {
      notify(data?.message);
    }
  };

  //password icon handle
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  const ctoggleShowPassword = () => {
    csetShowPassword((cshowPassword) => !cshowPassword);
  };

  return (
    <>
      <ContentWrapper classname="overflow-y-auto">
        <Spinner open={loading} />
        <div className={`${style.register_main}`}>
          <TopBarDesign />
          <div className={`${style.register_section} `}>
            <p className={style.title}>Register</p>
            <p className={style.description}>Hello Create Your Account.</p>

            <div className={style.form}>
              <div className="input_container">
                <p className="phone_country">+91 |</p>
                <input
                  type="tel"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0  inputStyle`}
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) =>
                    setusers({ ...users, phone: e.target.value })
                  }
                  value={users.phone}
                />
              </div>

              <div className="input_container mt-[16px]">
                <input
                  type="email"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="email"
                  placeholder="Enter your email address"
                  onChange={(e) =>
                    setusers({ ...users, email: e.target.value })
                  }
                  value={users.email}
                />
              </div>

              <div className="input_container mt-[16px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border-transparent  focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setusers({ ...users, password: e.target.value })
                  }
                  value={users.password}
                />
                <SvgIcon
                  iconName={showPassword ? Auth.icon1 : Auth.icon2}
                  className="password_eye"
                  onClick={toggleShowPassword}
                />
              </div>

              <div className="input_container mt-[16px]">
                <input
                  type={cshowPassword ? "text" : "password"}
                  className={`border-transparent  focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="cpassword"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setusers({ ...users, cpassword: e.target.value })
                  }
                  value={users.cpassword}
                />
                <SvgIcon
                  iconName={cshowPassword ? Auth.icon1 : Auth.icon2}
                  className="password_eye"
                  onClick={ctoggleShowPassword}
                />
              </div>

              <div className="input_container mt-[16px]">
                <input
                  type="text"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="inviteCode"
                  placeholder="Enter invitation code (Optional)"
                  onChange={(e) =>
                    setusers({ ...users, inviteCode: e.target.value })
                  }
                  value={users.inviteCode}
                />
              </div>

              <button
                type="submit"
                className="button-blue mt-[40px]"
                onClick={Register}
              >
                Register
              </button>
            </div>
            <p className={style.dont_hv_an_acc}>Already have an account?</p>
            <Button1
              onClick={() => navigate("/boarding")}
              className="button-green mt-[8px] mb-[20px]"
              name="Log In"
            />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default Register;
