"use client";
import React from "react";
import { InputBox } from "./InputBox";
import { useContact } from "../hooks";
import { SubmitButton } from "./SubmitButton";

export const ContactForm = () => {
  const [state, formAction] = useContact();

  return (
    <form
      action={formAction}
      className="relative flex w-full flex-col gap-4 text-zinc-500 sm:w-4/5 md:w-1/2"
    >
      <InputBox placeholder="Name" name="name" className="focus:outline-none" />
      <InputBox placeholder="Email" name="email" type="email" />
      <textarea
        name="message"
        className="h-60 resize-none rounded-xl border p-4 focus:outline-none"
        placeholder="Message..."
      />
      <div className="flex w-full items-center justify-end">
        <div className="absolute left-1/2 -translate-x-1/2">
          {state?.message}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};
