import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "./ComicCard";
import fetchDataCollection from "../utils/fetchDataCollection";
import { motion } from "motion/react";

const ListComics = ({
  setTotalItems,
  currentPage,
  limit,
  search,
  dataToFetch,
  fromCharacter,
  favourites,
  toggleFavourites,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        if (dataToFetch) {
          const cleanedArr = dataToFetch.filter((id) => id);
          const data = await fetchDataCollection("comic", cleanedArr);
          const skip = currentPage > 1 ? limit * (currentPage - 1) : 0;
          const sliced = data.slice(skip, currentPage * limit);

          setData(sliced);
        } else {
          const response = await axios.get(
            `${apiUrl}/comics?limit=${limit}&page=${currentPage}${search && "&title=" + search}`,
          );

          setTotalItems(response.data.count);
          setData(response.data.results);
        }
        const handleScrollToTop = () => {
          if (window.scrollY !== 0) {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        };

        handleScrollToTop();
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [currentPage, limit, setIsLoading, setTotalItems, search, dataToFetch]);

  return isLoading ? (
    <section className="list empty">
      <p>Loading...</p>
    </section>
  ) : (
    <section className="list">
      {data.map(
        (item, i) =>
          item && (
            <motion.article
              className="card comic"
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}>
              <ComicCard
                item={item}
                fromCharacter={fromCharacter}
                favourites={favourites}
                toggleFavourites={toggleFavourites}
              />
            </motion.article>
          ),
      )}
    </section>
  );
};

export default ListComics;
