/**
 * The five shapes the same particles take, one per scene. Every particle has a
 * seat in every shape, so a scene change is a pure GPU blend between seats.
 */
export type Formations = {
  count: number;
  sphere: Float32Array;
  agents: Float32Array;
  lattice: Float32Array;
  /** Lab scene. For route particles x is the stop number (0 to 3), not a position: see `lab`. */
  terrain: Float32Array;
  point: Float32Array;
  /** Dot size in the first four shapes (x sphere, y agents, z lattice, w lab). */
  sizeA: Float32Array;
  /** Dot size in the point shape. */
  sizeB: Float32Array;
  seed: Float32Array;
  /** 1 for the particles drawn in ink instead of cobalt once the sphere opens. */
  ink: Float32Array;
  /** Same, for the agents scene only: core, tools and links cobalt, the four agents ink. */
  tone: Float32Array;
  /** 1 for the dots that sit on a link of the agents graph. */
  flow: Float32Array;
  /**
   * Lab scene, four values per particle: on the route (1) or in the ground (0),
   * sideways offset from its stop, ink (1) or cobalt (0), and 1 if it is on the
   * path the pulse runs along.
   */
  lab: Float32Array;
};

/** World-space diameter of a full-size dot. The stage and the shapes share it. */
export const DOT = 0.026;

type Vec3 = [number, number, number];

/**
 * The agents scene is an orchestration graph in space: one core (the
 * orchestrator), four agents around it at the corners of a tetrahedron (one
 * per service), three tools around each agent, and the links between them.
 * Being a true 3D structure, it reads from any angle while it turns.
 */
const CORE_RADIUS = 0.34;
const AGENT_RADIUS = 0.17;
const TOOL_RADIUS = 0.06;
const AGENT_DISTANCE = 1.0;
const TOOL_DISTANCE = 0.42;

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
};
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

const AGENT_DIRECTIONS: Vec3[] = (
  [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ] as Vec3[]
).map(normalize);

const AGENTS: Vec3[] = AGENT_DIRECTIONS.map(
  (d) => [d[0] * AGENT_DISTANCE, d[1] * AGENT_DISTANCE, d[2] * AGENT_DISTANCE] as Vec3,
);

