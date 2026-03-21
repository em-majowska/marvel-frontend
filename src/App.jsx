import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Comic from "./pages/Comic/Comic";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import axios from "axios";
import Account from "./pages/Account/Account";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("mut") || null);

  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [favourites, setFavourites] = useState(Cookies.get("fav") || []);

  const handleToken = (token) => {
    if (token) {
      setUserToken(token);
      Cookies.set("mut", token, { expires: 7 });
    } else {
      setUserToken(token);
      Cookies.remove("mut");
    }
  };

  // fetch favourites on page load if user is logged in
  useEffect(() => {
    if (userToken) {
      const fetchFavourites = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_BASE_URL + "/user/favourites",
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
          );

          setFavourites(response.data.favourites);
        } catch (error) {
          error.message && console.log(error.message);
          error.response && console.log(error.response.data.message);
        }
      };

      fetchFavourites();
    }
  }, [userToken]);

  const toggleFavourites = async (obj) => {
    const apiUrl = import.meta.env.VITE_BASE_URL;

    // set favourites state
    if (favourites.find((el) => el._id === obj._id)) {
      setFavourites(favourites.filter((el) => el._id !== obj._id));
    } else {
      setFavourites([...favourites, obj]);
    }

    // sync with DB
    try {
      await axios.put(
        `${apiUrl}/user/modify`,
        {
          favourites: obj,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.data);
    }
  };

  return (
    <>
      <Router className="App">
        <Header
          userToken={userToken}
          handleToken={handleToken}
          setSignupVisible={setSignupVisible}
          setLoginVisible={setLoginVisible}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="/character/:id"
            element={
              <Character
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="/comic/:id"
            element={
              <Comic
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            }
          />
          <Route
            path="*"
            element={
              <main className="container">
                <div className="error404">
                  <MdError /> <h1>Not found</h1>
                </div>
              </main>
            }
          />
        </Routes>
        {signupVisible && (
          <SignupModal
            setSignupVisible={setSignupVisible}
            setLoginVisible={setLoginVisible}
            handleToken={handleToken}
          />
        )}
        {loginVisible && (
          <LoginModal
            setLoginVisible={setLoginVisible}
            setSignupVisible={setSignupVisible}
            handleToken={handleToken}
          />
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;

// TODO image quality change on query

// TODO scheleton
// responsiveness
// auto-completion for search input
