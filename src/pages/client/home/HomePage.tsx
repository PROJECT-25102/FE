import { Link } from "react-router";
import Banner from "./components/Banner";
import WrapperList from "./components/WrapperList";
import DiscountEvent from "./components/DiscountEvent";
import { film_coming, film_fes, film_mock } from "../../../mock/Flim";
import FestivalFilm from "./components/FestivalFlim";
import Event from "./components/Event";

const HomePage = () => {
  return (
    <>
      <section>
        <Banner />
      </section>
      <section
        className="max-w-7xl mx-8 xl:mx-auto mt-6 gap-8 xl:grid"
        style={{ gridTemplateColumns: "3.5fr 1fr" }}
      >
        <div>
          <div>
            <WrapperList
              title={"Phim đang chiếu"}
              data={film_mock}
              moreText={
                <Link
                  to={"/showtimes"}
                  className="underline hover:text-primary duration-300"
                >
                  Xem tất cả
                </Link>
              }
            />
          </div>
          <div className="mt-20">
            <FestivalFilm
              title={"Liên hoan phim,Tuần phim"}
              data={film_fes}
              moreText={
                <Link
                  to={"/showtimes"}
                  className="underline hover:text-primary duration-300"
                >
                  Xem tất cả
                </Link>
              }
            />
          </div>
          <div className="mt-20">
            <FestivalFilm
              title={"Phim sắp chiếu"}
              data={film_coming}
              moreText={
                <Link
                  to={"/showtimes"}
                  className="underline hover:text-primary duration-300"
                >
                  Xem tất cả
                </Link>
              }
            />
          </div>
        </div>
        <div>
          <div className="text-white xl:block hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Khuyến mãi</h2>
              <Link
                to={"/showtimes"}
                className="underline hover:text-primary duration-300"
              >
                Xem tất cả
              </Link>
            </div>
            <DiscountEvent />
          </div>

          <div className="text-white xl:block hidden mt-15">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sự kiện</h2>
              <Link
                to={"/showtimes"}
                className="underline hover:text-primary duration-300"
              >
                Xem tất cả
              </Link>
            </div>
            <Event />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
