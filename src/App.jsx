import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" />
          <Route path="/characters" />
          <Route
            path="*"
            element={
              <main className="container">
                <div className="error404">
                  {/* <MdError /> <h1>Page non trouvable</h1> */}
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
