import Image from "next/image";
import Navbar from "../../../components/Navbar";

export default function Unit4Page() {
  const images = Array.from({ length: 32 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-36 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          CMOS VLSI Design - Unit 4
        </h1>

        <div className="space-y-8">
          {images.map((num) => (
            <Image
              key={num}
              src={`/notes/cmos-vlsi-design/unit-4/${num}.jpg`}
              alt={`Page ${num}`}
              width={1200}
              height={1600}
              className="w-full rounded-xl"
            />
          ))}
        </div>
      </div>
    </main>
  );
}