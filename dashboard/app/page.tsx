import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <header className="flex justify-center items-center text-5xl mb-8">
        <strong>QR</strong>estaurant
      </header>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}
