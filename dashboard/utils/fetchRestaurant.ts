import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";
import { serverUrl } from "@/config/serverConfig";

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
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
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
