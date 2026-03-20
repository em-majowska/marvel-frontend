import { useLocation } from "react-router-dom";

const Input = ({ search, setSearch }) => {
  const location = useLocation().pathname;

  return (
    <label htmlFor="search">
      <input
        type="search"
        name="search"
        id="search"
        value={search}
        placeholder={
          location === "/characters" ? "e.g. Spiderman..." : "e.g. Avengeres..."
        }
        onChange={(event) => setSearch(event.target.value)}
      />
    </label>
  );
};

export default Input;
