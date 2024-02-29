// import { Carousel } from "@material-tailwind/react";
// import styles from './style.module.css'
// import './style.css'
// export default function HomeCarousel() {
//   return (
//     <div className="p-[16px]">
//       <Carousel className="rounded-xl" prevArrow={false} nextArrow={false} autoplay={false} autoplayDelay={1500} loop={true} >
//       <img
//         src="https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1686542318T10-Fever-Is-ON-(10-06-2023).jpg"
//         alt="image 1"
//         className="h-[120px] w-full object-cover"
//       />
//       <img
//         src="https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1677064326customer-care(1).jpg"
//         alt="image 2"
//         className="h-[120px] w-full object-cover"
//       />
//       <img
//         src="https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/167904605511-wickets-slider-banner(1).jpg"
//         alt="image 3"
//         className="h-[120px] w-full object-cover"
//       />
//       </Carousel>
//     </div>
//   );
// }

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import './style.css';

export default function HomeCarousel(){

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
    {image: "https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1686542318T10-Fever-Is-ON-(10-06-2023).jpg",},
    {image:"https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1677064326customer-care(1).jpg"},
    {image:"https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/167904605511-wickets-slider-banner(1).jpg"},
    {image:"https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1676545683Earn-each-referral-(16-02-2023)-1.jpg"},
    {image:"https://11wicketsbucket.s3.ap-south-1.amazonaws.com/elewk/sliders/1684394215Unleash-your-luck,-invest-nothing!ind.jpg"}
  ]


  return (
    <Carousel className="h-[100px]" 
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2500}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass=""
      renderDotsOutside={false}
      rewindWithAnimation={true}
     
    //   customDot = {<p>1</p>} 
    >
      {
        ImageList?.map((item, index)=>(
          <div className="crausel-wrapper"  key={index}>
            <img
              src={item.image}
              alt={'image slider'}
              className="crausel-image"
            />
          </div>
        
        ))
      }

    </Carousel>
  );
};


