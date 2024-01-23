import { addWorker } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import React from "react";

type Props = {
  token: string;
};

const AddWorkerForm = async (props: Props) => {
  const addWorkerAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await addWorker(email, password, props.token);

    revalidatePath("/restaurant");
  };
  return (
    <div className="m-5">
      <h2 className="py-2">Dodaj pracownika</h2>
      <form
        className="flex flex-col justify-start items-start"
        action={addWorkerAction}
      >
        <input
          className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
          type="text"
          name="email"
          placeholder="Adres e-mail pracownika"
        />
        <input
          className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
          type="password"
          name="password"
          placeholder="Hasło pracownika"
        />
        <button
          className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
          type="submit"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default AddWorkerForm;
