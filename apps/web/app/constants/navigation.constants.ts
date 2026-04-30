import { ANCHORS } from "~/app/constants/anchors.constants";

export const PRIMARY_NAVIGATION = [
  {
    label: "Story",
    path: "/",
    hash: ANCHORS.OUR_STORY,
  },
  {
    label: "Events",
    path: "/",
    hash: ANCHORS.EVENTS,
  },
  {
    label: "Stay",
    path: "/",
    hash: ANCHORS.STAY,
  },
  {
    label: "FAQ",
    path: "/",
    hash: ANCHORS.FAQ,
  },
  {
    label: "Registry",
    path: "/",
    hash: ANCHORS.REGISTRY,
  },
] satisfies Array<{ label: string; path: string; hash: string }>;
