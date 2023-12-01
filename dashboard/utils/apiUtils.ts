import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";
import { serverUrl } from "@/config/serverConfig";
import { revalidatePath } from "next/cache";

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

export async function fetchWorkersData(token: any) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      const json = await res.json();
      return json.workers;
    }
  }
  return null;
}

export function deleteWorker(id: number, token?: string): any {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker/${id}`;
    fetch(reqUrl, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const email = json?.worker?.email;
          console.log(`Poprawnie usunięto pracownika ${email}`);
          revalidatePath("/restaurant");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
