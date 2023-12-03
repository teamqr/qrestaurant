"use server";
import { TokenData } from "@/types/TokenData";
import { jwtDecode } from "jwt-decode";
import { serverUrl } from "@/config/serverConfig";
import { revalidateTag } from "next/cache";

export async function decodeToken(token: string) {
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
      next: { tags: ["restaurant"], revalidate: 5 },
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
      next: { tags: ["workers"], revalidate: 5 },
    });
    if (res.ok) {
      const json = await res.json();
      //console.log(json.workers);
      return json.workers;
    }
  }
  return [];
}

export async function deleteWorker(id: number, token?: string | null) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker/${id}`;
    fetch(reqUrl, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
      next: { tags: ["workers"], revalidate: 5 },
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const email = json?.worker?.email;
          console.log(`Poprawnie usunięto pracownika ${email}`);
          revalidateTag("workers");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export async function addWorker(
  email: string,
  password: string,
  token?: string | null
) {
  if (token) {
    const reqUrl = `${serverUrl}/api/dashboard/worker`;
    const reqBody = { email: email, password: password };
    fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      next: { tags: ["workers"], revalidate: 5 },
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const email = json?.worker?.email;
          console.log(`Poprawnie dodano pracownika ${email}`);
          revalidateTag("workers");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
