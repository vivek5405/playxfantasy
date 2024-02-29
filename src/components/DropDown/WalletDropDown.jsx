import React, { Fragment, useState, useEffect, memo } from "react";
import "./style.css";
import SvgIcon from "../SvgIcon";
import { wallet } from "../../assets/SvgCodes/Wallet";
import { fetchDataFromApi } from "../../utils/fetchDataFromApi";
import { useQuery } from '@tanstack/react-query';

const WalletDropDown = React.memo(({ isMenuOpen}) => {
  // const [expanded, setExpanded] = useState(false);
  console.log("render wallet dropdown");

  const { data, isLoading } = useQuery({
    queryKey: ['balance'],
    queryFn: () => fetchDataFromApi('/api/balance', {}), // pass a reference to fetchData, not the result of its invocation
    staleTime: 2 * 60 * 1000,
  });

  return (
    <>
      {isMenuOpen ? (
        <div
          className={`style absolute top-[50px]  w-full max-w-[510px] origin-top-center bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none wallet-dropdown ${
           "initial"
          }`}
          style={{ borderRadius: "0 0 10px 10px", zIndex : "100" }}
        >
          <div className="section1">
            <div className="image-wrapper1">
              <img
                src={"/png/profile_btn/Referearn.png"}
                alt="icon1"
                className="image1"
              />
            </div>
            <div>
              <p className="total-balance-text">Total Balance</p>
              <p className="total-balance">
                ₹
                {(
                  data?.depositBalance +
                  data?.winningBalance +
                  data?.bonousBalance
                ).toFixed(2)}
              </p>
            </div>

            <button type="button" className="add-money-button">
              Add Money
            </button>
          </div>
          <div className="section2">
            <div className="list-item mt-[27px]">
              <div className="image-wrapper2">
                <img
                  src={"/png/df2dc10d09d06e99682aec34b2914716.png"}
                  alt="icon1"
                  className="image2"
                />
              </div>
              <div>
                <p className="list-text">Amount Added (Unutilized)</p>
                <p className="list-amount">
                  ₹{data?.depositBalance.toFixed(2)}
                </p>
              </div>
              <SvgIcon iconName={wallet.icon1} className={"ml-auto p-[2px]"} />
            </div>
            <div className="list-item mt-[10px]">
              <div className="image-wrapper2">
                <img
                  src={"/png/13e4c42fca4004a7ea23ff81c60d5d69.png"}
                  alt="icon1"
                  className="image2"
                />
              </div>
              <div>
                <p className="list-text">Winnings</p>
                <p className="list-amount">
                  ₹{data?.winningBalance.toFixed(2)}
                </p>
              </div>
              <SvgIcon iconName={wallet.icon1} className={"ml-auto p-[2px]"} />
            </div>
            <div className="list-item mt-[10px]">
              <div className="image-wrapper2">
                <img
                  src={"/png/7c718dc31184ba4ad82888c5de9b8644.png"}
                  alt="icon1"
                  className="image2"
                />
              </div>
              <div>
                <p className="list-text">Cash Bonus</p>
                <p className="list-amount">₹{data?.bonousBalance.toFixed(2)}</p>
              </div>
              <SvgIcon iconName={wallet.icon1} className={"ml-auto p-[2px]"} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default WalletDropDown;
