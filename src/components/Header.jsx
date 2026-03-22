import { Link, useLocation } from "react-router-dom";
import Hero from "./Hero";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import "../assets/css/Navigation.css";
import Navigation from "./Navigation";
import { AnimatePresence, motion } from "motion/react";

const Header = ({
  setSignupVisible,
  setLoginVisible,
  userToken,
  handleToken,
  setFavourites,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      const desktopQuery = window.matchMedia("(min-width: 590px)");
      setIsDesktop(desktopQuery.matches);

      if (desktopQuery.matches) {
        setIsOpen(true);
      }
    };

    checkIfDesktop();

    window.addEventListener("resize", checkIfDesktop);

    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);
  const toggleMenu = () => {
    if (!isDesktop) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header>
      <div className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            MARVEL
          </Link>
          <div className="hamburger-container">
            {isOpen ? (
              <button
                className={"hamburger open"}
                onClick={toggleMenu}
                aria-label="Toggle menu">
                <MdClose />
              </button>
            ) : (
              <button
                className={"hamburger close"}
                onClick={toggleMenu}
                aria-label="Toggle menu">
                <GiHamburgerMenu />
              </button>
            )}
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  initial={{ left: "100%" }}
                  animate={{ left: "0%" }}
                  exit={{ left: "100%" }}
                  transition={{ duration: 0.3 }}
                  className={"menu"}>
                  <Navigation
                    setSignupVisible={setSignupVisible}
                    setLoginVisible={setLoginVisible}
                    userToken={userToken}
                    handleToken={handleToken}
                    setFavourites={setFavourites}
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                  />
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {location.pathname === "/" && <Hero />}
    </header>
  );
};

export default Header;
