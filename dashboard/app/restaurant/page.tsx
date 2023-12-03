import {
  addWorker,
  fetchRestaurantData,
  fetchWorkersData,
} from "@/utils/apiUtils";
import RestaurantPage from "@/components/RestaurantPage";
import { revalidateTag } from "next/cache";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";

const RestaurantManagement = async () => {
  const token: string = (await getTokenFromCookies()) as string;
  let role: string = "";
  if (token) {
    const tokenData = await getTokenData(token);
    role = tokenData.role;
  }

  let workersData;
  let restaurantName;
  try {
    workersData = await fetchWorkersData(token);
    const restaurantData = await fetchRestaurantData(token);
    restaurantName = restaurantData.name;
  } catch (err) {
    console.error(err);
  }

  const addNewWorker = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    addWorker(email, password, token)
      .then(async () => {
        revalidateTag("workers");
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div>
      <RestaurantPage
        restaurantName={restaurantName}
        workersData={workersData}
        token={token}
      />
      {token && role == "ADMIN" ? (
        <form
          className="flex flex-col justify-center items-center"
          action={addNewWorker}
        >
          <input className="text-black" type="text" name="email" />
          <input className="text-black" type="password" name="password" />
          <button type="submit">Dodaj</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RestaurantManagement;
