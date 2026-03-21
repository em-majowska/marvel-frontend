import "./Character.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListComics from "../../components/ListComics";
import Pagination from "rc-pagination";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Character = ({ favourites }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [totalItems, setTotalItems] = useState(0);

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
      <section className="hero">
        <div className="hero-image pseudo">
          <img
            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            alt="hero image"
          />
        </div>
        <div className="heading-container">
          <Link to="/characters">
            <span>&#8592;</span> Back to Characters
          </Link>
          <h1 className="heading">{character.name}</h1>
        </div>
      </section>
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
        />
      </div>
    </main>
  );
};

export default Character;
