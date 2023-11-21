import axios from "@/services/axios";
import { isAxiosError } from "axios";
import { type ReactNode, createContext, useContext, useState } from "react";
import { z } from "zod";

const CredsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Creds = z.infer<typeof CredsSchema>;

export type AuthContextType = {
  user: any;
  signUp: (creds: Creds) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signUp = async ({ email, password }: Creds) => {
    try {
      const reposne = await axios.post<Creds>("api/app/auth/register", {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        isAuthenticated: !!user,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
