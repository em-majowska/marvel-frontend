import { Link } from "react-router-dom";

const Character = ({ item }) => {
  return (
    <Link to={`character/${item.id}`} className="card pseudo character">
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
  );
};

export default Character;
