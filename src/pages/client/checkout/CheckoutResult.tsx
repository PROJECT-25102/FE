import { useNavigate, useSearchParams } from "react-router";

const CheckoutResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message = searchParams.get("message") || "Có lỗi xảy ra";
  const success = searchParams.get("success") === "true";
  const ticketId = searchParams.get("ticketId");
  const description = searchParams.get("description") || "";
  const handleViewTicket = () => {
    if (ticketId) {
      navigate(`/ticket/${ticketId}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white text-center relative overflow-hidden font-(--font-sans) px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-1.5 " />
      <p className="text-base sm:text-2xl mt-2 mb-8 text-gray-200">{message}</p>
      {description && (
        <p className="text-sm sm:text-base text-gray-400 max-w-[500px] leading-relaxed mb-4">
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative">
        <h1
          className={`text-[80px] sm:text-[120px] md:text-[150px] font-extrabold leading-none select-none ${
            success ? "text-green-500" : "text-red-500"
          }`}
        >
          {success ? "✓" : "✗"}
        </h1>
        <div className="relative flex flex-col items-center mt-4 sm:mt-0">
          <div className="relative">
            <img
              src="https://www.freeiconspng.com/thumbs/bee-png/best-free-bee-png-image-5.png"
              alt="Bee"
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain animate-bounce"
            />
          </div>
        </div>
      </div>
      <span className="text-xs sm:text-sm text-gray-400 mt-2 tracking-wide">
        {success ? "THANH TOÁN THÀNH CÔNG" : "THẤT BẠI"}
      </span>
      <div className="mt-6 flex flex-col gap-2 items-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline cursor-pointer hover:text-orange-300 transition-colors"
          >
            Trang Chủ
          </button>
          {success && ticketId && (
            <button
              onClick={handleViewTicket}
              className="text-primary hover:underline cursor-pointer hover:text-orange-300 transition-colors"
            >
              Xem Vé
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1.5 " />
    </div>
  );
};

export default CheckoutResult;
