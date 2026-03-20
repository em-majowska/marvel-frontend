import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "./ComicCard";

const ComicsCollection = ({ dataToFetch }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const promisesArr = dataToFetch.map((id) =>
          axios.get(`${apiUrl}/comic/${id}`),
        );

        const response = await Promise.all(promisesArr);
        console.log(response);

        const dataArray = response.map((item) => item.data);

        setData(dataArray);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.message);
      }
    };

    fetchData();
  }, [dataToFetch]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section>
      {data.map((item) => (
        <ComicCard item={item} />
      ))}
    </section>
  );
};

export default ComicsCollection;
