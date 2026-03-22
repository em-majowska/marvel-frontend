import axios from "axios";
import { useEffect, useState } from "react";
import { FaExclamation, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { IoAddOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const SignupModal = ({ setSignupVisible, setLoginVisible, handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [previewPicture, setPreviewPicture] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const currentPosition = window.pageYOffset;
    window.scrollTo({ top: 0 });

    return () => {
      document.body.style.overflow = "unset";
      window.scrollTo({ top: currentPosition });
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", avatar);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/user/signup",
        formData,
      );

      handleToken(response.data.token);
      setCompleted(true);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="modal-root signup"
      onClick={() => {
        setSignupVisible(false);
      }}>
      <section
        className="modal container"
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <div className="top-bar"></div>
        <button
          className="close-btn"
          onClick={() => {
            setSignupVisible(false);
          }}>
          <MdClose />
        </button>
        {completed ? (
          <>
            <h1>Welcome {username}</h1>
            <p>You can now browse through your favourite heroes !</p>
            <button
              className="btn btn-secondary"
              onClick={() => setSignupVisible(false)}>
              Continue
            </button>
          </>
        ) : (
          <>
            <h1>Sign up</h1>
            <p className="heading-bottom">Join the universe</p>
            <div className="baseline">Create your hero account</div>
            <form onSubmit={handleSubmit}>
              <section>
                <div className="file-wrapper">
                  {previewPicture && (
                    <img src={previewPicture} alt="" className="preview" />
                  )}
                  <label htmlFor="avatar" className="file">
                    <IoAddOutline /> Add your avatar
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      onChange={(event) => {
                        // preview
                        const objectUrl = URL.createObjectURL(
                          event.target.files[0],
                        );
                        setPreviewPicture(objectUrl);

                        setAvatar(event.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </section>
              <label htmlFor="name">
                <FaRegUser />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. AmazingSpider1992"
                  value={username}
                  onChange={(event) => {
                    handleChange(event, setUsername);
                  }}
                  required
                />
                <FaExclamation className="invalid" />
              </label>
              <label htmlFor="email">
                <FaRegEnvelope />
                <input
                  type="email"
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
                  // pattern="^.*(?=.{7,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$"
                  // minlenght="7"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    handleChange(event, setPassword);
                  }}
                  required
                />
                <FaExclamation className="invalid" />
              </label>
              <span>
                Use at least 7 characters, including 1 letter and 1 digit.
              </span>

              <button className="btn btn-primary">Create Account</button>
              {errorMessage && (
                <div className="error">
                  <FaExclamation /> <p>{errorMessage}</p>
                </div>
              )}
            </form>
            <a
              onClick={() => {
                setSignupVisible(false);
                setLoginVisible(true);
              }}>
              Already have an account? <span>Sign in!</span>
            </a>
          </>
        )}
      </section>
    </div>
  );
};

export default SignupModal;
