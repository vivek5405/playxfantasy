import React, { useEffect, useState } from 'react';
import Topbar from './Topbar';
import ContentWrapper from '../../components/ContentWrapper';
import style from './style.module.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SvgIcon from '../../components/SvgIcon';
import { CreateTeamSvgIcon } from '../../assets/SvgCodes/CreateTeam';
import TabRounded from '../../components/Tabs';
import { useQuery } from "@tanstack/react-query";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import CreateTeamPlayersCard from './CreateTeamPlayersCard';

const CreateTeam = () => {
   //state data from another page manage
   const { state } = useLocation();
   const navigate = useNavigate();
   if (!state || !state.game || !state.mid || !state.cid) {
    navigate('/');
    return null;
  }

   const [activeTab, setActiveTab] = useState(0);
   const [tabData, setTabData] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["create-team-page", state?.game, state?.mid, state?.cid],
    queryFn: () => fetchDataFromApi("/create-team-page", { game : state?.game, mid : state?.mid }), // pass a reference to fetchData, not the result of its invocation
    staleTime: 60 * 1000,
  });

    //filter data handle here
    const [filter, setFilter] = useState([ 
        {name: "Selected By", field: "selectedBy", ascending: false, id: 1},
        {name: "Points", field: "run", ascending: false, id: 2},
        { name: "Credits", field: "fantasy_credit", ascending: false, id: 3}
      ]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [teamCount, setTeamCount] = useState({
      team1 : 0,
      team2 : 0
    });

    const [teamid, setTeamId] = useState({
      team1 : null,
      team2 : null
    })

    //set selcted players
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
    const [credit, setCredit] = useState(100)
    const [roleCount, setRoleCount] = useState({});

    const handleCardClick = (row) => {
      console.log(row)
      const { pid, tid, role = playing_role || role } = row;
      const index = selectedPlayerIds.findIndex((player) => player.pid === pid);
      if (index === -1) {
        const check = checkValidation(row)
        if(check){
          console.log(check)  
          return
        }
        setCredit(credit - (row?.fantasy_player_rating || row?.rating || row?.fantasy_credit));
        setSelectedPlayerIds((prevIds) => [...prevIds, { pid, tid }]);
        setTeamCount((prevCount) => {
          const updatedCount = { ...prevCount };
          if (tid == teamid?.team1) {
            updatedCount.team1 += 1;
          } else if (tid == teamid?.team2) {
            updatedCount.team2 += 1;
          }
          return updatedCount;
        });
        updateRoleCount(role, 1);

      } else {
        setCredit(credit + Number(row?.fantasy_player_rating || row?.rating || row?.fantasy_credit));
        setSelectedPlayerIds((prevIds) => [
          ...prevIds.slice(0, index),
          ...prevIds.slice(index + 1),
        ]);
        setTeamCount((prevCount) => {
          const updatedCount = { ...prevCount };
          if (selectedPlayerIds[index].tid == teamid?.team1) {
            updatedCount.team1 -= 1;
          } else if (selectedPlayerIds[index].tid == teamid?.team2) {
            updatedCount.team2 -= 1;
          }
          return updatedCount;
        });
        updateRoleCount(role, -1);
      }
     
    };

    const updateTabData = (tabData, role, increment) => {
      return tabData.map((data) => {
        // if (data.role === role) {
        //   return { ...data, span: data.span + increment };
        // }
        
        if (data.role === role) {
          if (data.span + increment >= data.max) {
            return { ...data, span: data.span + increment, lock: true };
          } else {
            return { ...data, span: data.span + increment, lock: false };
          }
        }
   
        return data;
      });
    };
    
    const updateRoleCount = (role, increment) => {
      setTabData((prevTabData) => updateTabData(prevTabData, role, increment));
    };

    const checkValidation = (row) => {
      // Check if the maximum number of players from one team has been reached
      const MaxPlayer = data?.gameCategoryData?.MaxPlayer;
      const maxPlayerCountFromOneTeam = data?.gameCategoryData?.MaxPlayerFromOneTeam;
      if(selectedPlayerIds?.length >= MaxPlayer){
        return data?.gameCategoryData?.MaxPlayerErrorMsg
      }else if (row?.tid === teamid?.team1 && teamCount?.team1 >= maxPlayerCountFromOneTeam ) {
        return data?.gameCategoryData?.MaxPlayerOneTeamError
      } else if (row?.tid === teamid?.team2 && teamCount?.team2 >= maxPlayerCountFromOneTeam ) {
        return data?.gameCategoryData?.MaxPlayerOneTeamError
      }
      // Check if the minimum number of players from each category has been reached
      const categories = data?.gameCategoryData?.Categories;
      const category = categories.find(cat => cat.Role === row?.role || row?.playing_role);
      
      const maxPlayerCount = category?.MaxPlayerCount;
      const playersFromRole = tabData.find(cat => cat.role === row?.role || row?.playing_role);

      if (playersFromRole.span >= maxPlayerCount) {
        return category?.MaxSelectError;
      }
      return null;
    }
  
    const clearTeam = () => {
      setCredit(data?.gameCategoryData?.TotalCredit)
      setSelectedPlayerIds([])
      setTeamCount({
        team1 : 0,
        team2 : 0
      })
      const newTabData = data?.gameCategoryData?.Categories?.map((category, index) => ({
        name: category.Name,
        role: category.Role,
        value: index,
        span: 0,
        min : category?.MinPlayerCount,
        max : category?.MaxPlayerCount,
        lock : false,
      }));
      setTabData(newTabData);
    }

    const handleFilterButtonClick = (position) => {
        setSelectedFilter(position + 1);
        // setIsFilterApplied(true);
        setFilter((prevFilter) => {
          const updatedFilter = [...prevFilter];
          if (updatedFilter[position]) {
            updatedFilter[position].ascending = !updatedFilter[position].ascending;
          }
          return updatedFilter;
        });
        // Get the selected filter details
        const selected = filter[position];
        const { field, ascending } = selected;
    
        // Sort the items based on the selected filter
        const sortedItems = filterData.sort((a, b) => {
            if (ascending) {
              return a[field] - b[field];
            } else {
              return b[field] - a[field];
            }
          });
          console.log(sortedItems)
          setFilterData(sortedItems);
    };

    const handleTabChange = (newActiveTab) => {
        setActiveTab(newActiveTab)
        let dataExtract;
        if(state?.game === 'Cricket')  dataExtract =  data?.playersList?.filter(player => player?.playing_role?.toLowerCase() === tabData[newActiveTab]?.role?.toLowerCase());
        if(state?.game === 'Football')  dataExtract =  data?.playersList?.filter(player => player?.playing_role?.toLowerCase() === tabData[newActiveTab]?.role?.toLowerCase());
        if(state?.game === 'Kabaddi')  dataExtract =  data?.playersList?.filter(player => player?.role?.toLowerCase() === tabData[newActiveTab]?.role?.toLowerCase());
        setFilterData(dataExtract)
    };

    useEffect(() => {
        const newTabData = data?.gameCategoryData?.Categories?.map((category, index) => ({
          name: category.Name,
          role: category.Role,
          value: index,
          span: 0,
          min : category?.MinPlayerCount,
          max : category?.MaxPlayerCount,
          lock : false,
        }));
        setTabData(newTabData);
        console.log(newTabData)
      let dataExtract;
      if(state?.game === 'Cricket')  dataExtract =  data?.playersList?.filter(player => player?.playing_role?.toLowerCase() === data?.gameCategoryData?.Categories[0]?.Role?.toLowerCase());
      if(state?.game === 'Football')  dataExtract =  data?.playersList?.filter(player => player?.playing_role?.toLowerCase() === data?.gameCategoryData?.Categories[0]?.Role?.toLowerCase());
      if(state?.game === 'Kabaddi')  dataExtract =  data?.playersList?.filter(player => player?.role?.toLowerCase() === data?.gameCategoryData?.Categories[0]?.Role?.toLowerCase());
      setFilterData(dataExtract)
      setCredit(data?.gameCategoryData?.TotalCredit)
      setTeamId({team1 : data?.matchDetails?.teama?.team_id || data?.matchDetails?.teams?.home?.tid, team2 : data?.matchDetails?.teamb?.team_id || data?.matchDetails?.teams?.away?.tid})
    }, [data])

    useEffect(()=>{
      console.log(tabData)
    }, [tabData])
    // useEffect(() => {
    //   setTabData((prevTabData) => {
    //     const updatedTabData = prevTabData.map((tab) => {
    //       const updatedSpan = roleCount[tab.role];
    //       return { ...tab, span: updatedSpan };
    //     });
    //     console.log(roleCount, updatedTabData)
    //     return updatedTabData;
    //   }, [roleCount]);
    // }, [roleCount]);




  return (
    <ContentWrapper>
      <div className={style.create_team_section1}>
        <Topbar
          time={
            isLoading
              ? state?.time
              : data?.matchDetails?.timestamp_start ||
                data?.matchDetails?.timestampstart
          }
        />
        <div className={style.teamDetail_wrapper}>
          <div className={style.teama_detail_section}>
            <div className={style.flag_wrapper}>
              <img src={data?.matchDetails?.teama?.logo_url || data?.matchDetails?.teams?.home?.logo} alt="" />
            </div>
            <p className={style.teama_count}>{teamCount?.team1}</p>
            <div className={style.teama_details_wrapper}>
              <p className={style.players_count_title}> Players</p>
              <p
                className={style.players_count}
              >{`${selectedPlayerIds?.length}/${data?.gameCategoryData?.MaxPlayer}`}</p>
            </div>
          </div>
          <div className={`${style.teamb_detail_section}`}>
            <div className={style.teamb_details_wrapper}>
              <p className={style.credit_left_title}> Credits Left</p>
              <p className={style.credit_left}>{credit}</p>
            </div>
            <p className={style.teamb_count}>{teamCount?.team2}</p>
            <div className={style.flag_wrapper}>
              <img src={data?.matchDetails?.teamb?.logo_url || data?.matchDetails?.teams?.away?.logo} alt="" />
            </div>
          </div>
        </div>
        <div className={style.team_name_wrapper}>
          <p className={style.team_name}>
            {isLoading
              ? state?.team1_name
              : data?.matchDetails?.teama?.short_name ||
                data?.matchDetails?.teams?.home?.abbr ||
                data?.matchDetails?.teams?.home?.shortname}
          </p>
          <p className={style.team_name}>
            {isLoading
              ? state?.team2_name
              : data?.matchDetails?.teamb?.short_name ||
                data?.matchDetails?.teams?.away?.abbr ||
                data?.matchDetails?.teams?.home?.shortname}
          </p>
        </div>
        <div className={style.players_select_ui_arrorw_wrapper}>
          
          {Array.from({ length: data?.gameCategoryData?.MaxPlayer }, (_, i) => (
            <div key={i} className={style.arrow}>
              <SvgIcon
                className={style.items}
                iconName={
                  i < selectedPlayerIds.length
                    ? CreateTeamSvgIcon?.greenArrow
                    : CreateTeamSvgIcon?.blackArrow
                }
              />
              {
                i + 1 === selectedPlayerIds?.length ? (<p>{selectedPlayerIds.length}</p>) : null
              }
            </div>
          ))}
        </div>
        <div className={style.max_player_info_wrapper}>
          <SvgIcon iconName={CreateTeamSvgIcon.icon1} />
          <p className={style.max_palyer_info}>
            Max {data?.gameCategoryData?.MaxPlayerFromOneTeam} players from a
            team 
          </p>
          <button
            className={style.clear_team_btn}
            type="button"
            onClick={clearTeam}
          >
            <SvgIcon
              iconName={CreateTeamSvgIcon.icon2}
              className={"mr-[2px]"}
            />
            Clear Team
          </button>
        </div>
        <div className={style.player_role_tab_wrapper}>
          {
            state?.game && state?.game === 'Kabaddi' ? (<TabRounded
              data={tabData}
              className2={`grid-cols-3`}
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />) :  (<TabRounded
              data={tabData}
              className2={`grid-cols-4`}
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />)
          }
        </div>
        <div className={style.role_pick_limit_wrapper}>
          <p>
            {data?.gameCategoryData?.Categories[activeTab]?.Name}{" "}
            <span>
              Pick{" "}
              {`${data?.gameCategoryData?.Categories[activeTab]?.MinPlayerCount} - ${data?.gameCategoryData?.Categories[activeTab]?.MaxPlayerCount} `}
            </span>
          </p>{" "}
          <SvgIcon iconName={CreateTeamSvgIcon.icon3} className={"ml-[8px]"} />{" "}
          <button type="button" className={"ml-auto"}>
            {" "}
            <SvgIcon iconName={CreateTeamSvgIcon.icon4} />
          </button>
        </div>
        <div className={style.filter_wrapper_items}>
          <p> &nbsp;</p>
          {filter.map((item, index) => (
            <p
              className={style.sort_by_items}
              onClick={() => handleFilterButtonClick(index)}
              key={index}
            >
              {item.name}{" "}
              {selectedFilter === index + 1 &&
              filter[index]?.ascending === true ? (
                <span>↓</span>
              ) : selectedFilter === index + 1 &&
                filter[index]?.ascending === false ? (
                <span>↑</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          ))}
          <p> &nbsp;</p>
        </div>
      </div>
      <div className={style.create_team_section2}>
        {filterData
          ? filterData.map((item, index) => (
              <CreateTeamPlayersCard
                key={index}
                data={item}
                handleCardClick={handleCardClick}
                isSelected={selectedPlayerIds.some(
                  (player) => player.pid === item.pid 
                )}
                lock={tabData[activeTab]?.lock}
                team1_id={data?.matchDetails?.teama?.team_id || data?.matchDetails?.teams?.home?.tid}
                team2_id={data?.matchDetails?.teamb?.team_id || data?.matchDetails?.teams?.away?.tid}
                team1_name={data?.matchDetails?.teama?.short_name || data?.matchDetails?.teams?.home?.shortname}
                team2_name={data?.matchDetails?.teamb?.short_name || data?.matchDetails?.teams?.away?.shortname}
              />
            ))
          : null}
      </div>
    </ContentWrapper>
  );
}

export default CreateTeam