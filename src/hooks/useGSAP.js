import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useGSAP = (callback, dependencies = []) => {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });

    return () => ctx.revert(); // Cleanup memory
  }, dependencies);
};
