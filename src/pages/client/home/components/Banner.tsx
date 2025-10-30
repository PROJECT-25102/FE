import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const images = [
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019291.jpg&w=3840&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019278.jpg&w=3840&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019224.jpg&w=3840&q=75",
];

const Banner = () => {
  const swiperRef = useRef<SwiperClass>(null);

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };
  return (
    <div className="relative group">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full max-h-[90vh]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              className="max-h-[90vh] w-full aspect-video"
              src={item}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={handleNextSlide}
        className="bg-black/50 py-2 px-2.5 rounded-full group-hover:opacity-100 opacity-0 text-white absolute top-1/2 z-10 cursor-pointer hover:bg-black/80 duration-300  right-3 -translate-y-1/2"
      >
        <RightOutlined className="text-lg" />
      </button>
      <button
        onClick={handlePrevSlide}
        className="bg-black/50 py-2 px-2.5 rounded-full text-white absolute group-hover:opacity-100 opacity-0 top-1/2 z-10 cursor-pointer hover:bg-black/80 duration-300 left-3 -translate-y-1/2"
      >
        <LeftOutlined className="text-lg" />
      </button>
    </div>
  );
};

export default Banner;
