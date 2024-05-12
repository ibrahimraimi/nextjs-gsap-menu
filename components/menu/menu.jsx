"use client";

import * as React from "react";

import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

import "./menu.css";

/* The `menuLinks` constant is an array of objects that stores information about the menu links for the
navigation menu in the React component. Each object in the array represents a menu link and contains
two properties: `path` which specifies the URL path the link should navigate to, and `label` which
represents the text label displayed for that link in the menu. This array is used to dynamically
generate the menu links in the rendered component based on the data provided in each object. */

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/craft", label: "Craft" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  /* The code snippet `const container = React.useRef();` is creating a reference to a DOM element within
the functional component `Menu`. This reference is stored in the `container` variable and can be
used to access and manipulate the DOM element in React. */
  const container = React.useRef();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  /* The line `const tl = React.useRef();` is creating a reference to a mutable object that persists
across re-renders in a functional component using React's `useRef` hook. In this specific case, `tl`
is being used to store a reference to a GSAP timeline object within the `Menu` component. This
allows the component to access and manipulate the GSAP timeline instance across different component
renders without triggering a re-render. */
  const tl = React.useRef();

  /* This code snippet is utilizing the `useGSAP` hook and the `useEffect` hook in a React functional
component to create a menu animation using GSAP (GreenSock Animation Platform) library. */
  useGSAP(
    () => {
      gsap.set(".menu__link__item__holder", { y: 100 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu__overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu__link__item__holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  React.useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  /**
   * The function `toggleMenu` toggles the value of `isMenuOpen` between true and false.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu__container" ref={container}>
      <div className="menu__bar">
        <div className="menu__logo">
          <Link href="/">Havvana</Link>
        </div>
        <div className="menu__open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>
      <div className="menu__overlay">
        <div className="menu__overlay__bar">
          <div className="menu__logo">
            <Link href="/">Havvana</Link>
          </div>
          <div className="menu__close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="menu__copy">
          <div className="menu__links">
            {menuLinks.map((link, index) => (
              <div className="menu__link__item" key={index}>
                <div className="menu__link__item__holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu__link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu__info">
            <div className="menu__info__col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">GitHub &#8599;</a>
              <a href="#">Discord &#8599;</a>
            </div>
            <div className="menu__info__col">
              <p>info@havvana.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
