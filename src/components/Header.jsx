import { Link, useLocation } from "react-router-dom";
import Hero from "./Hero";
import { IoLogIn } from "react-icons/io5";

const Header = ({
  setSignupVisible,
  setLoginVisible,
  userToken,
  handleToken,
}) => {
  const location = useLocation();

  return (
    <header>
      <div className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            MARVEL
          </Link>
          <nav>
            <ul>
              <li>
                {location.pathname === "/comics" ? (
                  <Link to="/comics" className="selected">
                    COMICS
                  </Link>
                ) : (
                  <Link to="/comics">COMICS</Link>
                )}
              </li>
              <li>
                {location.pathname === "/characters" ? (
                  <Link to="/characters" className="selected">
                    CHARACTERS
                  </Link>
                ) : (
                  <Link to="/characters">CHARACTERS</Link>
                )}
              </li>
              {!userToken ? (
                <>
                  <li>
                    <button
                      className="signup"
                      onClick={() => setSignupVisible(true)}>
                      SINGUP
                    </button>
                  </li>
                  <li>
                    <button
                      className="login"
                      onClick={() => setLoginVisible(true)}>
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
                      onClick={() => handleToken(null)}>
                      LOGOUT
                    </button>
                  </li>
                  <li>
                    <Link
                      className="account"
                      onClick={() => setLoginVisible(true)}>
                      ACCOUNT
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {location.pathname === "/" && <Hero />}
    </header>
  );
};

export default Header;
