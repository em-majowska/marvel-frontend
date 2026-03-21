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
        error.response && console.log(error.response.message);
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
            alt="hero image"
          />
        </div>
        <div className="heading-container">
          <Link
            to="#"
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}>
            <span>&#8592;</span> Go Back
          </Link>
          <h1 className="header">
            {comic.title.length > 15 ? sliceText(comic.title, 22) : comic.title}
          </h1>
        </div>
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
