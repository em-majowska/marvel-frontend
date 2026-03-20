import axios from "axios";

const fetchDataCollection = (title, dataToFetch) => {
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

      return dataArray;
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.message);
    }
  };

  return fetchData();
};

export default fetchDataCollection;
