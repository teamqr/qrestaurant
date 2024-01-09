"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Role } from "@/types/Role";
import HomePageSection from "./HomePageSection";
import { redirect } from "next/navigation";

type Props = {
  restaurantName: string | null;
  token: string | null;
};

const HomePage = (props: Props) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/login")
    }
  });
  
  useEffect(() => {
    if (!props.token)
      signOut({ redirect: false });
  }, [props.token])

  if (status === "loading") {
    return <></>;
  }

  const restaurant = props?.restaurantName;

  const role = session?.user?.role == Role.ADMIN ? "Administrator" : "Pracownik";

  return (
    <div className="flex flex-col px-5">
      <h1 className="flex flex-col justify-center items-center">
        Strona główna
      </h1>
      <main className="mx-10">
        <div id="userData" className="flex justify-between mb-10">
          <div>
            <h2>Restauracja: {restaurant} </h2>
          </div>
          <div className="flex flex-col items-end">
            <h2>Zalogowano jako: {session.user?.email}</h2>
            <h2>Rola: {role} </h2>
          </div>
        </div>
        <div className="flex justify-evenly gap-10 items-center flex-wrap h-72">
          {session.user?.role == Role.ADMIN ? (
            <>
              <HomePageSection href="/restaurant">
                <h2 className="flex items-center">Zarządzanie restauracją</h2>
                <p>
                  Sekcja informacji o restauracji oraz zarządzania kontami
                  pracowników.
                </p>
              </HomePageSection>
              <HomePageSection href="/menu">
                <h2>Zarządzanie menu</h2>
                <p>
                  Sekcja zarządzania posiłkami dostępnymi w ofercie restauracji.
                </p>
              </HomePageSection>
            </>
          ) : (
            <></>
          )}
          <HomePageSection href="/tables">
            <h2>Zarządzanie stolikami</h2>
            <p>
              Sekcja zarządzania stolikami w restauracji oraz przypisanymi do
              nich kodami QR.
            </p>
          </HomePageSection>
          <HomePageSection href="/orders">
            <h2>Oczekujące zamówienia</h2>
            <p>Sekcja zarządzania aktualnie oczekującymi zamówieniami.</p>
          </HomePageSection>
          <HomePageSection href="/orders/history">
            <h2>Historia zamówień</h2>
            <p>Sekcja historii zamówień.</p>
          </HomePageSection>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
