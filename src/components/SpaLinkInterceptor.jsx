import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { normalizeInternalHref } from "../utils/navigation";

export default function SpaLinkInterceptor() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const target = anchor.getAttribute("target");
      if (target && target.toLowerCase() !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      const normalizedHref = normalizeInternalHref(rawHref, window.location.href);
      if (!normalizedHref) return;

      const current = `${location.pathname}${location.search}${location.hash}`;
      if (current === normalizedHref) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      navigate(normalizedHref);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [location.hash, location.pathname, location.search, navigate]);

  return null;
}
