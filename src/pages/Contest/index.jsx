import React, { useEffect, useState } from "react";
import TopBarTeamDetail from "../../components/TopBarTeamDetail";
import ContentWrapper from "../../components/ContentWrapper";
import TabRounded from "../../components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import style from "./style.module.css";
import Contest1 from "../../components/Contest/Contest1";
import SvgIcon from "../../components/SvgIcon";
import { contest } from "../../assets/SvgCodes/Contest";
import Contest_Card from "../../components/Contest/Contest_Card";
import FilterDialog from "../../components/Contest/Contest_Main_Dialog";
import { useNavigate, useParams } from "react-router-dom";

const MemoizedTopBarTeamDetail = React.memo(TopBarTeamDetail);
const MemoizedTabRounded = React.memo(TabRounded);
const MemoizedFilterDialog = React.memo(FilterDialog);

const Contest = () => {
  const navigate = useNavigate();
  const { game, mid } = useParams();

  useEffect(() => {
    // Access the 'game' and 'mid' parameters
    console.log("Game:", game);
    console.log("Mid:", mid);

    // Additional logic based on the 'game' and 'mid' values
  }, [game, mid]);
  // const state = JSON.parse(localStorage.getItem('state'));
  // useEffect(() => {
  //   if(!state?.game || !state?.mid) navigate("/")
  // },[state])
  const state = {}
  
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredContests, setFilteredContests] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(null);
  const [entryFilters, setEntryFilters] = useState([null]);
  const [filter, setFilter] = useState([
    { name: "Entry", field: "entry_amount", ascending: false, id: 1 },
    { name: "Spots", field: "total_entries", ascending: false, id: 2 },
    { name: "Prize Pool", field: "pool_prize_amount", ascending: false, id: 3 },
    { name: "% Winner", field: "total_winners_count", ascending: false, id: 4 },
  ]);

  const handleOpen = () => setOpen(!open);

  const handleFilterButtonClick = (position) => {
    setSelectedFilter(position + 1);
    setIsFilterApplied(true);
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
    const sortedItems = data?.items
      ?.flatMap((item) => item.items)
      .sort((a, b) => {
        if (ascending) {
          return a[field] - b[field];
        } else {
          return b[field] - a[field];
        }
      });
    setFilteredContests(sortedItems);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["contest", game, mid, activeTab + 1],
    queryFn: () =>
      fetchDataFromApi("/contest", {
        game: game,
        mid: mid,
        type: activeTab + 1,
      }), // pass a reference to fetchData, not the result of its invocation
    staleTime: 20 * 1000,
  });

  const handleTabChange = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const clearFilter = () => {
    setFilteredContests([]);
    setSelectedFilter(null);
    setIsFilterApplied(false);
    setAppliedFilters([]);
    setEntryFilters([null]);
  };

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
  };

  useEffect(() => {
    if (appliedFilters.length > 0) {
      setIsFilterApplied(true);
      let sortedAndFilteredItems;
      sortedAndFilteredItems = data?.items?.flatMap((item) => item.items)
        .sort((a, b) => selectedFilter !== null && filter[selectedFilter]?.ascending
          ? a[filter[selectedFilter].field] - b[filter[selectedFilter].field]
          : b[filter[selectedFilter].field] - a[filter[selectedFilter].field]);

      const filteredItems = sortedAndFilteredItems.filter((contest) =>
        appliedFilters.every((criteria) => {
          const value = contest[criteria.field];
          return value >= criteria.min && value <= criteria.max;
        })
      );

      setFilteredContests(filteredItems);
    }
  }, [appliedFilters, selectedFilter, filter, data]);

  const nextPage = (item) => {
    navigate(`/contest-details`)
    localStorage.setItem('state', JSON.stringify({
      game: state?.game,
      cid: item?._id,
      mid:
        data?.matchDetails?.match_id ||
        data?.matchDetails?.mid,
      team1_name:
        data?.matchDetails?.teama?.short_name ||
        data?.matchDetails?.teams?.home?.abbr ||
        data?.matchDetails?.teams?.home?.shortname,
      team2_name:
        data?.matchDetails?.teamb?.short_name ||
        data?.matchDetails?.teams?.away?.abbr ||
        data?.matchDetails?.teams?.away?.shortname,
      time:
        data?.matchDetails?.timestamp_start ||
        data?.matchDetails?.timestampstart,
    }))
  }


  return (
    <ContentWrapper className="relative">
      <MemoizedTopBarTeamDetail
        name1={
          isLoading
            ? state?.team1_name
            : data?.matchDetails?.teama?.short_name ||
              data?.matchDetails?.teams?.home?.abbr ||
              data?.matchDetails?.teams?.home?.shortname
        }
        name2={
          isLoading
            ? state?.team2_name
            : data?.matchDetails?.teamb?.short_name ||
              data?.matchDetails?.teams?.away?.abbr ||
              data?.matchDetails?.teams?.home?.shortname
        }
        time={
          isLoading
            ? state?.time
            : data?.matchDetails?.timestamp_start ||
              data?.matchDetails?.timestampstart
        }
      />

      <MemoizedTabRounded
        data={[
          { name: "Contests", value: 0 },
          { name: "My Contests", value: 1, span: 2 },
          { name: "My Teams", value: 2, span: 1 },
        ]}
        className={style.tab_round}
        className2={"grid-cols-3"}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />

      {activeTab === 0 ? (
        <>
          <div className={style.filter_wrapper}>
            <p className={style.sort_by_title}>Sort By :</p>
            <div className={style.filter_wrapper_items}>
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
            </div>
            <SvgIcon
              iconName={contest?.icon6}
              className={"cursor-pointer"}
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
          {isFilterApplied ? (
            <div className={style.filter_hint_wrapper}>
              <p className={style.filter_hint_text}>
                {filteredContests?.length} contests
              </p>
              <p className={style.filter_hint_text}>
                {selectedFilter >= 1 && entryFilters?.length > 1
                  ? `1 Sort & ${entryFilters?.length - 1} Filters `
                  : selectedFilter >= 1
                  ? "1 Sort "
                  : entryFilters?.length > 0
                  ? `${entryFilters?.length - 1} Filters `
                  : ""}{" "}
                applied <span onClick={clearFilter}>CLEAR</span>
              </p>
            </div>
          ) : null}
        </>
      ) : null}

      {activeTab === 0 ? (
        // <div className={style.container}>
        <div className="scroll_y">
          <div className={style.float_container}>
            <div className={style.contest_float}>
              <SvgIcon
                iconName={contest?.icon2}
                className={"-translate-y-[0.6px]"}
              />

              <button className={style.txt} onClick={handleOpen}>
                Contest
              </button>
              <div className={style.hr}>&nbsp;</div>
              <SvgIcon
                iconName={contest?.icon3}
                className={"-translate-y-[0.6px] mr-[2px]"}
              />
              <p className={style.txt}>Create Team</p>
            </div>
          </div>

          <div className={`${style.contest_wrapper} `}>
            {isFilterApplied ? (
              filteredContests.map((item, index) => (
                <Contest_Card
                  data={item}
                  key={index}
                  onClick={() => nextPage(item)}
                />
              ))
            ) : data ? (
              <Contest1 data={data} game={state?.game} />
            ) : (
              <div role="status" className="max-w-[var(--maxWidth)] animate-pulse mt-[20px] ">
                <div className="bg-gray-400 rounded-[10px] pt-[16px]">
                  <div className="flex justify-between px-[16px]">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-4" />
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-4" />
                  </div>

                  <div className="flex justify-between px-[16px]">
                    <div className="">
                        <div className="h-2.5 bg-gray-200  dark:bg-gray-700 w-[40px] mb-1" />
                        <div className="h-[15px] bg-gray-200  dark:bg-gray-700 w-[40px] mb-4" />
                    </div>
                    <div className="h-[20px] bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mb-4" />
                  </div>
                 
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 m-[16px]" />
                  <div className="flex justify-between px-[16px]">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-4" />
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-4" />
                  </div>
                  <div className="h-[25px] bg-gray-200 rounded-b-[10px] dark:bg-gray-700 " />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : // </div>
      activeTab === 1 ? (
        <div className="mt-[250px]"></div>
      ) : (
        <div></div>
      )}

      <MemoizedFilterDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onFilterApply={handleFilterApply}
        entryFilters={entryFilters}
        setEntryFilters={setEntryFilters}
      />

      {open ? (
        <div
          className={style.contest_popover_container_wrapper}
          onClick={handleOpen}
        >
          <div className={style.contest_popover_container}>
            <div className={style.top_items_wrapper}>
              <SvgIcon iconName={contest?.icon9} /> <p>Create a contest</p>{" "}
              <SvgIcon iconName={contest?.icon11} className={"ml-auto"} />
            </div>
            <div className={style.top_items_wrapper}>
              <SvgIcon iconName={contest?.icon10} /> <p>Enter contest code</p>{" "}
              <SvgIcon iconName={contest?.icon11} className={"ml-auto"} />
            </div>
            <div className={style.hr}></div>

            <p className={style.contest_popover_category_title}>
              Contest Categories
            </p>

            <div className={style.contest_popover_category_wrapper}>
              {data?.items?.map((item, index) =>
                item?.items?.length > 0 ? (
                  <div
                    className={style.contest_popover_category_items}
                    key={index}
                  >
                    <p
                      className={
                        item?.title === "Mega Contest"
                          ? style.active
                          : style.inactive
                      }
                    >
                      {item?.title}
                    </p>
                    <p
                      className={
                        item?.title === "Mega Contest"
                          ? style.active
                          : style.inactive
                      }
                    >
                      {item?.items?.length}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      ) : null}
    </ContentWrapper>
  );
};

export default Contest;
