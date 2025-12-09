import { Button, Input, Select } from "antd";
import { useTableHook } from "../../../../common/hooks/useTableHook";
import { useEffect, useState } from "react";
import { ROLE, ROLE_LABEL } from "../../../../common/constants/user";
import ModalCreateUser from "./ModalCreateUser";

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
        <Select
          style={{
            minWidth: 150,
          }}
          defaultValue={query.role}
          onChange={(e) => onFilter({ role: [e] })}
          placeholder="Lọc theo vai trò"
          options={[
            {
              value: "",
              label: "Tất cả vai trò",
            },
            ...Object.entries(ROLE).map((value) => ({
              value: value[1],
              label: ROLE_LABEL[value[1]],
            })),
          ]}
        />
      </div>
      <ModalCreateUser>
        <Button type="primary">Thêm người dùng</Button>
      </ModalCreateUser>
    </div>
  );
};

export default FilterUser;
