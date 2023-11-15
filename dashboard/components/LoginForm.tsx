import React from "react";

const LoginForm = () => {
  return (
    <form className="flex flex-col items-center">
      <input
        type="text"
        className="block rounded-md border-0 my-4 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Adres e-mail"
      />
      <input
        type="password"
        className="block rounded-md border-0 my-4 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Hasło"
      />

      <button
        type="submit"
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 "
      >
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
