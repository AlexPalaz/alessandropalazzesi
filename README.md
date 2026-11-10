# alessandropalazzesi

Personal site of Alessandro Palazzesi: one page, in Italian and English, with a
WebGL stage of particles that changes shape as the page scrolls.

## Run it

Needs Node 22 or newer (`.nvmrc` pins 24).

```bash
npm install
npm run dev      # http://localhost:3000/it or /en
npm run build    # writes the static site to out/
npx serve out    # preview the built site
npm run lint
```

The build is fully static (`out/`). `/` is `public/index.html`, which sends the
visitor to `/it/` or `/en/` from the browser's language.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).

## Where things are

| Path | What it holds |
| --- | --- |
| `src/i18n/en.ts`, `src/i18n/it.ts` | All the copy. `it.ts` is typed against `en.ts`, so a missing key fails the build. |
| `src/site.config.ts` | Email, LinkedIn and GitHub links. |
| `src/components/Sections.tsx` | The page's sections, top to bottom. |
| `src/app/globals.css` | Colour tokens for the dark (default) and light themes. |
| `src/stage/director.ts` | One camera shot per scene. Edit the numbers to re-block a scene. |
| `src/stage/formations.ts` | The shapes the particles take: sphere, agents graph, lattice, route, point. |
| `src/stage/shaders.ts` | The GLSL that blends between shapes. |
| `src/stage/ScrollDirector.tsx` | Turns scroll into scene progress (`stage.t`). |

## How the stage works

One `<canvas>` is mounted in the layout and stays fixed behind the page. Every
particle has a seat in each of the five shapes; the vertex shader blends between
seats as `stage.t` goes from 0 (hero) to 4 (contact). A section opens its scene
with `data-scene="n"`.

In the "How I work" section the four stops of the 3D route stand over the four
captions: the scroll director reads the captions' markers (`data-route-anchor`)
and passes their positions to the shader.

With `prefers-reduced-motion` the scenes snap instead of flying, and without
WebGL the stage is replaced by a still dot.
