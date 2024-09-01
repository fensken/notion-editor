import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center ">
      <ArrowLeft className="w-12 animate-pulse" />

      <h1 className="font-bold">Get started by creating a new document</h1>
    </main>
  );
}
