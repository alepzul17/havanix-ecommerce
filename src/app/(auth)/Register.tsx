import { useState, type SyntheticEvent, type ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  function validateEmail(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    setIsEmailInvalid(value.includes("@"));
  }

  function validatePassword(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordInvalid(value.length >= 8);
  }

  function isConfirmPasswordSame(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setConfirmPassword(value);
    setIsPasswordSame(value === password);
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
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
    if (!response.ok) {
      return;
    }

    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (loginResult?.error) {
      setMessage("Register succes but automaticly login failed");
      return;
    }
    router.push("/");
  }

  return (
    <div className="mx-5 mt-8 w-full">
      <div className="flex max-w-md sm:max-w-none sm:w-full flex-col">
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
            className={`group border rounded-lg px-3 py-3 ${isEmailInvalid ? "border-black" : "border-2 border-red-500"}`}
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
            className={`group border rounded-lg px-3 py-3 ${isPasswordInvalid ? "border-black" : "border-2 border-red-500"}`}
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
            className={`group border rounded-lg px-3 py-3 ${isPasswordSame ? "border-black" : "border-2 border-red-500"}`}
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
            disabled={!isPasswordSame && !isEmailInvalid && !isPasswordInvalid}
            type="submit"
            className="mt-4 w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
