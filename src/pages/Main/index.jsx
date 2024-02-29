// import React, { useEffect, useState } from "react";
// import ContentWrapper from "../../components/ContentWrapper";
// import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
// import AppbarTop from "../../components/AppBar";

// const Main = () => {
//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     const data = await fetchDataFromApi("/api/balance", {});
//     setData(data);
//     console.log(data);
//   };
//   // useEffect(() => {
//   //   fetchData();
//   // }, []);
//   return (
//     <ContentWrapper >
//       <AppbarTop />
//     </ContentWrapper>
//   );
// };

// export default Main;


// Main.jsx// 
import React, { memo, useEffect, useState, useMemo  } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import AppbarTop from "../../components/AppBar";
import HomePage from "../../components/Home";
import MyMatches from "../../components/MyMatches";
import Experts from "../../components/Experts";
import Profile from "../../components/Profile";
import Bottombar from "../../components/BottomBar/Bottombar";



const Main = memo(() => {
  console.log("render main")

  const [activeButton, setActiveButton] = useState('/');
  const components = {
    '/': HomePage,
    '/my-matches': MyMatches,
    '/expert': Experts,
    '/profile': Profile,
  };
  const Component = useMemo(() => components[activeButton] || NotFound, [activeButton]);

  const handleBottomBarClick = (button) => {
    setActiveButton(button);
  };

  const [catId, setCatId] = useState('Cricket');
  const handleChangeCategory = (event, newValue) => {
    setCatId(newValue);
    console.log(newValue)
  };

  return (
    <ContentWrapper className=''>
      <AppbarTop/>
        <Component value={catId} handleChange={handleChangeCategory}/>
      <Bottombar onBottomBarClick={handleBottomBarClick} activeButton={activeButton}/> 
    </ContentWrapper>
  );
});

export default Main;
