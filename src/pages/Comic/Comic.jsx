import "./Comic.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import sliceText from "../../utils/sliceText";
import purifyStr from "../../utils/purifyStr";

const Comic = () => {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comic/${id}`);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="comic-page">
      <section className="hero">
        <div className="hero-image pseudo">
          <img
            src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="heading-container">
          <div className="container">
            {" "}
            <img
              src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
              alt="hero image"
            />
            <div className="heading-text">
              <Link
                to="#"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(-1);
                }}>
                <span>&#8592;</span> Go Back
              </Link>
              <h1 className="heading">
                {comic.title.length > 15
                  ? sliceText(comic.title, 22)
                  : comic.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </section>
      <div className="container">
        <aside className="data">
          <p>{comic.title}</p>
          <p
            className="description"
            dangerouslySetInnerHTML={purifyStr(comic.description)}></p>
        </aside>
      </div>
    </main>
  );
};

export default Comic;
