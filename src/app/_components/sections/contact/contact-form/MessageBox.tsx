import React from "react";

export const MessageBox = () => {
  return (
    <textarea
      name="message"
      className="h-60 w-full resize-none rounded-xl border p-4 focus:outline-none"
      placeholder="Message..."
    />
  );
};
