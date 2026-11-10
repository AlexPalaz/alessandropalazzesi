"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { stage } from "./state";

/**
 * Turns scroll into scene progress. Every element with `data-scene="n"` (n ≥ 1)
 * opens scene n while its top edge crosses the viewport; the stage reads the
 * result from `stage.t`. Scrolling is free (smoothed, never locked). Renders nothing.
 */
export function ScrollDirector() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stage.reduced = reduced;

    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (!reduced) {
      lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    let removeRouteListener = () => {};
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const progress = sections.map(() => 0);
      // The scene value chases the scroll with a short ease, so flights feel filmed.
      const chase = reduced ? null : gsap.quickTo(stage, "t", { duration: 0.7, ease: "power3" });
      const publish = () => {
        const t = progress.reduce((sum, value) => sum + value, 0);
        if (chase) chase(t);
        else stage.t = t;
      };

      sections.forEach((element, index) => {
        if (Number(element.dataset.scene) === 0) return;
        ScrollTrigger.create({
          trigger: element,
          start: "top 90%",
          end: "top 20%",
          onUpdate: (self) => {
            progress[index] = self.progress;
            publish();
          },
          onRefresh: (self) => {
            progress[index] = self.progress;
            publish();
          },
        });
      });

      // Lab route: read where the captions' markers sit, so the 3D stops stand above them.
      const measureRoute = () => {
        const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-route-anchor]")).map((anchor) =>
          anchor.getBoundingClientRect(),
        );
        const inOneRow = anchors.length > 1 && anchors.every((rect) => Math.abs(rect.top - anchors[0].top) < 4);
        if (!inOneRow) {
          stage.route.x0 = -0.72;
          stage.route.step = 0.48;
          return;
        }
        const centre = (rect: DOMRect) => ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
        const first = centre(anchors[0]);
        stage.route.x0 = first;
        stage.route.step = (centre(anchors[anchors.length - 1]) - first) / (anchors.length - 1);
      };
      measureRoute();
      ScrollTrigger.addEventListener("refresh", measureRoute);
      document.fonts?.ready.then(measureRoute);
      removeRouteListener = () => ScrollTrigger.removeEventListener("refresh", measureRoute);

      // Opening move: only when the page loads at the top.
      if (reduced || window.scrollY > 10) stage.intro = 1;
      else gsap.fromTo(stage, { intro: 0 }, { intro: 1, duration: 2.6, ease: "power1.out", delay: 0.15 });
    });

    return () => {
      removeRouteListener();
      context.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
