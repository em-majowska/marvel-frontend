import { Link, useLocation } from "react-router-dom";
import sliceText from "../utils/sliceText";

const CharacterCard = ({ item }) => {
  const location = useLocation().pathname;

  return (
    <Link to={`/character/${item._id}`} className="card pseudo character">
      <article>
        <img
          src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
          alt="hero image"
        />
        <div className="card-text">
          <h3>{item.name}</h3>
          {location === "/characters" && (
            <p className="description">
              {item.description.length > 70
                ? sliceText(item.description, 70)
                : item.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default CharacterCard;
