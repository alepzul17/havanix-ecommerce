"use client";
import Navbar from "@/app/components/navbar/Navbar";
import { useState } from "react";
import Login from "../login";
import Register from "../Register";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="border-2 border-slate-200 mt-14 mx-5">
        <button
          className={`w-1/2 text-2xl p-2 cursor-pointer border-r-2 border-slate-200 ${isLogin ? "bg-white font-medium" : "bg-slate-200"}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`w-1/2 text-2xl p-2 cursor-pointer bg-slate-200 ${isLogin ? "bg-slate-200" : "bg-white font-medium"}`}
          onClick={() => setIsLogin(false)}
        >
          Create account
        </button>
      </div>

      {isLogin ? <Login /> : <Register />}
    </div>
  );
}