/** Three tools per agent, fanned out on the side facing away from the core. */
const TOOLS: Vec3[] = AGENT_DIRECTIONS.flatMap((d, index) => {
  const side = normalize(cross(d, Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
  const up = cross(d, side);
  return [0, 1, 2].map((k) => {
    const angle = (k * 2 * Math.PI) / 3 + index * 0.5;
    const out = normalize([
      d[0] * 0.55 + (Math.cos(angle) * side[0] + Math.sin(angle) * up[0]) * 0.84,
      d[1] * 0.55 + (Math.cos(angle) * side[1] + Math.sin(angle) * up[1]) * 0.84,
      d[2] * 0.55 + (Math.cos(angle) * side[2] + Math.sin(angle) * up[2]) * 0.84,
    ]);
    const agent = AGENTS[index];
    return [
      agent[0] + out[0] * TOOL_DISTANCE,
      agent[1] + out[1] * TOOL_DISTANCE,
      agent[2] + out[2] * TOOL_DISTANCE,
    ] as Vec3;
  });
});

/** Links, each from the surface of one node to the surface of the next. */
const LINKS: { from: Vec3; to: Vec3; weight: number }[] = [
  ...AGENTS.map((agent) => ({ from: [0, 0, 0] as Vec3, to: agent, weight: 3, r0: CORE_RADIUS, r1: AGENT_RADIUS })),
  ...TOOLS.map((tool, index) => ({
    from: AGENTS[Math.floor(index / 3)],
    to: tool,
    weight: 1,
    r0: AGENT_RADIUS,
    r1: TOOL_RADIUS,
  })),
].map(({ from, to, weight, r0, r1 }) => {
  const d = normalize([to[0] - from[0], to[1] - from[1], to[2] - from[2]]);
  const gap = 0.035;
  return {
    from: [from[0] + d[0] * (r0 + gap), from[1] + d[1] * (r0 + gap), from[2] + d[2] * (r0 + gap)] as Vec3,
    to: [to[0] - d[0] * (r1 + gap), to[1] - d[1] * (r1 + gap), to[2] - d[2] * (r1 + gap)] as Vec3,
    weight,
  };
});
const LINK_WEIGHT = LINKS.reduce((sum, link) => sum + link.weight, 0);

/**
 * Lab scene: the route climbs from the start (left, low) to the arrival
 * (right, high). Only heights are fixed here; where each stop sits across the
 * screen is decided at run time, so the stops line up with their captions.
 */
const ROUTE_HEIGHTS = [-0.11, 0.02, 0.16, 0.32];
const GROUND_Y = -0.45;

/** Height of the route at `along` (0 = start, 3 = arrival): a smooth climb with a small hop between stops. */
function routeHeight(along: number) {
  const last = ROUTE_HEIGHTS.length - 1;
  const k = Math.min(Math.floor(along), last - 1);
  const f = along - k;
  const p0 = ROUTE_HEIGHTS[Math.max(k - 1, 0)];
  const p1 = ROUTE_HEIGHTS[k];
  const p2 = ROUTE_HEIGHTS[k + 1];
  const p3 = ROUTE_HEIGHTS[Math.min(k + 2, last)];
  const smooth =
    0.5 * (2 * p1 + (p2 - p0) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (3 * p1 - p0 - 3 * p2 + p3) * f * f * f);
  return smooth + 0.07 * Math.sin(Math.PI * f);
}

/** Seat `j` of `n` on a sphere shell, evenly spread. */
function shellSeat(j: number, n: number, centre: Vec3, radius: number): Vec3 {
  const y = 1 - (2 * (j + 0.5)) / n;
  const r = Math.sqrt(1 - y * y);
  const a = j * Math.PI * (3 - Math.sqrt(5));
  return [centre[0] + Math.cos(a) * r * radius, centre[1] + y * radius, centre[2] + Math.sin(a) * r * radius];
}

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildFormations(count: number): Formations {
  const rnd = mulberry32(20261110);
  const gauss = () => {
    const u = Math.max(rnd(), 1e-6);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd());
  };

  const sphere = new Float32Array(count * 3);
  const agents = new Float32Array(count * 3);
  const lattice = new Float32Array(count * 3);
  const terrain = new Float32Array(count * 3);
  const point = new Float32Array(count * 3);
  const sizeA = new Float32Array(count * 4);
  const sizeB = new Float32Array(count);
  const seed = new Float32Array(count);
  const ink = new Float32Array(count);
  const tone = new Float32Array(count);
  const flow = new Float32Array(count);
  const lab = new Float32Array(count * 4);

  const surface = Math.floor(count * 0.3);
  const dust = Math.floor(count * 0.05);
  const golden = Math.PI * (3 - Math.sqrt(5));

  // Agents scene: how the particles are shared out.
  const coreCount = Math.floor(count * 0.22);
  const agentCount = Math.floor(count * 0.09);
  const agentsEnd = coreCount + agentCount * AGENTS.length;
  const toolCount = Math.floor(count * 0.01);
  const toolsEnd = agentsEnd + toolCount * TOOLS.length;
  const linkCount = Math.floor(count * 0.22);
  const linksEnd = toolsEnd + linkCount;

  const latticeSide = 10;
  const latticeNodes = latticeSide ** 3;
  // Lab scene: how the particles are shared out.
  const pathCount = Math.floor(count * 0.07);
  const arrivalCount = Math.floor(count * 0.035);
  const stopCount = Math.floor(count * 0.012);
  const stopsEnd = pathCount + arrivalCount + stopCount * (ROUTE_HEIGHTS.length - 1);
  const stemsEnd = stopsEnd + Math.floor(count * 0.025);
  const groundTotal = count - stemsEnd;
  const groundCols = Math.floor(Math.sqrt(groundTotal * 2.6));
  const groundRows = Math.floor(groundTotal / groundCols);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    seed[i] = rnd();
    ink[i] = rnd() < 0.28 ? 1 : 0;

    // 0 · Sphere: a shell of visible dots, a little dust around it, the rest hidden inside.
    if (i < surface) {
      const y = 1 - (2 * (i + 0.5)) / surface;
      const r = Math.sqrt(1 - y * y);
      const a = i * golden;
      sphere[i3] = Math.cos(a) * r;
      sphere[i3 + 1] = y;
      sphere[i3 + 2] = Math.sin(a) * r;
      sizeA[i * 4] = 1;
    } else {
      const a = rnd() * Math.PI * 2;
      const y = rnd() * 2 - 1;
      const r = Math.sqrt(1 - y * y);
      const isDust = i < surface + dust;
      const u = rnd();
      const radius = isDust ? 1.12 + 0.9 * u * u : 0.85 * Math.cbrt(u);
      sphere[i3] = Math.cos(a) * r * radius * (isDust ? 1.2 : 1);
      sphere[i3 + 1] = y * radius * (isDust ? 0.85 : 1);
      sphere[i3 + 2] = Math.sin(a) * r * radius;
      sizeA[i * 4] = isDust ? 0.3 * (1 - 0.6 * u) : 0;
    }

    // 1 · Agents: core, four agents, their tools, the links, and a little loose dust.
    let seat: Vec3;
    if (i < coreCount) {
      seat = shellSeat(i, coreCount, [0, 0, 0], CORE_RADIUS);
      sizeA[i * 4 + 1] = 0.5;
      tone[i] = 0;
    } else if (i < agentsEnd) {
      const j = i - coreCount;
      seat = shellSeat(Math.floor(j / AGENTS.length), agentCount, AGENTS[j % AGENTS.length], AGENT_RADIUS);
      sizeA[i * 4 + 1] = 0.42;
      tone[i] = 1;
    } else if (i < toolsEnd) {
      const j = i - agentsEnd;
      seat = shellSeat(Math.floor(j / TOOLS.length), toolCount, TOOLS[j % TOOLS.length], TOOL_RADIUS);
      sizeA[i * 4 + 1] = 0.4;
      tone[i] = 0;
    } else if (i < linksEnd) {
      // Pick a link in proportion to its length, then a place along it.
      let pick = rnd() * LINK_WEIGHT;
      let link = LINKS[0];
      for (const candidate of LINKS) {
        link = candidate;
        pick -= candidate.weight;
        if (pick <= 0) break;
      }
      const u = rnd();
      seat = [
        link.from[0] + (link.to[0] - link.from[0]) * u,
        link.from[1] + (link.to[1] - link.from[1]) * u,
        link.from[2] + (link.to[2] - link.from[2]) * u,
      ];
      sizeA[i * 4 + 1] = 0.34;
      tone[i] = 0;
      // The shader runs a pulse along each link; it needs to know where this dot sits.
      flow[i] = 1;
      seed[i] = u;
    } else {
      seat = [(rnd() * 2 - 1) * 1.6, (rnd() * 2 - 1) * 1.3, (rnd() * 2 - 1) * 1.0];
      const big = rnd();
      sizeA[i * 4 + 1] = 0.1 + 0.26 * big * big;
      tone[i] = ink[i];
    }
    agents[i3] = seat[0];
    agents[i3 + 1] = seat[1];
    agents[i3 + 2] = seat[2];

    // 2 · Lattice: several particles share each node, so nodes read as solid dots.
    const node = i % latticeNodes;
    const lx = node % latticeSide;
    const ly = Math.floor(node / latticeSide) % latticeSide;
    const lz = Math.floor(node / (latticeSide * latticeSide));
    const step = 2 / (latticeSide - 1);
    lattice[i3] = -1 + lx * step + gauss() * 0.002;
    lattice[i3 + 1] = -1 + ly * step + gauss() * 0.002;
    lattice[i3 + 2] = -1 + lz * step + gauss() * 0.002;
    sizeA[i * 4 + 2] = 0.85;

    // 3 · Lab: a route from start to arrival (four stops, the hops between them,
    // a stem under each stop) over a low field of waves.
    if (i < pathCount) {
      const along = rnd() * (ROUTE_HEIGHTS.length - 1);
      terrain[i3] = along;
      terrain[i3 + 1] = routeHeight(along);
      terrain[i3 + 2] = 0;
      sizeA[i * 4 + 3] = 0.34;
      lab[i * 4] = 1;
      lab[i * 4 + 3] = 1;
      // The shader runs a pulse from start to arrival; it needs the place along the route.
      seed[i] = along / (ROUTE_HEIGHTS.length - 1);
    } else if (i < stopsEnd) {
      const j = i - pathCount;
      const stop = j < arrivalCount ? ROUTE_HEIGHTS.length - 1 : (j - arrivalCount) % (ROUTE_HEIGHTS.length - 1);
      const height = ROUTE_HEIGHTS[stop];
      let offset: Vec3;
      if (stop === 0) {
        // Start: an open ring.
        const a = rnd() * Math.PI * 2;
        offset = [Math.cos(a) * 0.075, Math.sin(a) * 0.075, 0];
      } else if (stop === ROUTE_HEIGHTS.length - 1) {
        // Arrival: a full sphere with a halo around it.
        if (j % 4 === 0) {
          const a = rnd() * Math.PI * 2;
          offset = [Math.cos(a) * 0.19, Math.sin(a) * 0.19, 0];
        } else {
          offset = shellSeat(j, arrivalCount, [0, 0, 0], 0.115);
        }
      } else {
        offset = shellSeat(Math.floor((j - arrivalCount) / (ROUTE_HEIGHTS.length - 1)), stopCount, [0, 0, 0], 0.06);
      }
      terrain[i3] = stop;
      terrain[i3 + 1] = height + offset[1];
      terrain[i3 + 2] = offset[2];
      sizeA[i * 4 + 3] = stop === ROUTE_HEIGHTS.length - 1 ? 0.46 : 0.36;
      lab[i * 4] = 1;
      lab[i * 4 + 1] = offset[0];
    } else if (i < stemsEnd) {
      const stop = (i - stopsEnd) % ROUTE_HEIGHTS.length;
      const top = ROUTE_HEIGHTS[stop] - (stop === ROUTE_HEIGHTS.length - 1 ? 0.24 : 0.11);
      // Quantised, so the stem reads as a dotted line.
      const down = Math.round((rnd() * (top - GROUND_Y)) / 0.04) * 0.04;
      terrain[i3] = stop;
      terrain[i3 + 1] = top - down;
      terrain[i3 + 2] = 0;
      sizeA[i * 4 + 3] = 0.26;
      lab[i * 4] = 1;
    } else {
      const j = i - stemsEnd;
      const row = Math.floor(j / groundCols);
      if (row < groundRows) {
        // x is a fraction of half the screen width (the shader scales it), so the field always bleeds off both edges.
        terrain[i3] = ((j % groundCols) / (groundCols - 1) - 0.5) * 2.4;
        terrain[i3 + 1] = GROUND_Y;
        terrain[i3 + 2] = -4 + (row / (groundRows - 1)) * 5.2;
        sizeA[i * 4 + 3] = 0.3;
      } else {
        terrain[i3 + 1] = GROUND_Y;
        sizeA[i * 4 + 3] = 0;
      }
      lab[i * 4 + 2] = rnd() < 0.1 ? 0 : 1;
    }

    // 4 · Point: a small dense core with a spiral of stragglers still arriving.
    if (i % 100 < 55) {
      const a = rnd() * Math.PI * 2;
      const y = rnd() * 2 - 1;
      const r = Math.sqrt(1 - y * y);
      const radius = 0.17 * Math.cbrt(rnd());
      point[i3] = Math.cos(a) * r * radius;
      point[i3 + 1] = y * radius;
      point[i3 + 2] = Math.sin(a) * r * radius;
      sizeB[i] = 0.9;
    } else {
      const t = rnd();
      const radius = 0.3 + 0.95 * Math.pow(t, 1.2) + gauss() * 0.022 * (0.3 + t);
      const a = t * 5.2 * Math.PI * 2 + gauss() * 0.05;
      point[i3] = Math.cos(a) * radius;
      point[i3 + 1] = gauss() * 0.015;
      point[i3 + 2] = Math.sin(a) * radius;
      sizeB[i] = 0.16 + 0.5 * (1 - t);
    }
  }

  return { count, sphere, agents, lattice, terrain, point, sizeA, sizeB, seed, ink, tone, flow, lab };
}
