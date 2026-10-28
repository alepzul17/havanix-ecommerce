"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage("Email or Password is invalid");
      return;
    }
    setErrorMessage("");
    router.push("/");
  }

  return (
    <div className="mx-5 mt-8 sm:w-full">
      <h1 className="text-3xl font-semibold">Welcome Back</h1>
      <p className="w-2/3 mt-3 text-slate-500 font-medium">
        Log in to your account and continue your journey with Havanix
      </p>

      <form
        className="space-y-4 md:space-y-6 mt-5"
        action="#"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="group border rounded-lg px-3 py-3 ">
          <label
            htmlFor="email"
            className="block font-medium transition-all group-focus-within:translate-x-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full focus:outline-none focus:ring-0 "
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="group border rounded-lg px-3 py-3">
          <label
            htmlFor="password"
            className="block font-medium transition-all group-focus-within:translate-x-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="w-full focus:outline-none focus:ring-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="font-semibold tracking-wide text-red-500">
          {errorMessage}
        </p>
        {/* <p>User ID: {session?.user?.id ?? "Belum login"}</p> */}
        <button
          type="submit"
          className="mt-4 w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
