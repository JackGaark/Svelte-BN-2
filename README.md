# Bureau Normal

SvelteKit 2 / Svelte 5 implementation of the BAHN Figma design, using plain CSS.

## Run

```sh
npm install
npm run dev
```

`npm run check` checks Svelte and TypeScript. `npm run build` creates the production build.

## Pages

- `/`: long introduction and oversized identity. At the end of the landing page, the wordmark stays in place while the featured gallery slides up over it.
- `/selection`: full-screen featured images with horizontal scroll snapping, arrow-key and pointer navigation.
- `/index`: project list with hover/focus previews.
- `/survol`: 56-image overview, preserving the Figma ordering, crops and mirrors.
- `/projet/grande-allee-1`: centered, text, portrait and full-screen project slides; arrow keys and previous/next project links.
- `/bureau`: studio description, portrait placeholder, contact links and full wordmark footer.

## Design system

The landing ends at the wordmark with a hard scroll stop. After a brief pause at the bottom, a fixed gallery slides up over it and locks page scrolling. Wheel gestures advance the images; horizontal swipes, side buttons, and left/right arrow keys also work. Escape or the Bureau Normal logo closes the gallery and restores page scrolling. Reduced motion shortens the requested gallery entrance and skips horizontal animation. `/selection` retains its independent, looping horizontal gallery.

`src/app.css` defines the shared CSS Grid: desktop 8 columns / 8px gutters / 20px margins; tablet 6 / 5px / 15px; mobile 4 / 4px / 16px. Desktop reference width is 1440px. Colors, typography and page spacing follow the Figma frames. Assets are local under `static/assets`; the supplied Greed variable trial font is under `static/fonts`.

The Figma design contains repeated sample project names, placeholder text, a portrait placeholder, and empty project-detail image slots. These are retained deliberately. Replace the sample records in `src/lib/data.ts` and the page copy for production. The font is a trial file; use the appropriately licensed webfont for a public launch.

Reference nodes: landing `2802:307`, index `2927:2132`, overview `2973:295`, bureau `2973:566`, project formats `2973:503`, `2973:522`, `2973:537`, `2973:552`.
