import React from "react";
import ContentWrapper from "../../components/ContentWrapper";
import TopBarTeamDetail from "../../components/TopBarTeamDetail";
import styled from "./style.module.css";
// import { Progress } from "flowbite-react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SvgIcon from "../../components/SvgIcon";
import { contest } from "../../assets/SvgCodes/Contest";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ContestDetail = () => {
  const [value, setValue] = React.useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  if(!state && !state?.game && state?.mid && state?.cid) navigate('/');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["contest-details", state?.game, state?.mid, state?.cid],
    queryFn: () => fetchDataFromApi("/contest-details", { game : state?.game, mid : state?.mid, cid : state?.cid }), // pass a reference to fetchData, not the result of its invocation
    staleTime: 60 * 1000,
  });

  return (
    <ContentWrapper>
      <TopBarTeamDetail
        name1={ isLoading ? state?.team1_name :
          data?.matchDetails?.teama?.short_name ||
          data?.matchDetails?.teams?.home?.abbr ||
          data?.matchDetails?.teams?.home?.shortname
        }
        name2={ isLoading ? state?.team2_name :
          data?.matchDetails?.teamb?.short_name ||
          data?.matchDetails?.teams?.away?.abbr ||
          data?.matchDetails?.teams?.home?.shortname
        }
        time={
          isLoading ? state?.time :
          data?.matchDetails?.timestamp_start ||
          data?.matchDetails?.timestampstart
        }
      />

      {/* {isLoading ? (
        <p className="text-white"> Loading...</p>
      ) : ( */}
        <div className={styled.main_wrapper}>
          <div className={styled.top_wrapper}>
            <p className={styled.txt1}>Prize Pool </p>
            <p className={styled.txt2}>
              {data?.contestDetails?.pool_prize_string}
            </p>
            <div className="w-full rounded-full h-[8px] mt-[12px] bg-[#2B2C35] ">
              <div
                className=" h-[8px] rounded-full bg-[#FFBA4F]"
                style={{
                  width: `${
                    (data?.contestDetails?.fill_entries * 100) /
                      data?.contestDetails?.total_entries || 0
                  }%`,
                }}
              ></div>
            </div>
            <div className={styled.progress_data_wrapper}>
              <p className={styled.left_spot}>
                {data?.contestDetails?.total_entries -
                  data?.contestDetails?.fill_entries || 0}{" "}
                spots left
              </p>
              <p className={styled.total_slot}>
                {data?.contestDetails?.total_entries} spots
              </p>
            </div>
            <button type="button" className="button-blue-full mt-[20px]" onClick={()=> navigate(`/create-team`, { replace: false,  state: { game : state?.game, cid : state?.cid, mid : data?.matchDetails?.match_id || data?.matchDetails?.mid , team1_name : data?.matchDetails?.teama?.short_name || data?.matchDetails?.teams?.home?.abbr || data?.matchDetails?.teams?.home?.shortname, team2_name : data?.matchDetails?.teamb?.short_name || data?.matchDetails?.teams?.away?.abbr || data?.matchDetails?.teams?.away?.shortname, time : data?.matchDetails?.timestamp_start || data?.matchDetails?.timestampstart }  })}>
              Join ₹{data?.contestDetails?.entry_amount}
            </button>
          </div>
          <div className={styled.wrapper1}>
            <SvgIcon
              iconName={contest.icon1}
              className={styled.wrapper1_icon}
            />
            <p className={styled.wrapper1_txt}>
              ₹{data?.contestDetails?.league_prize[0]?.prize_amt}
            </p>

            <SvgIcon
              iconName={contest.icon2}
              className={styled.wrapper1_icon2}
            />
            <p className={styled.wrapper1_txt}>
              {(
                (data?.contestDetails?.total_winners_count * 100) /
                data?.contestDetails?.total_entries
              ).toFixed(0)}
              %
            </p>

            <SvgIcon
              iconName={contest.icon3}
              className={styled.wrapper1_icon}
            />
            <p className={styled.wrapper1_txt}>
              &nbsp;Upto {data?.contestDetails?.max_entry}
            </p>

            {data?.contestDetails?.confirm_league && (
              <>
                <SvgIcon
                  iconName={contest.icon4}
                  className={styled.wrapper1_icon1}
                />
                <p className={styled.wrapper1_txt1}>&nbsp;Guaranteed</p>
              </>
            )}
          </div>
          <div className={styled.wrapper2}>
            <Box sx={{ width: "100%", marginTop: "0px",  }}>
              <Box sx={{ display : 'flex' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    padding : '16px',
                    ".Mui-selected": {
                      color: `#5777E5`,
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#5777E5",
                      borderRadius: "10px",
                      height: "4px",
                    },
                  }}
                >
                  <Tab
                    label="Winnings"
                    {...a11yProps(0)}
                    sx={{ color: "#F2F5FF", textTransform: "capitalize", marginRight: "10px"}}
                    className={styled.tab_text}
                  />
                  <Tab
                    label="Leaderboard"
                    {...a11yProps(1)}
                    sx={{ color: "#F2F5FF", textTransform: "capitalize" }}
                    className={styled.tab_text}
                  />
                </Tabs>
              </Box>
              <div className={styled.custom_pannel_wrapper}>
                <CustomTabPanel value={value} index={0} >
                <div className={styled.winning_head_wrapper}>
                  <p className={styled.rank_txt}>Rank</p>
                  <p className={styled.winning_txt}>Winning</p>
                </div>
                <div className={styled.hr1}></div>
                <div className={styled.winning_list}>
                  {data?.contestDetails?.league_prize.map((item, index) => (
                    <div key={index}>
                      <div className={styled.winning_item}>
                        <p className={styled.rank}>
                          #
                          {item?.rank_from === item?.rank_to
                            ? item?.rank_from
                            : `${item?.rank_from} - ${item?.rank_to}`}
                        </p>
                        <p className={styled.winning}>₹{item?.prize_amt}</p>
                        
                      </div>
                      <div className={styled.hr2}></div>
                    </div>
                  ))}
                  


                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <p className={styled.all_team_count}>All Teams (4045)</p>
                <div className={styled.hr1}></div>
                <div className={styled.leaderboard_list}>
                  <div className={styled.leaderboard_item}>
                    <img
                      src={
                        "data:image/png;base64,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"
                      }
                      alt="profile"
                      width={28}
                      height={28}
                      className={styled.avatar}
                    />
                    <p className={styled.name}>PRAMOD2356</p>
                    <p className={styled.team}>T1</p>
                  </div>
                  <div className={styled.hr2}>&nbsp;</div>
                </div>
              </CustomTabPanel>
              </div>
              
            </Box>
          </div>
        </div>
      {/* )} */}
    </ContentWrapper>
  );
};

export default ContestDetail;
