import React from "react";
import { FaComputer } from "react-icons/fa6";

export const Mobile = () => {
  return (
    <div className="h-full w-full flex flex-col gap-3 justify-center items-center lg:hidden bg-primary-bg">
      <FaComputer className="text-5xl" />
      <p className="font-semibold text-3xl text-center">
        Please open our app on desktop device
      </p>
    </div>
  );
};
