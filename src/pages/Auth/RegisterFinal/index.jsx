import style from "./style.module.css";
import ContentWrapper from "../../../components/ContentWrapper";
import React, { useState, memo, useEffect, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBarDesign from "../../../components/TopBarDesign";
import { notify } from "../../../components/Toast";
import Spinner from "../../../components/Loader/Spinner";
import { fetchDataFromApi } from "../../../utils/fetchDataFromApi";
import Button1 from "../../../components/Buttons/Button1";
import Autocomplete from "../../../components/AutoComplete";
import SvgIcon from "../../../components/SvgIcon";
import { Auth } from "../../../assets/SvgCodes/Auth";


const RegisterFinal = () => {
  const inputFileRef = useRef(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //handle username visible or not
  const [usernameVisible, setUsernameVisible] = useState(null);
  //for state change
  const [selected, setSelected] = useState("");
  //for image pic location
  const [selectedImage, setSelectedImage] = useState(null);
  const { state } = useLocation();
  const [phone, setPhone] = useState(null);

  const createAccount = async (formData) => {
    try {
      const data = await fetchDataFromApi(
        "api/uploadImage",
        { image: selectedImage },
        "POST"
      );
      console.log(data);
    } catch (error) {
      // Handle error
    } finally {
      // Set loading to false after data is fetched
    }
    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data)
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const list = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleFileUpload = async (event) => {
    if(event.target.files.length > 0){
        validateSelectedFile(event?.target?.files[0])
    }
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     // setSelectedImage(e?.target?.result)
    //     validateSelectedFile(e?.target?.result)
    //     console.log(e.target.result)
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  useEffect(() => {
    if(!state && !state?.phone && state?.phone?.length !== 10) navigate('/phone-login');
    setPhone( state?.phone)
  }, [])

  // //check username logic here
  function handleChange(event) {
    const value = event.target.value;
    if (value.length > 5) {
      // Delay console log by 3 seconds
      setTimeout(() => searchUsername(value), 2100);
    } else {
      setUsernameVisible(false);
    }
  }

  const searchUsername = async (value) => {
    const response = await fetchDataFromApi('/auth/check-username', { username: value });
    if (response.status) {
      setUsernameVisible(true);
    } else {
      setUsernameVisible(false);
    }
  };

  const validateSelectedFile = (data) => {
    const MAX_FILE_SIZE = 120 // 5MB
    const fileSizeKiloBytes = data.size / 1024
    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      notify("File size is greater than maximum limit");
      setSelectedImage("")
      return
    }
   
    const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        console.log(e.target.result)
      };
      reader.readAsDataURL(data);
  };

  return (
    <>
      <ContentWrapper>
      <Spinner open={loading} />
        <div className={style.login_main}>
          <TopBarDesign/>
          <div className={style.login_section}>
            <div className={style.form} >
              <div className={style.upload_profile_container}>
                <img
                  src={selectedImage ? selectedImage : "/png/avatar-bg.png"}
                  alt={"image slider"}
                  className={style.upload_profile_image}
                />

                <label htmlFor="fileInput" className={style.customUpload}>
                  {selectedImage ? (
                    <SvgIcon
                      iconName={Auth.icon4}
                      className={style.minus}
                    />
                  ) : (
                    <SvgIcon
                      iconName={Auth.icon3}
                      className={style.plus}
                    />
                  )}

                  <input type="file" id="fileInput" accept="image/*" name="file" ref={inputFileRef} onChange={handleFileUpload} style={{ display: "none" }} />

                </label>
              </div>
              <div className="input_container mt-[44px] mb-[16px]">
                <input
                  type="text"
                  className={`border-transparent focus:border-transparent focus:ring-opacity-0 inputStyle`}
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              </div>

              {(usernameVisible === true && (
                <p className={style.username_hint}>
                  ✓ &nbsp; Username available
                </p>
              )) ||
                (usernameVisible === false && (
                  <p className={style.username_hint1}>
                    ✗ &nbsp; Username not available
                  </p>
                ))}

              <Autocomplete
                placeholder="Select State"
                options={list}
                value={selected}
                onChange={(val) => setSelected(val)}
              />

              <Button1 type="btn" className="button-blue mt-[40px]" name="save">
                Save
              </Button1>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default RegisterFinal;
