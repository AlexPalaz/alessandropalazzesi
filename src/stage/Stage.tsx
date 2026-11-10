"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Particles } from "./Particles";

type Setup = { webgl: boolean; count: number; maxDpr: number };

/** Picks a particle budget for the device, once. */
function detect(): Setup {
  const probe = document.createElement("canvas");
  const webgl = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  const small = window.matchMedia("(max-width: 767px)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const count = small ? 12000 : cores <= 4 ? 16000 : 24000;
  return { webgl, count, maxDpr: small ? 1.5 : 1.75 };
}

/**
 * The persistent WebGL stage. It is mounted once in the layout and stays fixed
 * behind the page, so the 3D world survives every scroll and navigation.
 */
export default function Stage() {
  const [setup] = useState(detect);

  if (!setup.webgl) {
    // No WebGL: the brand's point, still, in the hero position.
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh">
        <div className="absolute top-[18%] right-[8%] aspect-square w-[min(44vw,42vh)] rounded-full bg-cobalt" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh">
      <Canvas
        dpr={[1, setup.maxDpr]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 34, near: 0.1, far: 80, position: [0, 0, 4.9] }}
      >
        <Particles count={setup.count} />
      </Canvas>
    </div>
  );
}
