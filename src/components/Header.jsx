import { Link, useLocation, useNavigate } from "react-router-dom";
import Hero from "./Hero";
import { IoLogIn } from "react-icons/io5";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import "../assets/css/HamburgerMenu.css";

const Header = ({
  setSignupVisible,
  setLoginVisible,
  userToken,
  handleToken,
  setFavourites,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

            <nav className={`menu ${isOpen ? "open" : ""}`}>
              <ul>
                <li>
                  {location.pathname === "/comics" ? (
                    <Link
                      to="/comics"
                      onClick={toggleMenu}
                      className="selected">
                      COMICS
                    </Link>
                  ) : (
                    <Link to="/comics" onClick={toggleMenu}>
                      COMICS
                    </Link>
                  )}
                </li>
                <li>
                  {location.pathname === "/characters" ? (
                    <Link
                      to="/characters"
                      onClick={toggleMenu}
                      className="selected">
                      CHARACTERS
                    </Link>
                  ) : (
                    <Link to="/characters" onClick={toggleMenu}>
                      CHARACTERS
                    </Link>
                  )}
                </li>
                {!userToken ? (
                  <>
                    <li>
                      <button
                        className="signup"
                        onClick={() => {
                          toggleMenu();
                          setSignupVisible(true);
                        }}>
                        SINGUP
                      </button>
                    </li>
                    <li>
                      <button
                        className="login"
                        onClick={() => {
                          toggleMenu();
                          setLoginVisible(true);
                        }}>
                        <IoLogIn />
                        LOGIN
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        className="logout"
                        onClick={() => {
                          handleToken(null);
                          setFavourites(null);
                          toggleMenu();
                          navigate("/");
                        }}>
                        LOGOUT
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/account"
                        onClick={toggleMenu}
                        className="account">
                        ACCOUNT
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {location.pathname === "/" && <Hero />}
    </header>
  );
};

export default Header;
