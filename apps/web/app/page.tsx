import { Hero } from "~/app/components/hero-section";
import { Registry } from "~/app/components/registry-section";
import { Stay } from "~/app/components/stay-section";
import { Story } from "~/app/components/story-section";
import { Wedding } from "~/app/components/wedding-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Wedding />
      <Stay />
      <Registry />
    </main>
  );
}
