import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="marvel logo" />
          <span>UNIVERSE</span>
        </div>
        <p>
          &copy; 2026 Made with <span>React </span> at{" "}
          <a href="https://www.lereacteur.io/">Le Reacteur</a> by{" "}
          <a href="https://github.com/em-majowska">Ewa Majowska</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
