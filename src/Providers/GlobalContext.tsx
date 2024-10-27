"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import axios from "axios";

type GlobalContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalProvider ({ children }: { children: ReactNode }){
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await axios.get(`/api/user/${session.user.id}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [session, status]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
