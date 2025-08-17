"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useIsClient, useMediaQuery, useOnClickOutside, useScrollLock } from "usehooks-ts";
import { PRIMARY_NAVIGATION } from "../constants/navigation.constants";

export function SiteHeader() {
  const { isLocked: isMenuOpen, lock, unlock } = useScrollLock({ autoLock: false });
  const pathname = usePathname();
  const currentPath = React.useRef(pathname);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isMobileScreen = useMediaQuery("(max-width: 756px)");
  const isClient = useIsClient();

  useOnClickOutside(headerRef as React.RefObject<HTMLElement>, () => {
    unlock();
  });

  React.useEffect(() => {
    if (isMenuOpen && pathname !== currentPath.current) {
      unlock();
    }

    currentPath.current = pathname;
  }, [pathname, isMenuOpen, unlock]);

  // Handle keyboard events
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === "Escape") {
        unlock();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, unlock]);

  const handleLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === e.currentTarget.pathname) {
        unlock();
      }
    },
    [unlock, pathname],
  );

  const toggle = React.useCallback(() => {
    if (isMenuOpen) {
      unlock();
    } else {
      lock();
    }
  }, [isMenuOpen, lock, unlock]);

  return (
    <React.Fragment>
      {isMenuOpen && <meta name="theme-color" content="#ec4926" />}

      <header ref={headerRef} className="sticky top-0 left-0 px-6 md:px-8">
        <div className="z-1 mx-auto h-site-header-h w-full max-w-site-container-w">
          <nav className="flex h-full items-center justify-between">
            <div className="block md:hidden">
              <MobileMenuTrigger isMenuOpen={isMenuOpen} onClick={toggle} ref={menuButtonRef} />
            </div>
            <div className="hidden md:block">
              <DesktopMenu />
            </div>
            <span
              data-open={isMenuOpen}
              className="-translate-x-1/2 absolute left-1/2 z-1 font-medium font-sans text-sm text-text-secondary data-[open=true]:text-text-inverse md:text-lg"
            >
              16 May 2026
            </span>
            <div className="relative z-1 flex gap-3">
              <Link href="" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
                RSVP
              </Link>
            </div>
          </nav>
        </div>
        {isMobileScreen && isClient && (
          <MobileMenu inert={!isMenuOpen} data-open={isMenuOpen} onLinkClick={handleLinkClick} />
        )}
      </header>
    </React.Fragment>
  );
}

function MobileMenuTrigger({
  isMenuOpen,
  onClick,
  ref,
}: {
  isMenuOpen: boolean;
  onClick: () => void;
  ref: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      data-slot="mobile-menu-trigger"
      ref={ref}
      onClick={onClick}
      type="button"
      className="relative z-1 flex items-center gap-1 text-sm"
    >
      <span className="flex size-[1ex] rounded-full bg-accent" />
      <span className="font-medium">{isMenuOpen ? "Close" : "Menu"}</span>
    </button>
  );
}

interface MobileMenuProps extends React.ComponentPropsWithoutRef<"div"> {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
function MobileMenu({ onLinkClick, ...rest }: MobileMenuProps) {
  return (
    <div
      {...rest}
      className="-translate-y-full pointer-events-none absolute top-0 left-0 z-0 w-full opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
    >
      <ul className="w-screen overflow-clip rounded-b-3xl bg-accent px-10 pt-[calc(var(--spacing-site-header-h)*2))] pb-site-header-h">
        {PRIMARY_NAVIGATION.map((item) => {
          return (
            <li key={item.href}>
              <Link
                href={{
                  hash: item.href,
                }}
                className="font-medium font-sans text-lg text-text-primary"
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DesktopMenu() {
  return (
    <ul className="flex gap-3">
      {PRIMARY_NAVIGATION.map((item) => {
        return (
          <li key={item.href}>
            <Link
              href={{
                hash: item.href,
              }}
              className="font-medium font-sans text-lg text-text-primary"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
