import "../../assets/css/DedicatedPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import sliceText from "../../utils/sliceText";
import purifyStr from "../../utils/purifyStr";
import Cookies from "js-cookie";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { motion } from "motion/react";

const Comic = ({ favourites, toggleFavourites }) => {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("mut");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comic/${id}`);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="comic-page">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: "linear",
        }}>
        <section className="hero">
          <div className="hero-image pseudo">
            <img
              src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
              alt=""
            />
          </div>
          <div className="heading-container">
            <div className="container">
              <div className="thumbnail">
                <img
                  src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                  alt="comic image"
                />
                {token && favourites && (
                  <button onClick={() => toggleFavourites(comic)}>
                    {favourites.find((el) => el._id === comic._id) ? (
                      <MdFavorite className="fav" />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </button>
                )}
              </div>

              <div className="heading-text">
                <Link
                  to="#"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(-1);
                  }}>
                  <span>&#8592;</span> Go Back
                </Link>
                <h1 className="heading">
                  {comic.title.length > 15
                    ? sliceText(comic.title, 22)
                    : comic.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </section>
      </motion.div>
      <div className="container">
        <aside className="data">
          <p>{comic.title}</p>
          <p
            className="description"
            dangerouslySetInnerHTML={purifyStr(comic.description)}></p>
        </aside>
      </div>
    </main>
  );
};

export default Comic;
