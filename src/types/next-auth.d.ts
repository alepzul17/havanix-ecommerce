import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullname: string | null;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    fullname: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
