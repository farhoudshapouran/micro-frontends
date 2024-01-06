import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl mb-1">
          Product Application
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          This is the product application that maintained by the{" "}
          <strong>Product Team</strong>
        </p>
      </div>
    </main>
  );
}
