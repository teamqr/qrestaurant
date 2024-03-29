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
import { MealCategoryData } from "@/types/MealCategoryData";
import { OrderData } from "@/types/OrderData";
import { OrderEntry } from "@/types/OrderEntry";
import { OrderStatus } from "@/types/OrderStatus";

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
export async function editRestaurant(
  name: string,
  image: string,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/restaurant`;
    const reqBody = { name, image };
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
  image: string,
  mealCategoryIds: number[],
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal`;
    const reqBody = { name, description, price, image, mealCategoryIds };
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
  image: string,
  mealCategoryIds: number[],
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal`;
    const reqBody = { id, name, description, price, image, mealCategoryIds };
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

export async function fetchTableData(
  id: number,
  token: string | null
): Promise<TableData> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/table/${id}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["tables"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.table;
    }
  }
  return {} as TableData;
}

export async function addTable(
  number: number,
  prefix: string,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/table`;
    const reqBody = { number, prefix };
    await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["tables"] },
      cache: "no-store",
    });
    revalidatePath("/tables");
  }
}

export async function editTable(
  id: number,
  number: number,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/table`;
    const reqBody = { id, number };
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["tables"] },
      cache: "no-store",
    });
    revalidatePath("/tables");
  }
}

export async function deleteTable(id: number, token?: string | null) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/table/${id}`;
    await fetch(reqUrl, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["tables"] },
      cache: "no-store",
    });
    revalidatePath("/tables");
  }
}

export async function fetchCategoriesData(
  token: string | null
): Promise<MealCategoryData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-category`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.mealCategories;
    }
  }
  return [] as MealCategoryData[];
}

export async function fetchCategoryData(
  id: number,
  token: string | null
): Promise<MealCategoryData> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-category/${id}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.mealCategory;
    }
  }
  return {} as MealCategoryData;
}

export async function addCategory(name: string, token?: string | null) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-category`;
    const reqBody = { name };
    await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    revalidatePath("/menu");
  }
}

export async function editCategory(
  id: number,
  name: string,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-category`;
    const reqBody = { id, name };
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    revalidatePath("/menu");
  }
}

export async function deleteCategory(id: number, token?: string | null) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-category/${id}`;
    await fetch(reqUrl, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    revalidatePath("/menu");
  }
}

export async function fetchOrdersHistoryData(
  token: string | null
): Promise<OrderData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/order/history`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["orders"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.orders;
    }
  }
  return [] as OrderData[];
}
export async function fetchOrdersInProgressData(
  token: string | null
): Promise<OrderData[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/order/in-progress`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["orders"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.orders;
    }
  }
  return [] as OrderData[];
}

export async function fetchOrderData(
  id: number,
  token: string | null
): Promise<OrderData> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/order/${id}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["orders"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.order;
    }
  }
  return {} as OrderData;
}

export async function fetchOrderEntriesByOrderId(
  orderId: number,
  token: string | null
): Promise<OrderEntry[]> {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/meal-order/${orderId}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["orders"] },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.mealOrders;
    }
  }
  return [] as OrderEntry[];
}

export async function changeOrderState(
  id: number,
  status: OrderStatus,
  completionDate: Date | null,
  token?: string | null
) {
  "use server";
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/order`;
    const reqBody = { id, status, completionDate };
    await fetch(reqUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["orders"] },
      cache: "no-store",
    });
    revalidatePath("/orders");
  }
}
