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
import { motion } from "motion/react";

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
        <section className="list empty">
          <p>Loading...</p>
        </section>
      ) : (
        <>
          <section className="top container">
            <div className="top-text">
              <h1>{user.account.username}</h1>
            </div>
            {user.account.avatar ? (
              <img src={user.account.avatar.secure_url} alt="your avatar" />
            ) : (
              <img src={avatar} alt="your avatar" />
            )}
          </section>
          <div className="divider"></div>

          {favourites.length === 0 ? (
            <div className="container">
              <p className="empty">
                Your favourite heroes and comics will appear here!
              </p>
            </div>
          ) : (
            <>
              <section className="list favourites container">
                {currentFavourites.map((fav, i) => {
                  return fav.name ? (
                    <motion.article
                      className="card character"
                      key={fav._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}>
                      <CharacterCard
                        item={fav}
                        favourites={favourites}
                        toggleFavourites={toggleFavourites}
                      />
                    </motion.article>
                  ) : (
                    <motion.article
                      className="card comic"
                      key={fav._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}>
                      <ComicCard
                        item={fav}
                        favourites={favourites}
                        toggleFavourites={toggleFavourites}
                      />
                    </motion.article>
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
                hideOnSinglePage="true"
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Account;
