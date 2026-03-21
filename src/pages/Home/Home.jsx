import "./Home.css";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";

const Home = ({ favourites, toggleFavourites }) => {
  const charactersToGet = [
    "5fcf934ad8a2480017b916a9",
    "5fcf9495d8a2480017b918f4",
    "5fcf93ddd8a2480017b917b4",
    "5fcf9533d8a2480017b91a00",
    "5fcf9475d8a2480017b918b5",
    "5fcf9340d8a2480017b91690",
    "5fcf9447d8a2480017b9186d",
    "5fcf932bd8a2480017b9166b",
    "5fcf94b4d8a2480017b91922",
    "5fcf9397d8a2480017b91738",
  ];

  const comicsToGet = [
    "5fce0b8e78edeb0017c9003a",
    "5fce0b9578edeb0017c900ca",
    "5fce0b7278edeb0017c8fe6a",
    "5fce0c0478edeb0017c9077c",
    "5fce0b6078edeb0017c8fd25",
    "5fce0bc478edeb0017c903d3",
    "5fce0c6478edeb0017c90d37",
    "5fce0c8678edeb0017c90f30",
    "5fce0c6478edeb0017c90d27",
    "5fce0b4978edeb0017c8fbad",
  ];

  return (
    <main className="home">
      <Carousel
        ctaText="discover"
        title="featured characters"
        dataToFetch={charactersToGet}
        link="/characters"
        favourites={favourites}
        toggleFavourites={toggleFavourites}
      />
      <div className="divider"></div>
      <Carousel
        ctaText="find"
        title="latest comics"
        dataToFetch={comicsToGet}
        link="/comics"
        favourites={favourites}
        toggleFavourites={toggleFavourites}
      />
      <div className="bottom">
        <p className="big-text">
          ready to <span>explore?</span>
        </p>
        <p>
          Dive deep into the Marvel Universe and discover the stories behind
          every hero
        </p>
        <div className="buttons">
          <Button path={"/characters"} text="EXPLORE HEROES" filled={true} />
          <Button path={"/comics"} text="BROWSE COMICS" />
        </div>
      </div>
    </main>
  );
};

export default Home;
