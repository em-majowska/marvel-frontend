import axios from "axios";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { motion } from "motion/react";

const ListCharacters = ({
  setTotalItems,
  setIsLoading,
  currentPage,
  limit,
  isLoading,
  search,
  favourites,
  toggleFavourites,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/characters?limit=${limit}&page=${currentPage}${search && "&name=" + search}`,
        );

        setTotalItems(response.data.count);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };
    const handleScrollToTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    handleScrollToTop();
    fetchData();
  }, [currentPage, limit, setIsLoading, setTotalItems, search]);

  return isLoading ? (
    <section className="list empty">
      <p>Loading...</p>
    </section>
  ) : (
    <section className="list">
      {data.map((item, i) => {
        return (
          <motion.article
            className="card character"
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}>
            <CharacterCard
              key={item._id}
              item={item}
              favourites={favourites}
              toggleFavourites={toggleFavourites}
            />
          </motion.article>
        );
      })}
    </section>
  );
};

export default ListCharacters;
