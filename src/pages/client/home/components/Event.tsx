const images = [
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019170.jpeg&w=1920&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019342.jpg&w=384&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019292.jpg&w=1920&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019279.jpg&w=1920&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018988.jpg&w=1920&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018266.png&w=1920&q=75",
];

const Event = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {images.map((item, index) => (
        <div
          key={index}
          className="group h-[130px] w-full overflow-hidden rounded-lg cursor-pointer"
        >
          <img
            src={item}
            alt=""
            className="group-hover:scale-105 duration-300 transition-transform w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default Event;
