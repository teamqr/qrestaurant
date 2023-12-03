import HomePage from "@/components/HomePage";
import { fetchRestaurantData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";

const Home = async () => {
  const token = await getTokenFromCookies();

  const restaurantData = await fetchRestaurantData(token);

  return (
    <div>
      <HomePage restaurantName={restaurantData?.name} />
    </div>
  );
};

export default Home;
