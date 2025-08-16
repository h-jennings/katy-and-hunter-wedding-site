import Link from "next/link";
import { ANCHORS } from "~/app/constants/anchors.constants";

export function SiteHeader() {
  return (
    <header className="top-0 left-0 h-[50px] px-8">
      <div className="mx-auto h-full w-full max-w-site-container-w">
        <nav className="flex h-full items-center justify-between">
          <ul className="flex gap-3">
            <li>
              <Link
                href={{
                  hash: ANCHORS.OUR_STORY,
                }}
                className="font-medium font-sans text-lg text-text-primary"
              >
                Story
              </Link>
            </li>
            <li>
              <Link href={{ hash: ANCHORS.EVENTS }} className="font-medium font-sans text-lg text-text-primary">
                Events
              </Link>
            </li>
            <li>
              <Link href={{ hash: ANCHORS.STAY }} className="font-medium font-sans text-lg text-text-primary">
                Stay
              </Link>
            </li>
            <li>
              <Link href="" className="font-medium font-sans text-lg text-text-primary">
                Resigtry
              </Link>
            </li>
          </ul>
          <span className="-translate-x-1/2 absolute left-1/2 font-medium font-sans text-lg text-text-secondary">
            16 May 2026
          </span>
          <div className="flex gap-3">
            <Link href="" className="flex px-2 font-medium font-sans text-lg text-text-primary">
              RSVP
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
