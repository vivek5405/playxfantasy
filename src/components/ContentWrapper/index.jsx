import React from "react";

const ContentWrapper = ({ children, classname }) => {
  return (
    <div className="app-main min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 " >
      <div className="main-content-wrapper  lg:shadow-md bg-[#161720] relative">
        {children}
      </div>
      <div className="right-content-wrapper hidden lg:block bg-red-200" >right</div>
    </div>
  );
};

export default ContentWrapper;