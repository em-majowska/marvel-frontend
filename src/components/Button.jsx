import { Link } from "react-router-dom";

const Button = ({ path, text, filled }) => {
  return (
    <Link
      to={path}
      className={filled ? "btn-primary btn" : "btn-secondary btn"}>
      {text}
    </Link>
  );
};

export default Button;
