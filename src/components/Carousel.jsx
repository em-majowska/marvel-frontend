import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import ComicCard from "./ComicCard";
import { motion } from "motion/react";

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

        setData([...dataArray, ...dataArray, ...dataArray]);
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
      <div className="heading-container container">
        <span className="cta-text">{ctaText}</span>
        <div className="heading-row">
          <h2 className="heading">
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
        <section className="carousel-container">
          <div className="carousel animate-marquee">
            {data.map((item, i) => {
              return item.name ? (
                <motion.article
                  className="card character"
                  key={`${item._id}${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}>
                  <CharacterCard
                    item={item}
                    favourites={favourites}
                    toggleFavourites={toggleFavourites}
                  />
                </motion.article>
              ) : (
                <motion.article
                  className="card comic"
                  key={`${item._id}${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}>
                  <ComicCard
                    item={item}
                    favourites={favourites}
                    toggleFavourites={toggleFavourites}
                  />
                </motion.article>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
};

export default Carousel;
