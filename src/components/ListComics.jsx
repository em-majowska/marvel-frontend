import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "./ComicCard";
import fetchDataCollection from "../utils/fetchDataCollection";

const ListComics = ({
  setTotalItems,
  currentPage,
  limit,
  search,
  dataToFetch,
  fromCharacter,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        if (dataToFetch) {
          const data = await fetchDataCollection("comic", dataToFetch);
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

        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.message);
      }
    };

    fetchData();
  }, [currentPage, limit, setIsLoading, setTotalItems, search, dataToFetch]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="list">
      {data.map((item) => (
        <ComicCard key={item._id} item={item} fromCharacter={fromCharacter} />
      ))}
    </section>
  );
};

export default ListComics;
