"use client";

import dynamic from "next/dynamic";

// The stage needs the browser (WebGL, window size), so it is never server-rendered.
const Stage = dynamic(() => import("./Stage"), { ssr: false });

export function StageMount() {
  return <Stage />;
}
