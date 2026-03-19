import { Link } from "react-router-dom";
import Hero from "./Hero";

const Header = () => {
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
                <Link to="/" className="selected">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/characters">COMICS</Link>
              </li>
              <li>
                <Link to="/characters">CHARACTERS</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Hero />
    </header>
  );
};

export default Header;
