import video from "../assets/videos/spiderman-hero.mp4";
import Button from "./Button";
const Hero = () => {
  return (
    <section className="hero">
      <div className="video-container pseudo">
        <video autoPlay muted loop className="video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="hero-container">
        <span className="top-text">Explore the multiverse</span>
        <h1>
          THE
          <span>MARVEL</span>UNIVERSE
        </h1>
        <p className="baseline">
          Discover legendary heroes, explore iconic comics, and dive into the
          stories that shaped a universe.
        </p>
        <div className="buttons">
          <Button path={"/characters"} text="EXPLORE HEROES" filled={true} />
          <Button path={"/comics"} text="BROWSE COMICS" />
        </div>
      </div>
      <span className="scroll">SCROLL</span>
    </section>
  );
};

export default Hero;
