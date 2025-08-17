import { ANCHORS } from "./anchors.constants";

export const PRIMARY_NAVIGATION = [
  {
    label: "Story",
    href: ANCHORS.OUR_STORY,
  },
  {
    label: "Events",
    href: ANCHORS.EVENTS,
  },
  {
    label: "Stay",
    href: ANCHORS.STAY,
  },
  {
    label: "Registry",
    href: ANCHORS.REGISTRY,
  },
] satisfies Array<{ label: string; href: string }>;
