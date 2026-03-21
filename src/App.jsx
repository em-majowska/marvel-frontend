import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useState } from "react";
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

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("mut") || null);
  const [user, setUser] = useState(null);

  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  const handleToken = (token) => {
    if (token) {
      setUserToken(token);
      Cookies.set("mut", token, { expires: 7 });
    } else {
      setUserToken(token);
      Cookies.remove("mut");
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
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/comics" element={<Comics />} />
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
            setUser={setUser}
            user={user}
          />
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;

// TODO add favourites
// TODO image quality change on query

// TODO scheleton
// responsiveness
// auto-completion for search input
// DB (username, email, password, favouurites)
