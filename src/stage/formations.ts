/**
 * The six shapes the same particles take, one per scene. Every particle has a
 * seat in every shape, so a scene change is a pure GPU blend between seats.
 */
export type Formations = {
  count: number;
  sphere: Float32Array;
  agents: Float32Array;
  /** Principles scene: an empty frame with only four cells built. */
  carve: Float32Array;
  /** Principles scene, three values per particle: dot size, ink (1) or cobalt (0), and for the dots of a built block its turn in the pulse (0 for the rest). */
  carveInfo: Float32Array;
  /**
   * Clients scene: a diamond cut into slices, one per client. Four values per
   * particle: the seat with the slices closed up, then ink (1) or cobalt (0).
   */
  tower: Float32Array;
  /**
   * Clients scene, three values per particle: how far its slice lifts when the
   * diamond opens, how far it moves sideways, and its slice's turn in the pulse
   * (0 for the particles on no slice).
   */
  towerInfo: Float32Array;
  /** Lab scene. For route particles x is the stop number (0 to 3), not a position: see `lab`. */
  terrain: Float32Array;
  point: Float32Array;
  /** Dot size in four of the shapes (x sphere, y agents, z tower, w lab). */
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
 * Principles scene: "knowing what not to build". A cube drawn only by its
 * edges, split into 3 x 3 x 3 cells by faint dotted lines: the space of all
 * that could be built. Only four cells are solid, one per principle.
 */
const CARVE_HALF = 0.95;
const CARVE_CELL = (CARVE_HALF * 2) / 3;
const CARVE_BLOCK = 0.25;
/** The four built cells (column, level, depth), from the lowest to the highest. */
const CARVE_BUILT: Vec3[] = [
  [0, 0, 2],
  [2, 0, 1],
  [1, 1, 0],
  [1, 2, 2],
];

/**
 * Clients scene: "who I've worked with". One diamond (an octahedron: a rhombus
 * from every side, and a square wherever it is cut across), built from the
 * bottom tip up. Height is time, so each client is a slice as tall as the
 * years the work lasted, drawn as the squares it is made of, with a heavier
 * one at every new year. Two clients served in the same years are the two
 * halves of one slice. The latest slice is in cobalt and stops at today: the
 * tip above it is only dotted, because it is still to be built.
 */
const DIAMOND_HEIGHT = 1.25;
const DIAMOND_WIDTH = 0.85;
/** The years the whole diamond spans, from 2017 at the bottom tip. */
const DIAMOND_YEARS = 12;
const TODAY = 9.9;
/** Squares drawn per year. */
const YEAR_ROWS = 5;
/**
 * From the first to the latest: the years it spans (0 is 2017), the sides of
 * the square it takes (all four, or the two of its half), ink or cobalt, how
 * far it lifts and moves sideways when the diamond opens, its turn in the pulse.
 */
const SLICES = [
  { from: 0, to: 1, sides: [0, 1, 2, 3], ink: 1, lift: -1.5, shift: 0, turn: 1 }, // DM Group, 2017 to 2018
  { from: 1, to: 6, sides: [0, 1, 2, 3], ink: 1, lift: -0.5, shift: 0, turn: 2 }, // Enhancers, 2018 to 2023
  { from: 6, to: 8, sides: [3, 0], ink: 1, lift: 0.5, shift: 1, turn: 3 }, // Deltatre, 2023 to 2025
  { from: 6, to: 8, sides: [1, 2], ink: 1, lift: 0.5, shift: -1, turn: 3 }, // Nuvem, 2023 to 2025
  { from: 8, to: TODAY, sides: [0, 1, 2, 3], ink: 0, lift: 1.5, shift: 0, turn: 4 }, // Dipartimento per la trasformazione digitale, 2025 to today
];
/** The tip still to be built rides on the latest slice. */
const TIP = { ink: 0, lift: 1.5, shift: 0, turn: 5 };
const TURNS = 6;

/** Corner `q` of the square the diamond makes at `year`: the corners sit on the x and z axes. */
function diamondCorner(year: number, q: number): Vec3 {
  const y = -DIAMOND_HEIGHT + (2 * DIAMOND_HEIGHT * year) / DIAMOND_YEARS;
  const r = DIAMOND_WIDTH * (1 - Math.abs(y) / DIAMOND_HEIGHT);
  const k = ((q % 4) + 4) % 4;
  return [k === 0 ? r : k === 2 ? -r : 0, y, k === 1 ? r : k === 3 ? -r : 0];
}

type Site = { at: Vec3; size: number; ink: number; lift: number; shift: number; turn: number };
type Stroke = { from: Vec3; to: Vec3; length: number; size: number; role: { ink: number; lift: number; shift: number; turn: number } };

/**
 * Every dot of the diamond, laid out along its lines. `budget` is how many
 * dots there are to spend: the solid lines share them out by length, so the
 * drawing is as fine as the device allows.
 */
function diamondSites(budget: number): Site[] {
  const outlines: Stroke[] = [];
  const squares: Stroke[] = [];
  const dotted: Stroke[] = [];
  const stroke = (list: Stroke[], from: Vec3, to: Vec3, size: number, role: Stroke["role"]) => {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
    if (length > 0.004) list.push({ from, to, length, size, role });
  };

  for (const slice of SLICES) {
    const first = slice.sides[0];
    const last = first + slice.sides.length;
    const half = slice.sides.length < 4;
    const rows = Math.round((slice.to - slice.from) * YEAR_ROWS - 1e-6);
    for (let row = 0; row <= rows; row++) {
      const year = row === rows ? slice.to : slice.from + row / YEAR_ROWS;
      const rim = row === 0 || row === rows;
      // The squares the slice is made of: its two rims, a heavier one each new year, lighter ones between.
      const size = rim ? 0.36 : row % YEAR_ROWS === 0 ? 0.3 : 0.17;
      for (const side of slice.sides) {
        stroke(rim ? outlines : squares, diamondCorner(year, side), diamondCorner(year, side + 1), size, slice);
      }
      // A half slice is closed by the face where the diamond was cut in two.
      if (half) stroke(rim ? outlines : dotted, diamondCorner(year, first), diamondCorner(year, last), rim ? 0.36 : 0.22, slice);
    }
    // The slanted edges, from one rim to the other.
    for (let q = first; q <= (half ? last : last - 1); q++) {
      stroke(outlines, diamondCorner(slice.from, q), diamondCorner(slice.to, q), 0.36, slice);
    }
  }
  // The tip still to be built: its edges and the squares of the years to come, dotted.
  for (let q = 0; q < 4; q++) {
    stroke(dotted, diamondCorner(TODAY, q), diamondCorner(DIAMOND_YEARS, q), 0.34, TIP);
    for (let year = Math.ceil(TODAY); year < DIAMOND_YEARS; year++) {
      stroke(dotted, diamondCorner(year, q), diamondCorner(year, q + 1), 0.28, TIP);
    }
  }

  const sites: Site[] = [];
  const lay = (list: Stroke[], spacing: number) => {
    for (const { from, to, length, size, role } of list) {
      const dots = Math.max(2, Math.round(length / spacing));
      for (let j = 0; j < dots; j++) {
        const u = (j + 0.5) / dots;
        sites.push({
          at: [from[0] + (to[0] - from[0]) * u, from[1] + (to[1] - from[1]) * u, from[2] + (to[2] - from[2]) * u],
          size,
          ink: role.ink,
          lift: role.lift,
          shift: role.shift,
          turn: role.turn / TURNS,
        });
      }
    }
  };
  lay(dotted, 0.034);
  const total = (list: Stroke[]) => list.reduce((sum, item) => sum + item.length, 0);
  const left = (budget - sites.length) * 0.96;
  // A third of what is left goes to the outlines, the rest to the squares. Never finer than a solid line needs.
  lay(outlines, Math.max(total(outlines) / (left * 0.34), 0.008));
  lay(squares, Math.max(total(squares) / (left * 0.66), 0.009));
  return sites.slice(0, budget);
}

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
  const carve = new Float32Array(count * 3);
  const carveInfo = new Float32Array(count * 3);
  const tower = new Float32Array(count * 4);
  const towerInfo = new Float32Array(count * 3);
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

  // Principles scene: how the particles are shared out.
  const edgeCount = Math.floor(count * 0.2);
  const blockCount = Math.floor(count * 0.11);
  const blocksEnd = edgeCount + blockCount * CARVE_BUILT.length;
  const gridEnd = blocksEnd + Math.floor(count * 0.26);
  const blockSide = Math.floor(Math.sqrt(blockCount / 6));

  // Clients scene: the diamond takes most of the particles, the dust a few, the rest stay hidden.
  const diamond = diamondSites(Math.floor(count * 0.84));
  const diamondDustEnd = diamond.length + Math.floor(count * 0.08);
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

    // 2 · Principles: the cube's edges, the four built blocks, the dotted grid
    // of the cells left empty, and a little loose dust.
    const spot: Vec3 = [0, 0, 0];
    if (i < edgeCount) {
      const axis = i % 3;
      spot[axis] = (rnd() * 2 - 1) * CARVE_HALF;
      spot[(axis + 1) % 3] = rnd() < 0.5 ? -CARVE_HALF : CARVE_HALF;
      spot[(axis + 2) % 3] = rnd() < 0.5 ? -CARVE_HALF : CARVE_HALF;
      carveInfo[i3] = 0.36;
      carveInfo[i3 + 1] = 1;
    } else if (i < blocksEnd) {
      const j = i - edgeCount;
      const block = j % CARVE_BUILT.length;
      const k = Math.floor(j / CARVE_BUILT.length);
      const face = k % 6;
      const cell = Math.floor(k / 6);
      const centre = CARVE_BUILT[block].map((at) => -CARVE_HALF + (at + 0.5) * CARVE_CELL);
      if (cell < blockSide * blockSide) {
        // A regular grid of dots on each face, so the block reads as a solid.
        const axis = face >> 1;
        const a = ((cell % blockSide) / (blockSide - 1) - 0.5) * 2 * CARVE_BLOCK;
        const b = (Math.floor(cell / blockSide) / (blockSide - 1) - 0.5) * 2 * CARVE_BLOCK;
        spot[axis] = centre[axis] + (face & 1 ? CARVE_BLOCK : -CARVE_BLOCK);
        spot[(axis + 1) % 3] = centre[(axis + 1) % 3] + a;
        spot[(axis + 2) % 3] = centre[(axis + 2) % 3] + b;
        carveInfo[i3] = 0.5;
      } else {
        spot[0] = centre[0];
        spot[1] = centre[1];
        spot[2] = centre[2];
      }
      carveInfo[i3 + 2] = (block + 1) / CARVE_BUILT.length;
    } else if (i < gridEnd) {
      // A line of the inner grid: never one of the twelve outer edges.
      const axis = i % 3;
      let u = 0;
      let v = 0;
      while ((u === 0 || u === 3) && (v === 0 || v === 3)) {
        u = Math.floor(rnd() * 4);
        v = Math.floor(rnd() * 4);
      }
      // Quantised, so the line reads as dotted.
      spot[axis] = -CARVE_HALF + (Math.round(rnd() * 24) / 24) * 2 * CARVE_HALF;
      spot[(axis + 1) % 3] = -CARVE_HALF + u * CARVE_CELL;
      spot[(axis + 2) % 3] = -CARVE_HALF + v * CARVE_CELL;
      carveInfo[i3] = 0.3;
      carveInfo[i3 + 1] = 1;
    } else {
      spot[0] = (rnd() * 2 - 1) * 1.7;
      spot[1] = (rnd() * 2 - 1) * 1.4;
      spot[2] = (rnd() * 2 - 1) * 1.1;
      const big = rnd();
      carveInfo[i3] = 0.1 + 0.24 * big * big;
      carveInfo[i3 + 1] = ink[i];
    }
    carve[i3] = spot[0];
    carve[i3 + 1] = spot[1];
    carve[i3 + 2] = spot[2];

    // 3 · Clients: the dots of the diamond, then a little loose dust. The rest have no size here.
    const i4 = i * 4;
    if (i < diamond.length) {
      const site = diamond[i];
      tower[i4] = site.at[0];
      tower[i4 + 1] = site.at[1];
      tower[i4 + 2] = site.at[2];
      tower[i4 + 3] = site.ink;
      sizeA[i4 + 2] = site.size;
      towerInfo[i3] = site.lift;
      towerInfo[i3 + 1] = site.shift;
      towerInfo[i3 + 2] = site.turn;
    } else if (i < diamondDustEnd) {
      tower[i4] = (rnd() * 2 - 1) * 1.6;
      tower[i4 + 1] = (rnd() * 2 - 1) * 1.6;
      tower[i4 + 2] = (rnd() * 2 - 1) * 1.6;
      tower[i4 + 3] = ink[i];
      const big = rnd();
      sizeA[i4 + 2] = 0.1 + 0.24 * big * big;
    }

    // 4 · Lab: a route from start to arrival (four stops, the hops between them,
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

    // 5 · Point: a small dense core with a spiral of stragglers still arriving.
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

  return { count, sphere, agents, carve, carveInfo, tower, towerInfo, terrain, point, sizeA, sizeB, seed, ink, tone, flow, lab };
}
