import { Link, NavLink, useLocation } from "react-router";
import { cn } from "../../../utils";
import type { IMenuItem } from "./_options";

const SideBarItems = ({ item }: { item: IMenuItem }) => {
  const location = useLocation();
  const isActive = (path: any) => {
    if (path.route === location.pathname) return true;
    if (path.children) {
      return path.children.some((child: any) => isActive(child));
    }
    return false;
  };
  const isItemActive = isActive(item);
  return (
    <li>
      <Link
        to={item.route as string}
        className={`${
          isItemActive
            ? " text-primary! border-r-2 border-primary!"
            : "text-white!"
        } flex justify-between items-center cursor-pointer! text-sm px-3 my-2`}
      >
        <p className="flex items-center gap-3">
          {item.icon} {item.label}
        </p>
      </Link>
      {item.children && (
        <div
          className={cn(
            "transform transition-all duration-300 overflow-hidden",
            "max-h-40 opacity-100",
          )}
        >
          <ul className="ml-8 mt-2 flex flex-col gap-3 text-xs">
            {item.children.map((item, index) => (
              <li key={index}>
                <NavLink
                  end
                  to={item.route}
                  className={({ isActive }) =>
                    `${isActive ? "text-primary/80!" : "text-white/50! hover:text-primary/80!"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default SideBarItems;
