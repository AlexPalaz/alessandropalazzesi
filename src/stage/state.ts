/**
 * The one mutable object the scroll director writes and the WebGL stage reads.
 * Kept outside React on purpose: it changes every frame.
 */
export const stage = {
  /** Scene progress: 0 hero, 1 services, 2 principles, 3 clients, 4 lab, 5 contact. Fractions are flights. */
  t: 0,
  /** Opening, 0 (particles off-screen, left and right) to 1 (assembled). */
  intro: 0,
  /** Pointer position, -1 to 1 on both axes, y up. */
  pointerX: 0,
  pointerY: 0,
  /**
   * Lab scene: where the route's first stop sits and the gap between stops,
   * as fractions of half the window width (-1 left edge, 1 right edge). The
   * scroll director measures them from the captions so stops and text line up.
   */
  route: { x0: -0.72, step: 0.48 },
  /** prefers-reduced-motion: scenes snap, nothing drifts. */
  reduced: false,
};

export const SCENE_COUNT = 6;
