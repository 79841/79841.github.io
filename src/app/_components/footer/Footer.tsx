import { ImBlogger } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { siteMetadata } from "@/data";
export const Footer = () => {
  return (
    <div className="flex h-36 flex-col items-center justify-center gap-4 text-zinc-300">
      <div className="flex items-center justify-center gap-4 text-xl ">
        <Link
          href={siteMetadata.githubUrl}
          className="flex duration-500 hover:text-black"
        >
          <FaGithub />
        </Link>
        <div className="h-full border"></div>
        <Link
          href={siteMetadata.blogUrl}
          className="flex duration-500 hover:text-blue-600"
        >
          <ImBlogger />
        </Link>
      </div>
      <div>© 2024. In Ji Myeong. All rights reserved.</div>
    </div>
  );
};
