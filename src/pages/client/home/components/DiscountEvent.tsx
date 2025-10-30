const images = [
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019006.png&w=640&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0017410.jpg&w=640&q=75",
  "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0018385.jpg&w=640&q=75",
];

const DiscountEvent = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {images.map((item, index) => (
        <div
          key={index}
          className="h-[130px] w-full overflow-hidden rounded-lg"
        >
          <img
            src={item}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default DiscountEvent;
