import { Link, useLocation } from "react-router-dom";

const ComicCard = ({ item }) => {
  const sliceText = (str) => str.slice(0, 70) + "...";
  const location = useLocation().pathname;

  return (
    <Link to={`/comic/${item._id}`} className="card comic">
      <article>
        <img
          src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
          alt="hero image"
        />
        <div className="card-text">
          <h3>{item.title}</h3>
          {location === "/comics" && (
            <p className="description">
              {item.description?.length > 70
                ? sliceText(item.description)
                : item.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ComicCard;
