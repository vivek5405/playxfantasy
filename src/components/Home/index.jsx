import React, { useState, useEffect } from 'react';
import HomeCarousel from "../Carousel/HomeCarousel";
import styles from "./style.module.css";
import Categorytab from "../CategoryTabs";
import { fetchDataFromApi } from '../../utils/fetchDataFromApi'; 
import Featurematches from '../Matches/Featurematches';
import Matches from '../Matches/Matches';
import { notify, ToastProvider } from '../Toast';
import { useQuery, useQueryClient  } from '@tanstack/react-query';

// async function fetchData(value) {
//   const response = await fetch(import.meta.env.VITE_SERVER_URL + `/home?game=${value}`);
//   return response.json();
// }


const HomePage = ({value, handleChange}) => {
  const [homeData, setHomeData] = useState([]);
  const queryClient = useQueryClient();



  const handleInvalidateBalanceQuery = () => {
    // Invalidate the 'balance' query
    queryClient.invalidateQueries({
      queryKey: ['balance'],
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ['home', value],
    queryFn: () => fetchDataFromApi('/home', { game: value}), // pass a reference to fetchData, not the result of its invocation
    staleTime: 60 * 1000,
  });


  return (
    <>  
    <ToastProvider/>
      <Categorytab  value={value} handleChange={handleChange}/>
      <div className="scroll_y bg1 pb-[150px]">
        <HomeCarousel />
        {
          data?.featureMatches && data?.featureMatches?.length > 0 ? (<Featurematches data={data?.featureMatches} game={value}/>) : null
        }

        {/* <p className='bg-[#b2c160] opacity-50'>hiii</p>
        <button onClick={handleInvalidateBalanceQuery}>Invalidate Balance Query</button> */}
        
        <Matches data={data?.upcomingMatches} game={value}/> 
      </div>
    </>
  );
};

export default HomePage;
