import { Hero } from "~/app/components/hero-section";
import { Story } from "~/app/components/story-section";
import { Wedding } from "~/app/components/wedding-section/wedding-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Wedding />
    </main>
  );
}
