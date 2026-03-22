import "../../assets/css/DedicatedPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListComics from "../../components/ListComics";
import Pagination from "rc-pagination";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { motion } from "motion/react";
import Cookies from "js-cookie";

const Character = ({ favourites, toggleFavourites }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 30;
  const [totalItems, setTotalItems] = useState(0);
  const token = Cookies.get("mut");
  const { id } = useParams();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/character/${id}`);
        setCharacter(response.data);

        setTotalItems(response.data.comics.length);
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
    <main className="character-page">
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
              src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            />
          </div>
          <div className="heading-container">
            <div className="container">
              <div className="thumbnail">
                <img
                  src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                  alt="hero image"
                />
                {token && favourites && (
                  <button onClick={() => toggleFavourites(character)}>
                    {favourites.find((el) => el._id === character._id) ? (
                      <MdFavorite className="fav" />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </button>
                )}
              </div>
              <div className="heading-text">
                <Link to="/characters">
                  <span>&#8592;</span> Back to Characters
                </Link>
                <h1 className="heading">{character.name}</h1>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
      <div className="container">
        <aside className="data">
          <p>
            {/* cleaned from null */}
            {character.comics.filter((id) => id).length}
            <span>comics</span>
          </p>
          <p className="description">{character.description}</p>
        </aside>
        <ListComics
          dataToFetch={character.comics}
          fromCharacter={character._id}
          limit={limit}
          currentPage={currentPage}
          favourites={favourites}
        />
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalItems}
          prevIcon={<MdOutlineArrowBackIos />}
          nextIcon={<MdOutlineArrowForwardIos />}
          jumpNextIcon={<MdOutlineKeyboardDoubleArrowRight />}
          jumpPrevIcon={<MdOutlineKeyboardDoubleArrowLeft />}
          onChange={(pageNumber) => {
            setCurrentPage(pageNumber);
          }}
          hideOnSinglePage="true"
        />
      </div>
    </main>
  );
};

export default Character;
