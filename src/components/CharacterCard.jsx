import { Link, useLocation } from "react-router-dom";

const CharacterCard = ({ item }) => {
  const sliceText = (str) => str.slice(0, 70) + "...";
  const location = useLocation().pathname;
  return (
    <Link to={`character/${item.id}`} className="card pseudo character">
      <article>
        <img
          src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
          alt="hero image"
        />
        <div className="card-text">
          <h3>{item.name}</h3>
          {location === "/characters" && (
            <div className="description">
              {item.description.length > 70
                ? sliceText(item.description)
                : item.description}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default CharacterCard;
