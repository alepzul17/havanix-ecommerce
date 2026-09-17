import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full h-150 bg-black flex flex-col justify-between">
      <div className=" flex flex-col items-center">
        <h1 className="text-primary text-5xl font-bold my-9 sm:text-6xl">
          Havanix
        </h1>
        <div className="flex gap-5 m-4">
          <Link href={"https://www.facebook.com/"}>
            <FaFacebookF className="bg-black text-white text-xl cursor-pointer sm:text-3xl" />
          </Link>
          <Link href={"https://www.instagram.com/"}>
            <FaInstagram className="bg-black text-white text-xl cursor-pointer sm:text-3xl" />
          </Link>
        </div>

        <h3 className="text-white font-semibold my-2 sm:text-2xl">
          WEAR YOUR OWN WAY.
        </h3>
        <p className="text-white font-light text-sm text-center sm:text-xl">
          Discover everyday streetwear designed to express your style with
          confidence.
        </p>
      </div>

      <ul className="text-muted text-2xl font-semibold m-4 mt-12 flex gap-12 flex-wrap justify-center">
        <Link href={"#"}>
          <li className="hover:text-white">Home</li>
        </Link>
        <Link href={"#"}>
          <li className="hover:text-white">Shop</li>
        </Link>{" "}
        <Link href={"#"}>
          <li className="hover:text-white">New Arrivals</li>
        </Link>{" "}
        <Link href={"#"}>
          <li className="hover:text-white">About</li>
        </Link>{" "}
        <Link href={"#"}>
          <li className="hover:text-white">Contact us</li>
        </Link>
      </ul>
      <hr className="border-white/50 my-13 sm:border-none" />
      <p className="text-white text-center mb-7">
        © 2026 Havanix. All rights reserved.
      </p>
    </div>
  );
}
