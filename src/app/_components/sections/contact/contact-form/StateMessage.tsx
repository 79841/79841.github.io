import React from "react";

type TStateMessageProps = {
  stateMessage: string | null;
};
export const StateMessage = ({ stateMessage }: TStateMessageProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">{stateMessage}</div>
  );
};
