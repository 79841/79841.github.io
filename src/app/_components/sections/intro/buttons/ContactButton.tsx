import { navigationLinks } from "@/data";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

export const ContactButton = () => {
  return (
    <Link
      href={navigationLinks.contact.path}
      className="flex w-fit items-center justify-center gap-2 rounded-full bg-zinc-100 px-7 py-4"
    >
      <span>Contact</span>
      <FaArrowAltCircleRight size={18} />
    </Link>
  );
};
