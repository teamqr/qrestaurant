import { serverUlr } from "@/config/serverConfig";
import { jwtDecode } from "jwt-decode";

export async function fetchRestaurantData(token: any) {
  if (token) {
    const tokenData: any = jwtDecode(token);
    const restaurantId: number = tokenData.restaurantId;
    const reqUrl = `${serverUlr}/api/dashboard/restaurant/${restaurantId}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      const json = await res.json();
      return json.restaurant;
    }
  }
  return null;
}
