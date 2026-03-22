import { Link, useLocation } from "react-router-dom";
import sliceText from "../utils/sliceText";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Cookies from "js-cookie";

const CharacterCard = ({ item, favourites, toggleFavourites }) => {
  const location = useLocation().pathname;
  const token = Cookies.get("mut");

  return (
    <article className="card character">
      <Link to={`/character/${item._id}`} className="pseudo">
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

      {token && favourites && (
        <button onClick={() => toggleFavourites(item)}>
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
