import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import ComicCard from "./ComicCard";

const Carousel = ({
  ctaText,
  title,
  dataToFetch,
  link,
  favourites,
  toggleFavourites,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        let promisesArr;
        if (title.includes("characters")) {
          promisesArr = dataToFetch.map((id) =>
            axios.get(`${apiUrl}/character/${id}`),
          );
        } else {
          promisesArr = dataToFetch.map((id) =>
            axios.get(`${apiUrl}/comic/${id}`),
          );
        }

        const response = await Promise.all(promisesArr);
        const dataArray = response.map((item) => item.data);

        setData(dataArray);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [dataToFetch, title]);

  return (
    <section>
      <div className="heading-container">
        <span className="cta-text">{ctaText}</span>
        <div className="heading-row">
          <h2 className="header">
            {title}
            <span className="header-bottom"></span>
          </h2>
          <Link to={link}>
            View all <span>&#8594;</span>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="carousel">
          {data.map((item) => {
            return item.name ? (
              <CharacterCard
                key={item._id}
                item={item}
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            ) : (
              <ComicCard
                key={item._id}
                item={item}
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Carousel;
