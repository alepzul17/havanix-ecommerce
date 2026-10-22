export default function Login() {
  return (
    <div className="mx-5 mt-8">
      <h1 className="text-3xl font-semibold">Welcome Back</h1>
      <p className="w-2/3 mt-3 text-slate-500 font-medium">
        Log in to your account and continue your journey with Havanix
      </p>

      <form className="space-y-4 md:space-y-6 mt-5" action="#">
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
            className="w-full focus:outline-none focus:ring-0 "
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
