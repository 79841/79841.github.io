import { TContactForm } from "@/types";

export const postContact = async (contactForm: TContactForm) => {
  console.log(contactForm);
  const res = await fetch("/api/send", {
    method: "post",
    body: JSON.stringify(contactForm),
  });
  const resJson = await res.text();
  console.log("text", resJson);
  return res;
};
