import HomePage from "@/components/home/HomePage";
import { fetchRestaurantData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import { revalidatePath } from "next/cache";
import React from "react";

const Home = async () => {
  revalidatePath("/");
  const token = await getTokenFromCookies();
  const restaurantData = await fetchRestaurantData(token);

  return (
    <div>
      <HomePage restaurantName={restaurantData?.name} token={token} />
    </div>
  );
};

export default Home;
