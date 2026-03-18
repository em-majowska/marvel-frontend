import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <h1>
        MARVEL <span>UNIVERSE</span>
      </h1>
      <div className="baseline">
        Discover legendary heroes, explore iconic comics, and dive into the
        stories that shaped a universe.
      </div>
      <div className="buttons">
        <Link to="/characters">EXPLORE HEROES</Link>
        <Link to="/comics">BROWSE COMICS</Link>
      </div>
      <span className="scroll">SCROLL</span>
    </section>
  );
};

export default Hero;
