"use client";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import React from "react";
import style from './style.module.css';
import '../common.css';

const BoardingCrausel = () => {
  const deviceType = "mobile";
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const ImageList = [
    {
      image:
        "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1686542318T10-Fever-Is-ON-(10-06-2023).jpg",
    },
    {
      image:
        "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1677064326customer-care(1).jpg",
    },
    {
      image:
        "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/167904605511-wickets-slider-banner(1).jpg",
    },
    {
      image:
        "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1676545683Earn-each-referral-(16-02-2023)-1.jpg",
    },
    {
      image:
        "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1684394215Unleash-your-luck,-invest-nothing!ind.jpg",
    },
  ];

  return (
    <Carousel
      className="h-[100px] mx-[16px]"
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      renderDotsOutside={true}
      rewindWithAnimation={true}

      //   customDot = {<p>1</p>}
    >
      {ImageList?.map((item, index) => (
        <div className="items flex" key={index}>
            <p className={style.title}>Join Exciting Contests</p>
          <img
            key={index}
            src={item.image}
            alt={"image slider"}
            
            // loading="lazy"
         
            style={{
              width: "100%",
              height: "100px",
              borderRadius: "16px",
              background:"transparent",
            }}
            
          />
        </div>
      ))}
    </Carousel>
  );
};

export default BoardingCrausel;
