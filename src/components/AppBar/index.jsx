import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { useState, lazy, Suspense } from "react";
import { AppBar, Toolbar } from "@mui/material";
const LazyWalletDropDown = lazy(() => import("../DropDown/WalletDropDown"));

const AppbarTop = () => {
  console.log("render appbar");
  const [visible, setVisible] = useState(false);

  const openWallet = () => {
    setVisible(!visible);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "var(--primary-60-base)",
          maxWidth: "var(--maxWidth)",
          width: "100%",
          justifyContent: "center",
          left: "0",
          height: "50px",
          "@media (min-width: 1024px)": {
            borderRadius: "10px 10px 0px 0px",
            left: "10px",
            top: "10px",
          },
        }}
      >
        <Toolbar>
          <img
            src="/images/profile.jpg"
            alt="profile"
            style={{ borderRadius: "10px", width: 30, height: 30 }}
          />
          <AccountBalanceWalletOutlinedIcon
            width={18}
            height={18}
            sx={{
              flexDirection: "right",
              marginLeft: "auto",
              marginRight: "10px",
            }}
            onClick={() => openWallet()}
          />
          <NotificationsNoneIcon sx={{ marginLeft: "20px" }} />
        </Toolbar>
      </AppBar>
      <Suspense >
        {visible ? <LazyWalletDropDown isMenuOpen={visible} /> : null}
      </Suspense>
    </>
  );
};

export default React.memo(AppbarTop);
