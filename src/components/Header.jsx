import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          MARVEL
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
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
    </header>
  );
};

export default Header;
