"use client";
import React from "react";
import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { common } from "@/assets/svgcode";

const iconName = common.icon11;
const Button3 = ({ route, src, title, desc }) => {
  return (
    <>
      <Link href={route ? route : "/"} className="main-btn-3">
        <div className="btn-image-wrapper">
          <div className="btn-circle">
            <Image src={src} width={28} height={28} alt="icon" className="btn-icon"/>
          </div>
        </div>
        <div className="button-content-wrapper">
          <p className="title">{title}</p>
          <p className="desc">{desc}</p>
        </div>
        <span
          className="right-arrow"
          dangerouslySetInnerHTML={{ __html: iconName }}
        />
      </Link>
    </>
  );
};

export default Button3;

// <button type={type} className={className} onClick={onClick}>{name}</button>
