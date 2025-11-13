import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router";
import { QUERYKEY } from "../../../common/constants/queryKey";
import { getAllMovie } from "../../../common/services/movie.service";
import Banner from "./components/Banner";
import DiscountEvent from "./components/DiscountEvent";
import Event from "./components/Event";
import FestivalFilm from "./components/FestivalFlim";
import WrapperList from "./components/WrapperList";

const HomePage = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: [QUERYKEY.MOVIE, QUERYKEY.MOVIE.SHOWING],
        queryFn: () =>
          getAllMovie({ status: true, statusRelease: "nowShowing" }),
      },
      {
        queryKey: [QUERYKEY.MOVIE, QUERYKEY.MOVIE.UPCOMING],
        queryFn: () => getAllMovie({ status: true, statusRelease: "upcoming" }),
      },
    ],
  });
  const { data: showingData, isLoading: isLoadingShowing } = result[0];
  const { data: incomingData, isLoading: isLoadingIncoming } = result[1];
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
              isLoading={isLoadingShowing}
              data={showingData?.data}
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
              isLoading={isLoadingIncoming}
              data={incomingData?.data}
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
