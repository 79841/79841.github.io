import { TContactForm } from "@/types";
import emailjs from "@emailjs/browser";

export const postContact = async (params: TContactForm) => {
  try {
    const res = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
      params,
      process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    );
    return res.text;
  } catch (e: any) {
    return e.toString();
  }
};
