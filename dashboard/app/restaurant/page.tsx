import {
  addWorker,
  fetchRestaurantData,
  fetchWorkersData,
} from "@/utils/apiUtils";
import RestaurantPage from "@/components/restaurant/RestaurantPage";
import { revalidatePath, revalidateTag } from "next/cache";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { TokenData } from "@/types/TokenData";
import { Role } from "@/types/Role";

const RestaurantManagement = async () => {
  revalidatePath("/restaurant");
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData.role;

  const workersData = await fetchWorkersData(token);
  const restaurantData = await fetchRestaurantData(token);

  const addNewWorker = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await addWorker(email, password, token);

    revalidatePath("/restaurant");
  };

  const refresh = async () => {
    "use server";
    revalidateTag("workers");
    revalidateTag("restaurant");
  };

  return (
    <div>
      <RestaurantPage
        restaurantData={restaurantData}
        workersData={workersData}
        token={token}
      />
      {token && role == Role.ADMIN ? (
        <div className="m-5">
          <h1 className="text-2xl py-2">Dodaj pracownika</h1>
          <form
            className="flex flex-col justify-start items-start"
            action={addNewWorker}
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
          <form
            className="flex flex-col justify-center items-center"
            action={refresh}
          >
            <button
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 "
              type="submit"
            >
              Odśwież dane
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RestaurantManagement;
