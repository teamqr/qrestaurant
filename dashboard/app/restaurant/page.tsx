import { fetchRestaurantData, fetchWorkersData } from "@/utils/apiUtils";
import RestaurantPage from "@/components/restaurant/RestaurantPage";
import { revalidatePath } from "next/cache";
import { checkAdminAccess } from "@/utils/tokenUtils";
import AddWorkerForm from "@/components/restaurant/AddWorkerForm";

const RestaurantManagement = async () => {
  revalidatePath("/restaurant");
  const token: string = await checkAdminAccess();

  const workersData = await fetchWorkersData(token);
  const restaurantData = await fetchRestaurantData(token);

  return (
    <div>
      <RestaurantPage
        restaurantData={restaurantData}
        workersData={workersData}
        token={token}
      />
    </div>
  );
};

export default RestaurantManagement;
