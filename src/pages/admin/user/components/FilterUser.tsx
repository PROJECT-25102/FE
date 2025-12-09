import { Button, Input } from "antd";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { useEffect, useState } from "react";

const FilterUser = () => {
  const [search, setSearch] = useState("");
  const { query, onFilter } = useTableHook();
  useEffect(() => {
    if (query.search) setSearch(query.search);
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Input.Search
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            if (e.target.value.length < 1) onFilter({ search: [] });
          }}
          onClear={() => onFilter({ search: [] })}
          onSearch={(e) => onFilter({ search: [e] })}
          placeholder="Tìm kiếm người dùng"
          style={{ height: 35, width: 300 }}
        />
      </div>
      <Button type="primary">Thêm người dùng</Button>
    </div>
  );
};

export default FilterUser;
