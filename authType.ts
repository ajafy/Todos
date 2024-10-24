import { User as authUser, Session as authSession } from "next-auth";
import { JWT as authJWT } from "next-auth/jwt";

export interface Session extends authSession {
  user?: {
    username?: string;
    image?: string | null;
  };
}

export interface User extends authUser {
  username?: string;
  provider?:string;
}

export interface JWT extends authJWT {
  id?: string;
  username?: string;
}
