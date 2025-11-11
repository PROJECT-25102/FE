import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEY } from "../../../../common/constants/queryKey";
import { getAllCategory } from "../../../../common/services/category.service";

const FilterMovie = () => {
  const { query, onFilter, onChangeSearchInput } = useTableHook();
  const [search, setSearch] = useState("");
  const [statusRelease, setStatus] = useState<
    "released" | "upcoming" | "nowShowing" | ""
  >("");
  const handleChangeStatusRelease = (value: string) => {
    const refDate = query.referenceDate || dayjs().format("YYYY-MM-DD");

    switch (value) {
      case "released": // phim đã ngừng chiếu
        onFilter({
          releaseDateTo: [refDate],
          endDateTo: [refDate],
          releaseDateFrom: null,
          endDateFrom: null,
        });
        break;

      case "upcoming": // phim sắp chiếu
        onFilter({
          releaseDateFrom: [refDate],
          releaseDateTo: null,
          endDateFrom: null,
          endDateTo: null,
        });
        break;

      case "nowShowing": // phim đang chiếu
        onFilter({
          releaseDateTo: [refDate], // releaseDate <= refDate
          endDateFrom: [refDate], // endDate >= refDate
          releaseDateFrom: null,
          endDateTo: null,
        });
        break;

      default:
        onFilter({
          releaseDateFrom: null,
          releaseDateTo: null,
          endDateFrom: null,
          endDateTo: null,
        });
        break;
    }

    setStatus(value as "released" | "upcoming" | "nowShowing" | "");
  };

  useEffect(() => {
    if (query.search) {
      setSearch(query.search);
    }
  }, [query.search]);
  useEffect(() => {
    const refDate = query.referenceDate || dayjs().format("YYYY-MM-DD");

    if (query.releaseDateTo === refDate && query.endDateFrom === refDate) {
      setStatus("nowShowing");
    } else if (query.releaseDateFrom && query.releaseDateFrom > refDate) {
      setStatus("upcoming");
    } else if (query.releaseDateTo && query.releaseDateTo <= refDate) {
      setStatus("released");
    } else {
      setStatus("");
    }
  }, [
    query.releaseDateFrom,
    query.releaseDateTo,
    query.endDateFrom,
    query.referenceDate,
  ]);

  const { data } = useQuery({
    queryKey: [QUERYKEY.CATEGORY],
    queryFn: () => getAllCategory({ status: true, movieCount: false }),
  });
  return (
    <div className="mt-4 flex items-center gap-3">
      <Input
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          onChangeSearchInput(value, { enableOnChangeSearch: true });
        }}
        placeholder="Tìm kiếm phim"
        style={{ height: 35, width: 300 }}
      />
      <Select
        style={{ height: 35, minWidth: 150 }}
        value={query.status || ""}
        onChange={(e) => onFilter({ status: [e] })}
        allowClear
        placeholder="Lọc trạng thái"
        options={[
          { value: "", label: "Tất cả trạng thái" },
          { value: "true", label: "Hoạt động" },
          { value: "false", label: "Đang khóa" },
        ]}
      />
      <Select
        style={{ height: 35, minWidth: 150 }}
        value={query.category || ""}
        onChange={(e) => onFilter({ category: [e] })}
        allowClear
        placeholder="Lọc thể loại"
        options={[
          { value: "", label: "Tất cả thể loại" },
          ...(data?.data?.map((item) => ({
            value: item._id,
            label: item.name,
          })) || []),
        ]}
      />
      <Select
        style={{ height: 35, minWidth: 200 }}
        value={statusRelease || ""}
        onChange={(e) => handleChangeStatusRelease(e)}
        allowClear
        placeholder="Lọc trạng thái"
        options={[
          { value: "", label: "Tất cả trạng thái phim" },
          { value: "released", label: "Phim ngừng chiếu" },
          { value: "nowShowing", label: "Phim Đang chiếu" },
          { value: "upcoming", label: "Phim sắp chiếu" },
        ]}
      />
    </div>
  );
};

export default FilterMovie;
