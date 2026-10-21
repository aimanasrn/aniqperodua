import { useSyncExternalStore } from "react";
import DotGrid from "./DotGrid";
import { Reveal } from "./UI";

function subscribeToTheme(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getDarkMode = () => document.documentElement.classList.contains("dark");
const getServerDarkMode = () => false;

export default function DotGridBackground() {
  const dark = useSyncExternalStore(
    subscribeToTheme,
    getDarkMode,
    getServerDarkMode,
  );

  return (
    <Reveal className="hero-dot-grid-background" offset={0} aria-hidden="true">
      <DotGrid
        dotSize={3}
        gap={21}
        baseColor={dark ? "#343840" : "#D5D7DC"}
        activeColor="#ED1C24"
        opacity={dark ? 0.85 : 0.65}
        intro={false}
        dpr={1}
        clickShock={false}
      />
    </Reveal>
  );
}
