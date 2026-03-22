import video from "../assets/videos/spiderman-hero.mp4";
import Button from "./Button";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="video-container pseudo">
        <video autoPlay muted loop className="video">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      {/* <div className="container"> */}
      <div className="hero-container container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "linear",
          }}>
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
        </motion.div>
        <span className="scroll">
          SCROLL
          <motion.span
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="scroll-indicator"
          />
        </span>
      </div>
    </section>
  );
};

export default Hero;
