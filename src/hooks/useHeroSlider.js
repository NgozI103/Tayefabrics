import { useEffect } from "react";
import Glide from "@glidejs/glide";

export default function useHeroSlider() {
  useEffect(() => {
    const slider1 = document.querySelector("#glide1");
    if (!slider1) return;

    const glide = new Glide(slider1, {
      type: "carousel",
      startAt: 0,
      autoplay: 3000,
      gap: 0,
      hoverpause: true,
      perView: 1,
      animationDuration: 800,
      animationTimingFunc: "linear",
    });

    glide.mount();

    return () => {
      try {
        glide.destroy();
      } catch {
        // noop
      }
    };
  }, []);
}
