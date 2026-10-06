import { RiTailwindCssFill } from "react-icons/ri";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function PortfolioProject() {
  return (
    <div className="mt-12 bg-black text-white flex flex-col items-center ">
      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">
        BUILT AS A PORTFOLIO PROJECT
      </h2>
      <p className="text-center mx-4 my-7 text-lg italic font-serif sm:text-xl">
        Havanix is a concept e-commerce project created to explore the
        development of a modern fashion store using Next.js and modern web
        technologies.
      </p>
      <h4 className="text-2xl sm:text-3xl sm:font-semibold">Built with:</h4>
      <div className="p-6 flex justify-center gap-4 text-4xl sm:text-5xl">
        <RiTailwindCssFill />
        <SiTypescript />
        <SiNextdotjs />
      </div>
    </div>
  );
}
