"use server";
import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";
import { serverUrl } from "@/config/serverConfig";
import { revalidatePath } from "next/cache";
import { WorkerData } from "@/types/WorkerData";
import { MenuData } from "@/types/MenuData";
import { MealData } from "@/types/MealData";
import { RestaurantData } from "@/types/RestaurantData";
import { TableData } from "@/types/TableData";

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

export async function fetchRestaurantData(
  token: string | null
): Promise<RestaurantData> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["restaurant"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();

      return json.restaurant;
    }
  }
  return {} as RestaurantData;
}

export async function fetchWorkersData(
  token: string | null
): Promise<WorkerData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["workers"] },
      cache: "no-store",
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
      next: { tags: ["workers"] },
      cache: "no-store",
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
      next: { tags: ["workers"] },
      cache: "no-store",
    });
    revalidatePath("/restaurant");
  }
}
export async function editRestaurant(name: string, token?: string | null) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
    const reqBody = { name };
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["restaurant"] },
      cache: "no-store",
    });
    revalidatePath("/restaurant");
  }
}

export async function createMenu(token: string) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/menu`;
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["menu"] },
      cache: "no-store",
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
      next: { tags: ["menu"] },
      cache: "no-store",
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
      next: { tags: ["meals"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.meals;
    }
  }
  return [] as MealData[];
}

export async function fetchMealData(
  id: number,
  token: string | null
): Promise<MealData> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal/${id}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["meals"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.meal;
    }
  }
  return {} as MealData;
}

export async function addMeal(
  name: string,
  description: string | null,
  price: number,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal`;
    const reqBody = { name, description, price };
    await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["meals"] },
      cache: "no-store",
    });
    revalidatePath("/menu");
  }
}

export async function editMeal(
  id: number,
  name: string,
  description: string | null,
  price: number,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal`;
    const reqBody = { id, name, description, price };
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["meals"] },
      cache: "no-store",
    });
    revalidatePath("/menu");
  }
}

export async function fetchTablesData(
  token: string | null
): Promise<TableData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/table`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["tables"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.tables;
    }
  }
  return [];
}
