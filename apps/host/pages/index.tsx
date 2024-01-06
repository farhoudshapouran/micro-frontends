import Head from "next/head";
// sections
import HomeHero from "@/sections/home/home-hero";
import HomeIntroduction from "@/sections/home/home-introduction";
import HomeDemo from "@/sections/home/home-demo";

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <div>
      <Head>
        <title>Micro Frontends</title>
      </Head>
      <HomeHero />

      <HomeIntroduction />

      <HomeDemo />
    </div>
  );
}
