import Link from "next/link";

export default function DesktopMenu() {
  return (
    <div>
      <ul className="hidden md:flex gap-12 text-foreground text-xl">
        <li className="list-none hover:underline hover:underline-offset-8">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="list-none hover:underline hover:underline-offset-8">
          <Link href={"/"}>Shop</Link>
        </li>
        <li className="list-none hover:underline hover:underline-offset-8">
          <Link href={"/"}>New Arrivals</Link>
        </li>
        <li className="list-none hover:underline hover:underline-offset-8">
          <Link href={"/"}>About</Link>
        </li>
      </ul>
    </div>
  );
}
