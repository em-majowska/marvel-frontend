import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "./ComicCard";

const ListComics = ({
  setTotalItems,
  setIsLoading,
  currentPage,
  limit,
  isLoading,
  search,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/comics?limit=${limit}&page=${currentPage}${search && "&title=" + search}`,
        );

        setTotalItems(response.data.count);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.message);
      }
    };

    fetchData();
  }, [currentPage, limit, setIsLoading, setTotalItems, search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="list">
      {data.map((item) => (
        <ComicCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default ListComics;
