import imagePlacehodler from "../assets/images/image-placeholder.png";
import { Link, useLocation } from "react-router-dom";
import sliceText from "../utils/sliceText";
import purifyStr from "../utils/purifyStr";

const ComicCard = ({ item, fromCharacter }) => {
  const location = useLocation().pathname;

  return (
    <Link
      to={`/comic/${item._id}`}
      state={{
        from: fromCharacter ? `/character/${fromCharacter}` : `/comics`,
      }}
      className="card comic">
      <article>
        <img
          src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
          alt="hero image"
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = imagePlacehodler;
          }}
        />
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
      </article>
    </Link>
  );
};

export default ComicCard;
