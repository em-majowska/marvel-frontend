import imagePlacehodler from "../assets/images/image-placeholder.png";
import { Link, useLocation } from "react-router-dom";
import sliceText from "../utils/sliceText";
import purifyStr from "../utils/purifyStr";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Cookies from "js-cookie";

const ComicCard = ({ item, fromCharacter, favourites, toggleFavourites }) => {
  const location = useLocation().pathname;
  const token = Cookies.get("mut");

  return (
    <>
      <Link
        to={`/comic/${item._id}`}
        state={{
          from: fromCharacter ? `/character/${fromCharacter}` : `/comics`,
        }}>
        <div className="img-container">
          <img
            src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
            alt="hero image"
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = imagePlacehodler;
            }}
          />
        </div>
        <div className="card-text">
          <h3>{item.title}</h3>
          {location === "/comics" && (
            <p
              className="description"
              dangerouslySetInnerHTML={purifyStr(
                item.description && item.description.length > 70
                  ? sliceText(item.description, 70)
                  : item.description,
              )}></p>
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
    </>
  );
};

export default ComicCard;
