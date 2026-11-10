/**
 * Camera director. One shot per scene; the stage interpolates between
 * neighbouring shots as `stage.t` moves. Edit the numbers here to re-block a scene.
 *
 * A shot is framed in screen terms, not world terms: `frameX` says where the
 * subject sits across the screen and `span` how much width it may take. The
 * stage turns that into a camera position for the current window, so the
 * subject keeps to its side and never slides under the copy when the window
 * is narrower or wider. The camera only slides, it never turns, so nothing skews.
 */
export type Shot = {
  /** Preferred camera distance. The stage pulls back further if the subject would not fit. */
  z: number;
  /** Camera height and the height it looks at. */
  y: number;
  targetY: number;
  /** Vertical field of view, degrees. */
  fov: number;
  /** Subject centre across the screen: 0 centre, 1 right edge, -1 left edge. */
  frameX: number;
  /** Half-width of the subject in world units. */
  extent: number;
  /** Half-height of the subject, and the height of its middle. Used on narrow windows. */
  extentY: number;
  centerY: number;
  /** Half-width the subject may take, as a fraction of half the screen width. */
  span: number;
  /** Subject orientation, radians. */
  rotX: number;
  rotY: number;
  /** Idle turn of the subject, radians per second. */
  spin: number;
};

const desktop: Shot[] = [
  // 0 Hero: the sphere, right half.
  { z: 4.9, y: 0, targetY: 0, fov: 34, frameX: 0.55, extent: 1.05, extentY: 1.05, centerY: 0, span: 0.42, rotX: -0.3, rotY: 0.55, spin: 0.05 },
  // 1 Services: the sphere has become an orchestration graph (core, four agents,
  // their tools). Right half, clear of the list, turning slowly.
  { z: 6.4, y: 0, targetY: 0, fov: 34, frameX: 0.55, extent: 1.5, extentY: 1.5, centerY: 0, span: 0.41, rotX: 0.2, rotY: 0.3, spin: 0.04 },
  // 2 Clients: three-quarter view of the lattice, right third.
  { z: 8.2, y: 0, targetY: 0, fov: 34, frameX: 0.61, extent: 1.55, extentY: 1.55, centerY: 0, span: 0.31, rotX: 0.46, rotY: 0.62, spin: 0.03 },
  // 3 Lab: square on to the route, low over the waves. Centred and never pulled
  // back (the scene sizes itself to the window in the shader).
  { z: 6.2, y: 0.55, targetY: 0.1, fov: 34, frameX: 0, extent: 1, extentY: 1, centerY: 0, span: 4, rotX: 0, rotY: 0, spin: 0 },
  // 4 Contact: everything condenses into the point.
  { z: 4.9, y: 0.1, targetY: 0.1, fov: 34, frameX: 0.56, extent: 1.1, extentY: 1.1, centerY: 0, span: 0.42, rotX: 0.42, rotY: 0, spin: 0.12 },
];

// Narrow windows: every scene is drawn inside its own box of the page (its
// "slot", see `frameSlot`). Here only the subject's size matters: `extent` and
// `extentY` are its half-width and half-height, `centerY` its middle, and
// `y - targetY` how far above the subject the camera looks down from.
const compact: Shot[] = [
  { z: 5, y: 0, targetY: 0, fov: 34, frameX: 0, extent: 1.12, extentY: 1.12, centerY: 0, span: 1, rotX: -0.3, rotY: 0.55, spin: 0.05 },
  { z: 5, y: 0, targetY: 0, fov: 34, frameX: 0, extent: 1.55, extentY: 1.5, centerY: 0, span: 1, rotX: 0.2, rotY: 0.3, spin: 0.04 },
  { z: 5, y: 0, targetY: 0, fov: 34, frameX: 0, extent: 1.7, extentY: 1.6, centerY: 0, span: 1, rotX: 0.46, rotY: 0.62, spin: 0.03 },
  // The Lab sizes itself to the window across, so only its height limits it.
  { z: 5, y: 0.45, targetY: 0, fov: 34, frameX: 0, extent: 0.05, extentY: 0.62, centerY: -0.08, span: 1, rotX: 0, rotY: 0, spin: 0 },
  // The disc is tilted further towards the viewer than on wide screens, to fill its box.
  { z: 5, y: 0, targetY: 0, fov: 34, frameX: 0, extent: 1.3, extentY: 0.98, centerY: 0, span: 1, rotX: 0.8, rotY: 0, spin: 0.12 },
];

export const RIGS = { desktop, compact };

/** Below this width the copy needs the full column: scenes move into their slots. */
export const COMPACT_WIDTH = 1280;

export const emptyShot = (): Shot => ({
  z: 5,
  y: 0,
  targetY: 0,
  fov: 34,
  frameX: 0,
  extent: 1,
  extentY: 1,
  centerY: 0,
  span: 1,
  rotX: 0,
  rotY: 0,
  spin: 0,
});

const KEYS = Object.keys(emptyShot()) as (keyof Shot)[];

/** Writes the shot at scene progress `t` into `out`. */
export function sampleShot(rig: Shot[], t: number, out: Shot): Shot {
  const last = rig.length - 1;
  const clamped = Math.min(Math.max(t, 0), last);
  const i = Math.min(Math.floor(clamped), last - 1);
  const k = clamped - i;
  // Ease the flight so the camera leaves and lands softly.
  const e = k * k * (3 - 2 * k);
  const a = rig[i];
  const b = rig[i + 1];
  for (const key of KEYS) out[key] = a[key] + (b[key] - a[key]) * e;
  return out;
}

/**
 * Resolves a shot for a window of the given aspect ratio: how far back the
 * camera stands and how far it slides sideways.
 */
export function frameShot(shot: Shot, aspect: number) {
  const tan = Math.tan((shot.fov * Math.PI) / 360);
  const fit = shot.extent / (shot.span * tan * aspect);
  const z = Math.max(shot.z, fit);
  const x = -shot.frameX * z * tan * aspect;
  return { x, z, tan };
}

/**
 * Narrow windows: frames the subject inside a box of the page (its slot),
 * centred across the window and as large as the box allows. `box` is in CSS
 * pixels from the top of the window; `width` and `height` are the window's.
 */
export function frameSlot(shot: Shot, box: { top: number; height: number }, width: number, height: number) {
  const tan = Math.tan((shot.fov * Math.PI) / 360);
  const fill = 0.88;
  const pxPerUnit = Math.min((fill * width) / (2 * shot.extent), (fill * box.height) / (2 * shot.extentY));
  const z = height / (2 * tan * pxPerUnit);
  // Where the camera must stand for the subject's middle to land on the box's middle.
  const y = shot.centerY + (box.top + box.height / 2 - height / 2) / pxPerUnit;
  return { x: 0, y, z, tan };
}
