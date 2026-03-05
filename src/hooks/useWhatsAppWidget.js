import { useEffect } from "react";

export default function useWhatsAppWidget() {
  useEffect(() => {
    if (document.getElementById("whatsapp-widget-link")) return;

    const link = document.createElement("a");
    link.id = "whatsapp-widget-link";
    link.className = "whatsapp-float";
    link.href = "https://wa.me/2347063701725";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Chat with us on WhatsApp");
    link.innerHTML = '<i class="bx bxl-whatsapp" aria-hidden="true"></i>';

    document.body.appendChild(link);
  }, []);
}
