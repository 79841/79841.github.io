import { siteMetadata } from "@/data";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";

export const ResumeButton = () => {
  return (
    <Link
      href={siteMetadata.resumePath}
      download={siteMetadata.resumePath.split("/").at(-1)}
      target="_blank"
      className="flex w-fit items-center justify-center gap-2 rounded-full border bg-blue-600 px-7 py-4 text-white"
    >
      <span>Resume</span>
      <IoMdDownload size={18} />
    </Link>
  );
};
