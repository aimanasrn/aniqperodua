import { useSyncExternalStore } from "react";
import Scanner from "./Scanner";

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

export default function ScannerBackground() {
  const dark = useSyncExternalStore(
    subscribeToTheme,
    getDarkMode,
    getServerDarkMode,
  );

  return (
    <div className="site-scanner-background" aria-hidden="true">
      <Scanner
        color1="#ED1C24"
        color2="#FB7185"
        color3={dark ? "#FFFFFF" : "#ED1C24"}
        lightMode={!dark}
        opacity={dark ? 0.65 : 0.45}
        brightness={0.8}
        mouseInteraction={false}
        mouseMode="repel"
        clickEffect="none"
        intro={false}
        scanline={false}
        grain={false}
        dpr={1}
        frequency={1.1}
        bandDensity={25}
        speed={0.1}
      />
    </div>
  );
}
