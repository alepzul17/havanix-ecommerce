import Link from "next/link";
type MobileMenuProps = {
  isMenuOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileMenu({ isMenuOpen, setIsOpen }: MobileMenuProps) {
  return (
    <div
      className={`${isMenuOpen ? "absolute flex justify-between w-full bg-background left-0 top-0 h-full p-4" : "hidden"}`}
    >
      <div className="mt-7">
        <Link href={"/"} className="text-5xl text-primary font-semibold">
          Havanix
        </Link>

        <ul className="mt-12 m-0 p-0 text-2xl">
          <li className="list-none mb-6">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="list-none mb-6">
            <Link href={"/"}>Shop</Link>
          </li>
          <li className="list-none mb-6">
            <Link href={"/"}>New Arrivals</Link>
          </li>
          <li className="list-none mb-6">
            <Link href={"/"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="cursor-pointer" onClick={() => setIsOpen(!isMenuOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
