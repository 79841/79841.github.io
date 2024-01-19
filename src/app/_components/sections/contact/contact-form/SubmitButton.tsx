"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { IoMail } from "react-icons/io5";
import { TbLoader } from "react-icons/tb";
export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "flex h-fit w-fit gap-2 rounded-full bg-blue-600 px-6 py-3 text-white",
        pending && "text-zinc-200",
      )}
      disabled={pending}
    >
      <div>Send</div>
      {pending ? <TbLoader size={20} /> : <IoMail size={20} />}
    </button>
  );
};
