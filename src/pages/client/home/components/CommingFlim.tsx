import React, { type ReactElement } from "react";
import { Spin } from "antd";
import CardFlim from "../../../../components/CardFlim";

type IProps = {
  title: string | ReactElement;
  borderTop?: boolean;
  moreText?: string | ReactElement;
  isLoading?: boolean;
  data?: any;
};

const ComingFilm = ({ title, moreText, data, isLoading }: IProps) => {
  return (
    <div>
      <div className="flex justify-between">
        {React.isValidElement(title) ? (
          title
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}
        {React.isValidElement(moreText) ? moreText : <p>{moreText}</p>}
      </div>
      {isLoading && (
        <div className="mt-4 h-[50vh] w-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
      {data && !isLoading && data.lenght !== 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4 gap-x-6 gap-y-8">
          {data?.map((item: any, index: number) => (
            <CardFlim flim={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-4 h-[50vh] w-full flex justify-center items-center">
          <p>Hiện không có phim nào</p>
        </div>
      )}
    </div>
  );
};

export default ComingFilm;
