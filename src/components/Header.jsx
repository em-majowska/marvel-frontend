import { Link, useLocation } from "react-router-dom";
import Hero from "./Hero";

const Header = () => {
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
              {/* <li>
                {location.pathname === "/" ? (
                  <Link to="/" className="selected">
                    HOME
                  </Link>
                ) : (
                  <Link to="/">HOME</Link>
                )}
              </li> */}
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
            </ul>
          </nav>
        </div>
      </div>
      {location.pathname === "/" && <Hero />}
    </header>
  );
};

export default Header;
