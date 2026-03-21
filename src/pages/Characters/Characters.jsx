import { useState } from "react";
import Pagination from "rc-pagination";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import ListCharacters from "../../components/ListCharacters";
import Input from "../../components/Input";

const Characters = () => {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 26;
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="characters">
      <div className="container">
        <section className="heading-container">
          <h1 className="header">
            All Characters<span className="header-bottom"></span>
          </h1>
          <p className="baseline">
            Explore the heroes and villains of the Marvel Universe
          </p>
          <Input search={search} setSearch={setSearch} />
        </section>
        <div className="divider"></div>

        <ListCharacters
          setTotalItems={setTotalItems}
          setIsLoading={setIsLoading}
          limit={limit}
          isLoading={isLoading}
          currentPage={currentPage}
          isCharacters={true}
          search={search}
        />

        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalItems}
          align="center"
          prevIcon={<MdOutlineArrowBackIos />}
          nextIcon={<MdOutlineArrowForwardIos />}
          jumpNextIcon={<MdOutlineKeyboardDoubleArrowRight />}
          jumpPrevIcon={<MdOutlineKeyboardDoubleArrowLeft />}
          onChange={(pageNumber) => {
            setIsLoading(true);
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </main>
  );
};

export default Characters;
