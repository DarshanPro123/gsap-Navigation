"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Menu.css";
import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/services", label: "Services" },
  { path: "/lab", label: "Lab" },
];

const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(()=>{
    gsap.set(".menu-link-item-holder", { y:75 });
    tl.current = gsap.timeline({paused:true}).to(".menu-overlay",
      {
        duration: 1.25,
        clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease:"power4.inOut", 
      }
    )
    .to(".menu-link-item-holder",{
      y:0,
      duration: 1,
      stagger:0.1,
      ease:"power4.out",
      delay:-0.75,
    })
  },{scope:container})


  useEffect(()=>{
    if(isMenuOpen){
      tl.current.play()
    }
    else{
      tl.current.reverse()
    }
  },[isMenuOpen])
  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">CodeerGurru</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>
          <GiHamburgerMenu />
          </p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo"></div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="menu-close-icon">
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Behance &#8599;</a>
              <a href="#">Dribbble &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@codderGurru.com</p>
              <p>2345 123 879</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>View Showreel</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
