import { Link, useLocation } from "react-router-dom";
import sliceText from "../utils/sliceText";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Cookies from "js-cookie";

const CharacterCard = ({ item, favourites, toggleFavourites, user }) => {
  const location = useLocation().pathname;

  return (
    <article className="card character pseudo">
      <Link to={`/character/${item._id}`}>
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
      </Link>

      {Cookies.get("mut") && (
        <button onClick={() => toggleFavourites(item, user)}>
          {favourites.find((el) => el._id === item._id) ? (
            <MdFavorite className="fav" />
          ) : (
            <MdFavoriteBorder />
          )}
        </button>
      )}
    </article>
  );
};
export default CharacterCard;
