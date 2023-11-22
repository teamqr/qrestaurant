import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type Creds = {
  email: string;
  password: string;
};

async function getToken(credentials: Creds) {
  const res = await fetch("http://127.0.0.1:8080/api/dashboard/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const json = await res.json();
    return JSON.stringify(json.token);
  }

  return null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials, req) {
        // Perform database operations
        const myCredentials: Creds = {
          email: req.body?.email,
          password: req.body?.password,
        };
        const token = await getToken(myCredentials);
        console.log("token", token);
        if (token) {
          return {
            id: "1",
            email: myCredentials.email,
            token: token,
          };
        }

        return null;
      },
    }),
  ],
};
