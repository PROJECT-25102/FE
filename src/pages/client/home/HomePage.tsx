import { Link } from "react-router";
import Banner from "./components/Banner";
import WrapperList from "./components/WrapperList";
import { flim_mock } from "../../../mock/Flim";
import DiscountEvent from "./components/DiscountEvent";

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
          <WrapperList
            title={"Phim đang chiếu"}
            data={flim_mock}
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
      </section>
    </>
  );
};

export default HomePage;
