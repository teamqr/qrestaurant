import { serverUlr } from "@/config/serverConfig";
import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string) {
  const decodedToken: any = jwtDecode(token);
  const tokenData: TokenData = {
    restaurantId: decodedToken?.restaurantId,
    role: decodedToken?.scope[0],
  };
  return tokenData;
}

export async function fetchRestaurantData(token: any) {
  if (token) {
    const tokenData: TokenData = decodeToken(token);
    const reqUrl = `${serverUlr}/api/dashboard/restaurant/${tokenData.restaurantId}`;
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
