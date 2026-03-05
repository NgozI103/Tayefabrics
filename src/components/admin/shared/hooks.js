import { useEffect } from "react";

import { GLOBAL_CSS } from "./theme";

export function useBoxicons() {
  useEffect(() => {
    if (document.getElementById("boxicons-css")) {
      return;
    }

    const link = document.createElement("link");
    link.id = "boxicons-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css";
    document.head.appendChild(link);
  }, []);
}

export function useAdminGlobalStyles() {
  useEffect(() => {
    const existing = document.getElementById("ank-global");

    if (existing) {
      return undefined;
    }

    const styleTag = document.createElement("style");
    styleTag.id = "ank-global";
    styleTag.textContent = GLOBAL_CSS;
    document.head.appendChild(styleTag);

    return () => {
      document.getElementById("ank-global")?.remove();
    };
  }, []);
}
