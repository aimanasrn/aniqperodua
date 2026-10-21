import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";
import { useReducedMotion } from "framer-motion";

const scrollPositions = new Map();

export default function usePageNavigation(title, description) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = title;
    if (description)
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
  }, [title, description]);

  useLayoutEffect(() => {
    const last = previous.current;
    previous.current = location;
    const rememberPosition = () =>
      scrollPositions.set(location.key, {
        top: window.scrollY,
        left: window.scrollX,
      });
    // Changing a variant updates the URL without moving the reader away.
    if (
      last &&
      last.pathname === location.pathname &&
      last.hash === location.hash &&
      last.search !== location.search
    )
      return rememberPosition;
    let restored = false;
    const frame = requestAnimationFrame(() => {
      let anchor = location.hash.slice(1);
      try {
        anchor = decodeURIComponent(anchor);
      } catch {
        /* Keep malformed fragments harmless. */
      }
      const target = anchor ? document.getElementById(anchor) : null;
      const saved =
        navigationType === "POP" ? scrollPositions.get(location.key) : null;
      if (saved) window.scrollTo({ ...saved, behavior: "instant" });
      else if (target)
        target.scrollIntoView({
          behavior: reducedMotion ? "instant" : "smooth",
          block: "start",
        });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (!last || last.pathname !== location.pathname)
        document.getElementById("main")?.focus({ preventScroll: true });
      restored = true;
    });
    return () => {
      cancelAnimationFrame(frame);
      if (restored) rememberPosition();
    };
  }, [location, navigationType, reducedMotion]);
}
