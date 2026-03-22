import { IoLogIn } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({
  setSignupVisible,
  setLoginVisible,
  userToken,
  handleToken,
  setFavourites,
  isOpen,
  toggleMenu,
}) => {
  const navigate = useNavigate();

  return (
    <nav className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          {location.pathname === "/comics" ? (
            <Link to="/comics" onClick={toggleMenu} className="selected">
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
            <Link to="/characters" onClick={toggleMenu} className="selected">
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
              <Link to="/account" onClick={toggleMenu} className="account">
                ACCOUNT
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
