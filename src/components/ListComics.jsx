import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "./ComicCard";
import fetchDataCollection from "../util/fetchDataCollection";

const ListComics = ({
  setTotalItems,
  // setIsLoading,
  // isLoading = true,
  currentPage,
  limit,
  search,
  dataToFetch,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        if (dataToFetch) {
          const data = await fetchDataCollection("comic", dataToFetch);
          setData(data);
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
        <ComicCard key={item._id} item={item} />
      ))}
    </section>
  );
};

export default ListComics;
