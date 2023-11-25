import axios from "@/services/axios";
import { wait } from "@/utils/promise";
import { clearToken, getToken, setToken } from "@/utils/token";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  SignInResponseSchema,
  SignInSchemaType,
  SignUpSchemaType,
} from "./types";

export type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (creds: SignInSchemaType) => Promise<void>;
  signInWithEmailAndPassword: (creds: SignInSchemaType) => Promise<void>;
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

  const signUp = async ({ email, password }: SignInSchemaType) => {
    await wait(1000);

    try {
      const reposne = await axios.post<any>("api/app/auth/register", {
        email,
        password,
        firstname: "",
        lastname: "",
      } as SignUpSchemaType);
    } catch (error) {
      throw error;
    }
  };

  const signInWithEmailAndPassword = async ({
    email,
    password,
  }: SignInSchemaType) => {
    await wait(1000);

    try {
      const reposne = await axios.post("api/app/auth/login", {
        email,
        password,
      } as SignInSchemaType);

      const { token } = SignInResponseSchema.parse(reposne.data);

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
