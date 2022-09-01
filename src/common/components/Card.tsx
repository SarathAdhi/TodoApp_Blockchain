import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx("w-full bg-white rounded-lg p-2", className)}>
      {children}
    </div>
  );
};

export default Card;
