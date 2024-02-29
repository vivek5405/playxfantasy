import React, { memo, useEffect, useState } from 'react';
import TabRounded from '../Tabs/index';
import Categorytab from '../CategoryTabs';
import { fetchDataFromApi } from '../../utils/fetchDataFromApi';

const MyMatches = ({value, handleChange}) => {
  const [MyMatches, setMyMatches] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newActiveTab) => {
      setActiveTab(newActiveTab);
  };

  async function fetchData(value) {
      const response = await fetchDataFromApi('/myMatches', {game : value});
      if(response?.status){
        setMyMatches(response)
      }else{
        notify(response?.message)
      }
  }

  useEffect(() => {
    fetchData(value);
  }, [value]);
  return (
    <>
      <Categorytab  value={value} handleChange={handleChange}/>
      <TabRounded data={[{ name : "Upcoming", value : 0, span : 1}, { name : "Live", value : 3}, { name : "Complete", value : 2}]} className="" className2={'grid-cols-3'} onTabChange={handleTabChange} activeTab={activeTab}/>
    </>
  )
}
export default memo(MyMatches)