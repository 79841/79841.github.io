"use client";
import React, { useRef } from "react";
import { InputBox } from "./InputBox";
import { IoMail } from "react-icons/io5";
import { useFormState } from "react-dom";
import { z } from "zod";
import { postContact } from "@/services/contact";

export const ContactForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  const handleAction = async (prevState: any, formData: FormData) => {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      title: z.string().min(1),
      content: z.string().min(1),
    });

    const validatedData = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      title: formData.get("title"),
      content: formData.get("content"),
    });

    if (!validatedData.success) {
      return { message: "The format is incorrect." };
    }

    try {
      const res = await postContact(validatedData.data);
      console.log(res);
      return { message: res };
    } catch (e) {
      console.log(e);
      return { message: e };
    }
  };

  const [state, formAction] = useFormState(handleAction, null);

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex w-full flex-col gap-4 text-zinc-500 sm:w-4/5 md:w-1/2"
    >
      <InputBox placeholder="Name" name="name" className="focus:outline-none" />
      <InputBox placeholder="Email" name="email" type="email" />
      <InputBox placeholder="Title" name="title" />
      <textarea
        name="content"
        className="h-60 resize-none rounded-xl border p-4 focus:outline-none"
        placeholder="Content..."
      />
      <div className="flex justify-between">
        <button className="flex h-fit w-fit gap-2 rounded-full bg-blue-600 px-6 py-3 text-white">
          <div>Send</div>
          <IoMail size={20} />
        </button>
      </div>
    </form>
  );
};
