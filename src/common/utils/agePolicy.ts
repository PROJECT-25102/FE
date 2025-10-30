export const getAgeBadge = (ageRequire?: string) => {
  if (!ageRequire)
    return {
      label: "P",
      color: "blue",
      text: "Phổ biến",
      description: "Phim được phổ biến rộng rãi cho mọi đối tượng khán giả.",
    };
  const age = ageRequire.toUpperCase().trim();
  if (age === "K")
    return {
      label: "K",
      color: "green",
      text: "Dành cho trẻ em",
      description:
        "Các tác phẩm được chiếu đến người xem dưới 13 tuổi, với điều kiện là phải có sự hướng dẫn hoặc sự giám sát từ phía cha, mẹ hoặc người giám hộ.",
    };
  if (age === "P")
    return {
      label: "P",
      color: "blue",
      text: "Phổ biến",
      description: "Phim được phép phổ biến đến mọi đối tượng khán giả.",
    };
  if (age.includes("13"))
    return {
      label: "13+",
      color: "yellow",
      text: "Trên 13 tuổi",
      description:
        "Phim có nội dung hoặc hình ảnh có thể gây ảnh hưởng nhẹ, chỉ phù hợp với khán giả từ 13 tuổi trở lên.",
    };
  if (age.includes("16"))
    return {
      label: "16+",
      color: "orange",
      text: "Trên 16 tuổi",
      description:
        "Phim có nội dung, ngôn ngữ hoặc hình ảnh phức tạp hơn, chỉ phù hợp với khán giả từ 16 tuổi trở lên.",
    };
  if (age.includes("18"))
    return {
      label: "18+",
      color: "red",
      text: "Trên 18 tuổi",
      description:
        "Phim chỉ dành cho người trưởng thành, có thể chứa yếu tố bạo lực, tình dục hoặc ngôn ngữ mạnh.",
    };
  return {
    label: "P",
    color: "blue",
    text: "Phổ biến",
    description: "Phim được phép phổ biến đến mọi đối tượng khán giả.",
  };
};
