import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

// Navigation items for the header
const headerNav = [
  { display: "Home", path: "/" },
  { display: "Movies", path: "/movie" },
  { display: "TV Series", path: "/tv" },
];

const Header = () => {
  const { pathname } = useLocation(); // Gets the current path to highlight active link
  const headerRef = useRef(null); // Reference to the header element

  // States to track previous scroll position, header visibility, shrink state, and if header has scrolled out of view
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true); // Controls the visibility of the header
  const [shrink, setShrink] = useState(false); // Controls shrink effect on header
  const [hasScrolledOut, setHasScrolledOut] = useState(false); // Tracks if header has fully scrolled out

  // Function to handle scrolling and update header visibility based on scroll direction
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const isScrollingUp = prevScrollPos > currentScrollPos;

    // Only show/hide header if it has scrolled out of view
    if (hasScrolledOut) {
      setVisible(isScrollingUp || currentScrollPos < 170);
    }

    // Update previous scroll position
    setPrevScrollPos(currentScrollPos);

    // Update if header is fully out of view
    if (currentScrollPos > headerRef.current.clientHeight) {
      setHasScrolledOut(true);
    } else {
      setHasScrolledOut(false);
    }
  }, [prevScrollPos, hasScrolledOut]);

  // Function to show the header when the mouse moves close to the top of the screen
  const handleMouseMove = useCallback((e) => {
    if (e.clientY < 5 && hasScrolledOut) {
      setVisible(true);
      setShrink(true); // Show the header in "shrink" mode when mouse is near the top
    }
  }, [hasScrolledOut]);

  // Effect to apply the shrink effect to the header based on scroll position
  useEffect(() => {
    const shrinkHeader = () => {
      setShrink(window.scrollY > 100);
    };
    window.addEventListener("scroll", shrinkHeader);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  // Function to manage scroll and mousemove event listeners based on screen width
  const updateScrollListener = useCallback(() => {
    if (window.innerWidth >= 600) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      // Remove listeners on smaller screens
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleScroll, handleMouseMove]);

  // Effect to set up and clean up event listeners for scroll, resize, and mousemove
  useEffect(() => {
    updateScrollListener();
    window.addEventListener("resize", updateScrollListener);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollListener);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updateScrollListener, handleScroll, handleMouseMove]);

  // Find the index of the active navigation item based on the current path
  const active = headerNav.findIndex((e) => e.path === pathname);

  return (
    <div
      ref={headerRef}
      className={`header ${visible ? "visible" : "hidden"} ${shrink ? "shrink" : ""}`}
    >
      <div className="header__Wrap container">
        <div className="logo">
          <Link to="/">TrailerHub</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
