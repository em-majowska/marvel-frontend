import axios from "axios";
import { useEffect, useState } from "react";
import Character from "./Character";

const ListCharacters = ({
  setTotalItems,
  setIsLoading,
  currentPage,
  limit,
  isLoading,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/characters?limit=${limit}&page=${currentPage}`,
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
  }, [currentPage, limit, setIsLoading, setTotalItems]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="list">
      {data.map((item) => {
        return <Character key={item.id} item={item} />;
      })}
    </section>
  );
};

export default ListCharacters;
