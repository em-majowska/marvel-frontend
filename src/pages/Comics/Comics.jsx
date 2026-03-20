import { useState } from "react";
import Pagination from "rc-pagination";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import ListComics from "../../components/ListComics";
import Input from "../../components/Input";

const Comics = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const limit = 25;
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="comics">
      <div className="container">
        <section className="header-container">
          <h1 className="header">
            COMIC COLLECTION<span className="header-bottom"></span>
          </h1>
          <p className="baseline">
            Browse through legendary Marvel comic series
          </p>
          <Input search={search} setSearch={setSearch} />
        </section>
        <div className="divider"></div>

        <ListComics
          setTotalItems={setTotalItems}
          setIsLoading={setIsLoading}
          limit={limit}
          isLoading={isLoading}
          currentPage={currentPage}
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
            setcurrentPage(pageNumber);
          }}
        />
      </div>
    </main>
  );
};

export default Comics;
