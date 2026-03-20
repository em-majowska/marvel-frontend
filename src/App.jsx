import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import { MdError } from "react-icons/md";
import Character from "./pages/Character/Character";
import Comic from "./pages/Comic/Comic";

function App() {
  return (
    <>
      <Router>
        <Header />
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
                  <MdError /> <h1>Page non trouvable</h1>
                </div>
              </main>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

// TODO add favourites
// TODO add descriptions to lists
// TODO add input
// TODO take care of unavaible pictures
// TODO image quality change on query

// TODO scheleton
// responsiveness
// auto-completion for search input
// DB (username, email, password, favouurites)
