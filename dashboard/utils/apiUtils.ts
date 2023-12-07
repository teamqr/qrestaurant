"use server";
import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";
import { serverUrl } from "@/config/serverConfig";
import { revalidatePath, revalidateTag } from "next/cache";
import { WorkerData } from "@/types/WorkerData";
import { MenuData } from "@/types/MenuData";
import { MealData } from "@/types/MealData";

export async function decodeToken(token: string | null): Promise<TokenData> {
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const tokenData: TokenData = {
      userId: decodedToken?.userId,
      restaurantId: decodedToken?.restaurantId,
      role: decodedToken?.scope[0],
    };
    return tokenData;
  }
  return {} as TokenData;
}

export async function fetchRestaurantData(token: string | null) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["restaurant"], revalidate: 1 },
    });
    if (res.ok) {
      const json = await res.json();

      return json.restaurant;
    }
  }
  return null;
}

export async function fetchWorkersData(
  token: string | null
): Promise<WorkerData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["workers"], revalidate: 1 },
    });
    if (res.ok) {
      const json = await res.json();
      return json.workers;
    }
  }
  return [];
}

export async function deleteWorker(id: number, token?: string | null) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker/${id}`;
    await fetch(reqUrl, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    revalidatePath("/restaurant");
  }
}

export async function addWorker(
  email: string,
  password: string,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker`;
    const reqBody = { email, password };
    await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    revalidatePath("/restaurant");
  }
}
export async function changeRestaurantName(
  newName: string,
  token?: string | null
) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
    const reqBody = { name: newName };
    fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["restaurant"], revalidate: 5 },
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const name = json?.restaurant?.name;
          console.log(`Poprawnie zmieniono nazwę restauracji na ${name}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export async function createMenu(token: string) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/menu`;
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["menu"], revalidate: 1 },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  }
  return null;
}

export async function fetchMenuData(
  token: string | null
): Promise<MenuData | null> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/menu`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["menu"], revalidate: 1 },
    });

    if (res.ok) {
      const json = await res.json();
      return json.menu;
    } else if (res.status == 404) {
      const newMenu = await createMenu(token);
      return newMenu;
    }
  }
  return null;
}

export async function fetchMealsData(
  token: string | null
): Promise<MealData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["meals"], revalidate: 1 },
    });
    if (res.ok) {
      const json = await res.json();
      return json.meals;
    }
  }
  return [] as MealData[];
}
