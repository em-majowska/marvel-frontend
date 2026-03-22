import axios from "axios";
import { useEffect, useState } from "react";
import { FaExclamation, FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const LoginModal = ({
  setSignupVisible,
  setLoginVisible,
  handleToken,
  setFavourites,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const currentPosition = window.pageYOffset;
    window.scrollTo({ top: 0 });

    return () => {
      document.body.style.overflow = "unset";
      window.scrollTo({ top: currentPosition });
    };
  }, []);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/user/login",
        { email: email, password: password },
      );
      setFavourites(response.data.favourites);

      handleToken(response.data.token);
      setCompleted(true);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && setErrorMessage(error.response.data.message);
    }
  };

  return (
    <section
      className="modal container"
      onClick={(event) => {
        event.stopPropagation();
      }}>
      <div className="top-bar"></div>
      <button
        className="close-btn"
        onClick={() => {
          setLoginVisible(false);
        }}>
        <MdClose />
      </button>
      {completed ? (
        <>
          <h1>Welcome</h1>
          <p>You can now browse through your favourite heroes !</p>
          <button
            className="btn btn-secondary"
            onClick={() => setLoginVisible(false)}>
            Continue
          </button>
        </>
      ) : (
        <>
          <h1>Marvel</h1>
          <p className="heading-bottom">Welcome Back</p>
          <div className="baseline">Sign in to access your collection</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <FaRegUser />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => {
                  handleChange(event, setEmail);
                }}
                required
              />
              <FaExclamation className="invalid" />
            </label>
            <label htmlFor="password">
              <IoLockClosedOutline />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  handleChange(event, setPassword);
                }}
                required
              />
              <FaExclamation className="invalid" />
            </label>

            <button className="btn btn-primary">Sign In</button>
            {errorMessage && (
              <div className="error">
                <FaExclamation /> <p>{errorMessage}</p>
              </div>
            )}
          </form>
          <a
            onClick={() => {
              setLoginVisible(false);
              setSignupVisible(true);
            }}>
            Don't have an account? <span>Sign up!</span>
          </a>
        </>
      )}
    </section>
  );
};

export default LoginModal;
