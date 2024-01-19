"use client";
import React from "react";
import { InputBox } from "./InputBox";
import { useContact } from "../hooks";
import { SubmitButton } from "./SubmitButton";
import { MessageBox } from "./MessageBox";
import { StateMessage } from "./StateMessage";
import { ScrollRisingBox } from "@/components/animation";

export const ContactForm = () => {
  const [state, formAction] = useContact();

  return (
    <form
      action={formAction}
      className="relative flex w-full flex-col gap-4 text-zinc-500 sm:w-4/5 md:w-1/2"
    >
      <ScrollRisingBox>
        <InputBox
          placeholder="Name"
          name="name"
          className="focus:outline-none"
        />
      </ScrollRisingBox>
      <ScrollRisingBox>
        <InputBox placeholder="Email" name="email" type="email" />
      </ScrollRisingBox>
      <ScrollRisingBox>
        <MessageBox />
      </ScrollRisingBox>
      <ScrollRisingBox>
        <div className="flex w-full items-center justify-end">
          <StateMessage stateMessage={state?.message ?? ""} />
          <SubmitButton />
        </div>
      </ScrollRisingBox>
    </form>
  );
};
