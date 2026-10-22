import { useState } from "react";

export default function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [message, setMessage] = useState("");

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    setIsEmailInvalid(value.includes("@"));
  }

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordInvalid(value.length >= 8);
  }

  function isConfirmPasswordSame(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setConfirmPassword(value);
    setIsPasswordSame(value === password);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        password,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    console.log(message);
  }

  return (
    <div className="mx-5 mt-8">
      <div className="flex w-full max-w-md flex-col">
        <h1 className="mb-2 text-3xl font-bold">Create an Account</h1>

        <p className="mb-5 text-gray-500">
          Join Havanix and start your journey.
        </p>

        <form
          className="space-y-4 md:space-y-6"
          action="#"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* fullname */}
          <div className="group border rounded-lg px-3 py-3">
            <label
              htmlFor="fullname"
              className="block mb-1 font-medium transition-all group-focus-within:translate-x-2"
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="w-full focus:outline-none focus:ring-0 "
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
          </div>
          {/* email */}
          <div
            className={`group border rounded-lg px-3 py-3 ${isEmailInvalid ? "border-black" : "border-red-500"}`}
          >
            <label
              htmlFor="email"
              className="block mb-1 font-medium transition-all group-focus-within:translate-x-2"
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="JohnDoe@gmail.com"
              className="w-full focus:outline-none focus:ring-0 "
              value={email}
              onChange={(e) => validateEmail(e)}
            />
          </div>
          {/* password */}
          <div
            className={`group border rounded-lg px-3 py-3 ${isPasswordInvalid ? "border-black" : "border-red-500"}`}
          >
            <label
              htmlFor="password"
              className="block mb-1 font-medium transition-all group-focus-within:translate-x-2"
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
              onChange={(e) => validatePassword(e)}
            />
          </div>
          {/* confirm password */}
          <div
            className={`group border rounded-lg px-3 py-3 ${isPasswordSame ? "border-black" : "border-red-500"}`}
          >
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-medium transition-all group-focus-within:translate-x-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              className="w-full focus:outline-none focus:ring-0 "
              value={confirmPassword}
              onChange={(e) => isConfirmPasswordSame(e)}
            />
          </div>
          <p
            role="alert"
            className="mt-2 flex font-semibold items-center gap-2 text-sm text-red-600"
          >
            {message}
          </p>
          <button
            type="submit"
            className="mt-4 w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
