import avatar from "../../assets/images/avatar-placeholder.webp";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
import ComicCard from "../../components/ComicCard";
import Pagination from "rc-pagination";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import "./Account.css";

const Account = ({ favourites, toggleFavourites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("mut");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [totalItems, setTotalItems] = useState(favourites.length);
  const [currentFavourites, setCurrentFavourites] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/user/account",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setUser(response.data);
        const skip = currentPage > 1 ? limit * (currentPage - 1) : 0;
        const sliced = favourites.slice(skip, currentPage * limit);
        setTotalItems(favourites.length);
        setCurrentFavourites(sliced);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData(0);
  }, [token, setUser, favourites, currentPage]);

  return !token ? (
    <Navigate to="/home" />
  ) : (
    <main className="account">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <section className="top container">
            <div className="top-text">
              <h1>{user.account.username}</h1>
            </div>
            {user.account.avatar ? (
              <img src={user.account.avatar} alt="your avatar" />
            ) : (
              <img src={avatar} alt="your avatar" />
            )}
          </section>
          <div className="divider"></div>
          <section className="list favourites container">
            {currentFavourites.map((fav) => {
              return fav.name ? (
                <CharacterCard
                  item={fav}
                  key={fav._id}
                  favourites={favourites}
                  toggleFavourites={toggleFavourites}
                />
              ) : (
                <ComicCard
                  item={fav}
                  key={fav._id}
                  favourites={favourites}
                  toggleFavourites={toggleFavourites}
                />
              );
            })}
          </section>
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={totalItems}
            prevIcon={<MdOutlineArrowBackIos />}
            nextIcon={<MdOutlineArrowForwardIos />}
            jumpNextIcon={<MdOutlineKeyboardDoubleArrowRight />}
            jumpPrevIcon={<MdOutlineKeyboardDoubleArrowLeft />}
            onChange={(pageNumber) => {
              setCurrentPage(pageNumber);
            }}
          />
        </>
      )}
    </main>
  );
};

export default Account;
