import { serverUrl } from "@/config/serverConfig";

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
