import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ ctaText, title, dataToFetch, link }) => {
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
        error.response && console.log(error.response.message);
      }
    };

    fetchData();
  }, [dataToFetch, title]);

  return (
    <section>
      <div className="title-container">
        <span className="cta-text">{ctaText}</span>
        <div className="title">
          <h2>
            {title}
            <span className="title-bottom"></span>
          </h2>
          <Link to={link}>
            View all <span>&#8594;</span>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="carousel ">
          {data.map((item) => {
            console.log(item);
            return item.name ? (
              <Link
                to={`character/${item.id}`}
                key={item.id}
                className="card pseudo character">
                <article>
                  <img
                    src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
                    alt="hero image"
                  />
                  <div className="card-text">
                    <h3>{item.name}</h3>
                  </div>
                </article>
              </Link>
            ) : (
              // {
              //   thumbnail: {
              //     path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/20/5aa0527ab02c4',
              //     extension: 'jpg'
              //   },
              //   _id: '5fce275278edeb0017c97708',
              //   title: '1602 (2003) #1',
              //   description:
              //     'The start of a whole new Marvel Universe begins here! It\'s the Marvel Universe in the year 1602.',
              //   __v: 0
              // }

              <Link
                to={`comic/${item.id}`}
                key={item.id}
                className="card comic">
                <article>
                  <img
                    src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
                    alt="hero image"
                  />
                  <div className="card-text">
                    <h3>{item.title}</h3>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Carousel;
