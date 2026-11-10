export const vertexShader = /* glsl */ `
  uniform float uT;
  uniform float uTime;
  uniform float uPx;
  uniform float uInvert;
  uniform float uFocus;
  uniform float uIntro;
  uniform vec3 uLight;
  // Lab scene: half the screen width in world units, the x of the first stop, the gap between stops.
  uniform vec3 uLab;

  attribute vec3 aAgents;
  attribute vec3 aLattice;
  attribute vec3 aTerrain;
  attribute vec3 aPoint;
  attribute vec4 aSizeA;
  attribute float aSizeB;
  attribute float aSeed;
  attribute float aInk;
  attribute float aTone;
  attribute float aFlow;
  attribute vec4 aLab;

  varying float vInk;
  varying float vAlpha;

  float leg(float t, float from) {
    return smoothstep(0.0, 1.0, clamp(t - from, 0.0, 1.0));
  }

  void main() {
    float w1 = leg(uT, 0.0);
    float w2 = leg(uT, 1.0);
    float w3 = leg(uT, 2.0);
    float w4 = leg(uT, 3.0);

    // Lab: ground dots store x as a fraction of half the screen width; route
    // dots store the stop they belong to, plus a sideways offset.
    vec3 terrain = aTerrain;
    float onRoute = aLab.x;
    terrain.x = mix(aTerrain.x * uLab.x, uLab.y + aTerrain.x * uLab.z + aLab.y, onRoute);
    terrain.y += (1.0 - onRoute) * (
      sin(terrain.x * 1.6 + uTime * 0.6) * 0.11
      + cos(terrain.z * 2.1 - uTime * 0.45 + terrain.x * 0.7) * 0.08
    );

    vec3 p = position;
    p = mix(p, aAgents, w1);
    p = mix(p, aLattice, w2);
    p = mix(p, terrain, w3);
    p = mix(p, aPoint, w4);

    float size = aSizeA.x;
    size = mix(size, aSizeA.y, w1);
    size = mix(size, aSizeA.z, w2);
    size = mix(size, aSizeA.w, w3);
    size = mix(size, aSizeB, w4);

    // Agents scene: a pulse runs outwards along every link, like work being handed on.
    float pulse = pow(max(sin(6.2831853 * (aSeed * 1.5 - uTime * 0.3)), 0.0), 10.0);
    size *= 1.0 + aFlow * w1 * (1.0 - w2) * 2.2 * pulse;
    // Lab scene: a pulse travels the route from start to arrival.
    float routePulse = pow(max(sin(6.2831853 * (aSeed * 2.0 - uTime * 0.22)), 0.0), 12.0);
    size *= 1.0 + aLab.w * w3 * (1.0 - w4) * 2.6 * routePulse;

    // Between two scenes the particles scatter before they find their new seat.
    float flight = sin(fract(uT) * 3.14159265);
    vec3 drift = vec3(
      sin(aSeed * 91.7 + uTime * 0.7),
      cos(aSeed * 47.3 + uTime * 0.5),
      sin(aSeed * 23.1 - uTime * 0.6)
    );
    // At rest the dots only breathe; the lattice (scene 2) holds still so its nodes stay crisp.
    float breathe = 0.006 * (1.0 - w2 * (1.0 - w3));
    p += drift * (flight * 0.38 * (0.3 + aSeed) + breathe);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Opening: half the particles enter from the left edge, half from the right,
    // each on its own delay, and settle into their seat.
    float r1 = fract(aSeed * 13.7);
    float r2 = fract(aSeed * 5.3);
    float fromSide = fract(aSeed * 29.1) < 0.5 ? -1.0 : 1.0;
    float arrive = clamp(uIntro * 1.5 - r1 * 0.5, 0.0, 1.0);
    arrive = 1.0 - pow(1.0 - arrive, 3.0);
    vec3 entry = mv.xyz + vec3(fromSide * (4.6 + 3.0 * r2), (r1 - 0.5) * 0.9, (r2 - 0.5) * 1.6);
    mv.xyz = mix(entry, mv.xyz, arrive);
    mv.y += sin(arrive * 3.14159265) * (r2 - 0.5) * 0.9;

    // Sphere only: halftone shading. Print logic on paper (shadow = more ink),
    // inverted on the dark ground (light = bigger dots).
    vec3 n = normalize(normalMatrix * normalize(position));
    float lambert = max(dot(n, normalize(uLight)), 0.0);
    float tone = mix(pow(1.0 - lambert, 1.5), pow(lambert, 1.4), uInvert);
    float facing = smoothstep(-0.05, 0.25, n.z);
    float onShell = step(0.99, aSizeA.x);
    float shell = mix(1.0, (0.16 + 0.84 * tone) * facing, onShell);
    size *= mix(shell, 1.0, w1);

    gl_PointSize = size * uPx / -mv.z;
    gl_Position = projectionMatrix * mv;

    // Agents and Lab colour by role (aTone, aLab.z); the lattice uses the random mix (aInk).
    vInk = mix(mix(aTone, aInk, w2), aLab.z, w3) * w1 * (1.0 - w4);
    // Particles behind the subject's centre fade, for depth.
    vAlpha = mix(1.0, 0.45, smoothstep(0.0, 2.2, -mv.z - uFocus));
    // A particle with no size in this shape is not drawn at all (GL would still give it a pixel).
    vAlpha *= smoothstep(0.02, 0.1, size) * smoothstep(0.0, 0.12, arrive);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uDot;
  uniform vec3 uInkColor;
  uniform float uOpacity;

  varying float vInk;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.4, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uDot, uInkColor, vInk), a * vAlpha * uOpacity);
  }
`;
