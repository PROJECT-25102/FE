import { Tooltip } from "antd";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const TextNowWrap = ({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight,
      );
    }
  }, [text]);

  const textElement = (
    <p ref={textRef} style={{ margin: 0, ...style }} className={`line-clamp-1`}>
      {text}
    </p>
  );

  return isTruncated ? (
    <Tooltip title={text} placement="top">
      {textElement}
    </Tooltip>
  ) : (
    textElement
  );
};

export default TextNowWrap;
