import { Link, useLocation } from "react-router-dom";

const ComicCard = ({ item }) => {
  const sliceText = (str) => str.slice(0, 70) + "...";
  const location = useLocation().pathname;

  // {
  //   thumbnail: {
  //     path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/20/5aa0527ab02c4',
  //     extension: 'jpg'
  //   },
  //   _id: '5fce275278edeb0017c97708',
  //   title: '1602 (2003) #1',
  //   description:
  //     'The start of a whole new Marvel Universe begins here! It\'s the Marvel Universe in the year 1602.',
  //   __v: 0
  // }
  return (
    <Link to={`comic/${item.id}`} className="card comic">
      <article>
        <img
          src={`${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}`}
          alt="hero image"
        />
        <div className="card-text">
          <h3>{item.title}</h3>
          {location === "/comics" && (
            <div className="description">
              {item.description?.length > 70
                ? sliceText(item.description)
                : item.description}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ComicCard;
