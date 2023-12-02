import { fetchRestaurantData, fetchWorkersData } from "@/utils/apiUtils";
import RestaurantPage from "@/components/RestaurantPage";
import { revalidatePath } from "next/cache";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const RestaurantManagement = async () => {
  revalidatePath("/restaurant", "page");
  const token = await getTokenFromCookies();

  let restaurantName;
  let workersData;

  try {
    const restaurantData = await fetchRestaurantData(token);
    restaurantName = restaurantData.name;
    workersData = await fetchWorkersData(token);
  } catch (error) {
    console.error(
      "Nie udało się pobrać tokenu użytkownika. Zaloguj się ponownie"
    );
  }

  return (
    <RestaurantPage
      restaurantName={restaurantName}
      workersData={workersData}
      token={token}
    />
  );
};

export default RestaurantManagement;
