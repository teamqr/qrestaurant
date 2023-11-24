import axios from "@/services/axios";
import { clearToken, getToken, setToken } from "@/utils/token";
import { isAxiosError } from "axios";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { z } from "zod";

const CredsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInWithEmailAndPasswordResponseSchema = z.object({
  token: z.string(),
});

type Creds = z.infer<typeof CredsSchema>;
type SignInWithEmailAndPasswordResponse = z.infer<
  typeof SignInWithEmailAndPasswordResponseSchema
>;

export type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (creds: Creds) => Promise<void>;
  signInWithEmailAndPassword: (creds: Creds) => Promise<void>;
  signOut: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getToken()
      .then((token) => {
        if (token) {
          setUser({
            email: "",
            token,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  const signInWithEmailAndPassword = async ({ email, password }: Creds) => {
    try {
      const reposne = await axios.post<Creds>("api/app/auth/login", {
        email,
        password,
      });

      const { token } = SignInWithEmailAndPasswordResponseSchema.parse(
        reposne.data,
      );

      setUser({
        email,
        token,
      });
      await setToken(token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await clearToken();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        isAuthenticated: !!user,
        loading,
        signUp,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
