"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COMPACT_WIDTH, RIGS, emptyShot, frameShot, sampleShot } from "./director";
import { DOT, buildFormations } from "./formations";
import { fragmentShader, vertexShader } from "./shaders";
import { stage } from "./state";

/** "#rrggbb" to 0..1 components, written straight to the framebuffer (already sRGB). */
function hexToVec3(hex: string, out: THREE.Vector3) {
  const value = parseInt(hex.trim().replace("#", ""), 16);
  if (Number.isNaN(value)) return out;
  return out.set(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

/** The live uniforms, reached through the mounted object rather than the memoised material. */
function uniformsOf(object: THREE.Points | null) {
  return object ? (object.material as THREE.ShaderMaterial).uniforms : null;
}

export function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const shot = useRef(emptyShot());
  const spin = useRef(0);
  const light = useRef(new THREE.Vector2());
  const slow = useRef({ frames: 0, time: 0 });

  const geometry = useMemo(() => {
    const f = buildFormations(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(f.sphere, 3));
    g.setAttribute("aAgents", new THREE.BufferAttribute(f.agents, 3));
    g.setAttribute("aLattice", new THREE.BufferAttribute(f.lattice, 3));
    g.setAttribute("aTerrain", new THREE.BufferAttribute(f.terrain, 3));
    g.setAttribute("aPoint", new THREE.BufferAttribute(f.point, 3));
    g.setAttribute("aSizeA", new THREE.BufferAttribute(f.sizeA, 4));
    g.setAttribute("aSizeB", new THREE.BufferAttribute(f.sizeB, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(f.seed, 1));
    g.setAttribute("aInk", new THREE.BufferAttribute(f.ink, 1));
    g.setAttribute("aTone", new THREE.BufferAttribute(f.tone, 1));
    g.setAttribute("aFlow", new THREE.BufferAttribute(f.flow, 1));
    g.setAttribute("aLab", new THREE.BufferAttribute(f.lab, 4));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uT: { value: 0 },
          uTime: { value: 0 },
          uPx: { value: 1 },
          uInvert: { value: 0 },
          uFocus: { value: 5 },
          uIntro: { value: 1 },
          uOpacity: { value: 1 },
          uLight: { value: new THREE.Vector3(-0.52, 0.62, 0.59) },
          uLab: { value: new THREE.Vector3(4, -2.1, 1.4) },
          uDot: { value: new THREE.Vector3(0.141, 0.251, 0.847) },
          uInkColor: { value: new THREE.Vector3(0.078, 0.078, 0.086) },
        },
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  // Theme: colours live in CSS tokens; re-read them whenever data-theme changes.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      const u = uniformsOf(points.current);
      if (!u) return;
      const css = getComputedStyle(root);
      hexToVec3(css.getPropertyValue("--stage-dot"), u.uDot.value);
      hexToVec3(css.getPropertyValue("--stage-ink"), u.uInkColor.value);
      u.uInvert.value = Number(css.getPropertyValue("--stage-invert")) || 0;
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      stage.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      stage.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const { width, height } = state.size;
    const portrait = width < COMPACT_WIDTH || width / height < 0.85;
    const reduced = stage.reduced;
    const u = uniformsOf(points.current);
    if (!u) return;

    const t = reduced ? Math.round(stage.t) : stage.t;
    const rig = portrait ? RIGS.compact : RIGS.desktop;
    const s = sampleShot(rig, t, shot.current);
    const frame = frameShot(s, width / height);
    const intro = reduced ? 1 : stage.intro;

    // Pointer: eased, moves the light and nudges the camera for parallax.
    const ease = 1 - Math.exp(-delta * 4);
    light.current.x += (stage.pointerX - light.current.x) * ease;
    light.current.y += (stage.pointerY - light.current.y) * ease;
    const px = reduced ? 0 : light.current.x;
    const py = reduced ? 0 : light.current.y;

    // In the Lab the route must stay lined up with its captions, so the camera holds still there.
    const loose = 1 - Math.max(0, 1 - Math.abs(t - 3));
    camera.position.set(frame.x + px * 0.14 * loose, s.y + py * 0.1 * loose, frame.z);
    camera.lookAt(frame.x, s.targetY, 0);
    if (camera.fov !== s.fov) {
      camera.fov = s.fov;
      camera.updateProjectionMatrix();
    }

    if (!reduced) spin.current += s.spin * delta;
    // Scenes with no idle turn (the wave field) must sit square to the camera,
    // so the accumulated turn fades out as the shot's spin goes to zero.
    const turn = spin.current * Math.min(s.spin / 0.02, 1);
    points.current?.rotation.set(s.rotX, s.rotY + turn, 0);

    u.uT.value = t;
    if (!reduced) u.uTime.value += delta;
    u.uLight.value.set(-0.52 + px * 0.7, 0.62 + py * 0.7, 0.59);
    u.uFocus.value = frame.z;
    u.uIntro.value = intro;

    // Lab: size the scene to this window. Half the screen width at the route's
    // plane, then the route's start and step in the same world units.
    const lab = rig[3];
    const labFrame = frameShot(lab, width / height);
    const labHalf = Math.hypot(labFrame.z, lab.y - lab.targetY) * labFrame.tan * (width / height);
    u.uLab.value.set(labHalf, stage.route.x0 * labHalf, stage.route.step * labHalf);
    // Portrait: the subject shares the column with the copy, so it steps back
    // to a faint texture while the text-heavy scenes (1 to 3) are on screen.
    const reading = THREE.MathUtils.smoothstep(t, 0.2, 0.9) * (1 - THREE.MathUtils.smoothstep(t, 3.2, 3.9));
    // The Lab's ground is dense: on narrow screens it steps back further still.
    const inLab = Math.max(0, 1 - Math.abs(t - 3));
    // Between two scenes the cloud crosses the copy: it thins out while it does.
    const inFlight = Math.sin((t - Math.floor(t)) * Math.PI);
    u.uOpacity.value = (portrait ? (0.7 - 0.52 * reading) * (1 - 0.65 * inLab) : 1) * (1 - 0.6 * inFlight);
    u.uPx.value = (DOT * height * state.gl.getPixelRatio()) / (2 * frame.tan);

    // Adaptive rendering: if the frame rate stays low, step the resolution down.
    const watch = slow.current;
    watch.frames += 1;
    watch.time += delta;
    if (watch.frames >= 90) {
      const average = watch.time / watch.frames;
      const dpr = state.gl.getPixelRatio();
      if (average > 1 / 40 && dpr > 1) state.setDpr(Math.max(1, dpr - 0.25));
      watch.frames = 0;
      watch.time = 0;
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
