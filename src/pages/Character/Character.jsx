import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListComics from "../../components/ListComics";

const Character = () => {
  const [character, setCharacter] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/character/${id}`);
        setCharacter(response.data);

        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.message);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="character-page">
      <section className="hero">
        <img
          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
          alt="hero image"
        />
        <div className="hero-text">
          <Link to="/characters">
            <span>&#8592;</span> Back to Characters
          </Link>
          <h1>{character.name}</h1>
        </div>
      </section>
      <div className="container">
        {" "}
        <section className="data">
          <p>
            {character.comics.length}
            <span>comics</span>
          </p>
        </section>
        <ListComics dataToFetch={character.comics} />
      </div>
    </main>
  );
};

export default Character;
