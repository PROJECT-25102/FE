import { Modal } from "antd";
import React, { useState, type ReactElement } from "react";
import type { IRoom } from "../../../../../common/types/room";
import { Link, useParams } from "react-router";
import type { IShowtime } from "../../../../../common/types/showtime";
import dayjs from "dayjs";
import { useCheckoutSelector } from "../../../../../common/stores/useCheckoutStore";

const ModalSelectRoom = ({
  children,
  room,
  showtime,
}: {
  children: ReactElement;
  room: IRoom[];
  showtime: IShowtime;
}) => {
  const [open, setOpen] = useState(false);
  const setInformation = useCheckoutSelector((state) => state.setInformation);
  const { id } = useParams();
  return (
    <>
      {React.cloneElement(children, {
        onClick: () => setOpen(true),
      } as { onClick: () => void })}
      <Modal
        onCancel={() => setOpen(false)}
        open={open}
        width={600}
        className="rounded-xl border border-white/10  backdrop-blur-md"
        style={{
          background: `hsl(222.2 84% 4.9%)`,
        }}
        title={
          <p className="text-lg font-semibold text-white/90 tracking-wide">
            Lựa chọn phòng chiếu
          </p>
        }
        footer={null}
      >
        <div className="grid mt-8 grid-cols-3 gap-6 max-w-7xl mx-6 xl:mx-auto">
          {room.map((item) => (
            <Link
              onClick={() => {
                setOpen(false);
                setInformation({ showtime: showtime, room: item });
              }}
              to={`/movie/${id}/${showtime._id}/${item._id}?hour=${dayjs(showtime.startTime).format("HH:mm")}&movieId=${showtime.movieId._id}`}
            >
              <button
                key={item._id}
                className="border border-gray-500/50 hover:bg-gray-500/50 w-full text-white transition cursor-pointer py-4 rounded-full"
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalSelectRoom;
