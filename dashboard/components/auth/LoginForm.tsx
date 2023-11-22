"use client";
import { AuthCredentials } from "@/types/AuthCredentials";
import { signIn } from "next-auth/react";
import { useState } from "react";
import React from "react";

type Props = {
  callBackUrl?: string;
  error?: string;
};

const LoginForm = (props: Props) => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const copy: AuthCredentials = { ...credentials };
    const name: string = e.target.name;
    copy[name as keyof AuthCredentials] = e.target.value;
    setCredentials(copy);
  }

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: props.callBackUrl ?? "http:/localhost:3000/",
    });
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        className="block rounded-md border-0 my-4 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Adres e-mail"
        name="email"
        value={credentials.email}
        onChange={handleChange}
      />
      <input
        type="password"
        className="block rounded-md border-0 my-4 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Hasło"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 "
        onClick={handleSubmit}
      >
        Zaloguj się
      </button>
    </div>
  );
};

export default LoginForm;
