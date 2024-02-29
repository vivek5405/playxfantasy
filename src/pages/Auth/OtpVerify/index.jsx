import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { useState, memo, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import { notify } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";
import Button1 from "../../../components/Buttons/Button1";
import OtpInput from 'react18-input-otp';

const PhoneOtpVerify = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const { state } = useLocation();
    const [phone, setPhone] = useState(null);
   
    const [otp, setOtp] = useState("");
    const verifyOtp = async () => {
        if (otp.length != 6) {
        return notify("Please enter a valid OTP")
        }
        const tempData = {};
        tempData.otp = otp;
        setLoading(true);
        const response = await fetchDataFromApi("/auth/verify-otp-phone", {otp, phone});
        if (response.status) {
            notify(response?.message);
            navigate("/register-final", { replace: true,  state: { phone: phone} });
        } else {
            notify(response?.message);
        }
        setLoading(false);
    };

    const resendOtp = async () => {
        if(counter > 0) return notify("Please wait...");
        setLoading(true);
        const data = await fetchDataFromApi("/auth/send-otp-phone", {phone});
        setLoading(false);
        if (data?.status) {
        notify(data?.message);
        setCounter(60);
        } else {
        notify(data?.message);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
        }, 1000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if(!state && !state?.phone && state?.phone?.length !== 10) navigate('/phone-login');
        setPhone( state?.phone)
        setCounter(0)
    }, [])

  return (
      <ContentWrapper>
        <Spinner open={loading} />
        <div className={style.login_main}>
          <TopBarDesign/>
          <div className={style.login_section}>
            <p className={style.title}>Verify Your Number</p>
            <p className={style.description}>
              Please enter the code sent to your phone number.
            </p>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus={true}
              isInputNum={true}
              inputStyle={{
                borderRadius: 8,
                border: "2px solid",
                borderColor: "var(--primary-60-base, #717DCC)",
                display: "flex",
                width: "48px",
                height: "48px",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px !important",
                outline: "none",
                margin: "6px",
              }}
              maxLength={1}
            />
            {(counter > 0 && (
              <p className={style.resend}>
                Resend code in
                <span>
                  00:
                  {String(counter).padStart(2, "0")}
                </span>
              </p>
            )) || (
              // Counter is not greater than 0
              <p
                className={`${style.resend} cursor-pointer`}
                onClick={resendOtp}
              >
                Resend OTP
              </p>
            )}

            <Button1  className="button-blue mt-[60px]" name="Verify OTP" onClick={verifyOtp} type="btn"  />

          </div>
        </div>
      </ContentWrapper>
  );
};

export default PhoneOtpVerify;
