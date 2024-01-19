import React from "react";

type TEmailFormProps = {
  content: string;
};
export const EmailForm = ({ content }: TEmailFormProps) => {
  return <div>{content}</div>;
};
