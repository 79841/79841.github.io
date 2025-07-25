import { siteMetadata } from "@/data";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";

export const ResumeButton = () => {
  return (
    <Link
      href={siteMetadata.resumePath}
      type="application/pdf"
      download={siteMetadata.resumePath.split("/").at(-1)}
      target="_blank"
      className="flex h-14 w-fit items-center justify-center gap-2 rounded-full border bg-blue-600 px-7 text-white"
    >
      <span className="text-base">Resume</span>
      <IoMdDownload size={18} />
    </Link>
  );
};
