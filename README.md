# Basketball Scoreboard

A tiny, responsive basketball scoreboard you can run locally in any modern browser. It shows the Home and Visitors scores, includes an auto‑running game clock, and adapts nicely from phones to desktops.

> Note: The repository folder name and some labels say "Baseball", but the app behaves like a basketball scoreboard (48‑minute clock, quarters). You can easily rename labels if you prefer.
>
> Side note: This README was created using Junie.

## Demo (how it looks)

Open `index.html` in your browser. You’ll see three cards:
- HOME: Team name/logo, big score, and +1/+2/+3 buttons
- TIME: Game clock and current period label
- VISITORS: Team name/logo, big score, and +1/+2/+3 buttons

## How it works

### Scoring
- Each team has three buttons: `+ 1`, `+ 2`, `+ 3`.
- Clicking a button adds the specified points to that team and instantly updates the large score display.
- Scores are managed in memory (no backend) and reset when you refresh the page.

### Game Clock
- The game clock starts automatically at page load.
- Initial duration: 48 minutes (standard full duration for a professional basketball half is different, but 48:00 is the full game length in the NBA; adapt as you like).
- The display shows `MM:SS` and ticks down every second.
- When the timer reaches 00:00, it stops automatically.

### Current Period / Quarter Label
- A label below the clock shows the current quarter (`Q1`, `Q2`, `Q3`, `Q4`).
- The quarter changes automatically as the timer winds down, based on the remaining time. When the clock hits `00:00`, the label switches to `FINAL`.
- Logic lives in `index.js` via the `getQuarter()` helper which maps remaining time to the correct quarter.

## Quick start

1. Clone or download this repo to your computer.
2. Open the project folder: `C:/Users/nikpe/Desktop/Code/jetbrains/WebstormProjects/baseballApp` (your path may differ).
3. Double‑click `index.html` (or drag it into a browser window).

No build step, server, or dependencies are required.

## Files overview

- `index.html`: The page structure. Defines three sections (Home, Time, Visitors), includes a Google Font for the score, and links the CSS and JavaScript.
- `index.css`: The layout and visual styling. Uses modern responsive techniques like CSS variables and `clamp()` for fluid sizes.
- `index.js`: The client‑side logic. Wires up the +1/+2/+3 buttons, updates scores, and runs the countdown timer.
- `images/*`: Team logos used by the Home and Visitors sections.

## Key features

- Responsive layout:
  - CSS Grid with `auto-fit` so cards flow into 1–3 columns depending on screen width.
  - Fluid typography and spacing using `clamp()` so large scores remain readable on any device.
  - Button rows wrap on small screens to keep touch targets comfortable.

- Accessible basics:
  - Live regions (`aria-live`) on score and time containers announce updates to assistive tech.
  - Clear focus styles can be enhanced further; see the suggestions below.

- Zero dependencies:
  - Vanilla HTML/CSS/JS; just open the file to use it.

## Customization

### Change team names and logos
Edit `index.html`:
- Update the `<h2>` labels for HOME and VISITORS.
- Replace image `src` paths in the `.team-logo img` tags with your own images in `images/`.

### Change the starting time
Edit `index.js`:
```js
// 48 minutes converted to seconds
let timeInSeconds = 48 * 60;
```
Set it to another duration (e.g., `10 * 60` for 10 minutes).

### Adjust typography & spacing
Edit `index.css` and tweak the CSS variables at the top:
```css
:root {
  --gap: clamp(8px, 2vw, 16px);
  --radius: 12px;
  --card-pad: clamp(16px, 2vw, 24px);
}
```

### Switch to a different theme
Change background or colors in the `body`, `.box`, and `.inner-*` rules. You can also add dark mode or high‑contrast variants with media queries like `@media (prefers-color-scheme: dark)`.

## Developer notes

### Structure highlights
- Grid container (`.grid-container`) uses `repeat(auto-fit, minmax(min(280px, 100%), 1fr))` to fluidly adapt the number of columns.
- The big score uses the retro `Press Start 2P` font for a scoreboard feel and is sized via `clamp()` to scale on phones and desktops.
- Buttons use flexbox in `.button-row` to distribute evenly and wrap on small screens.

### Logic highlights
- Scores are plain numbers in JavaScript, updated via a small helper function `addScore(points, el, score)`.
- The timer decrements once per second using `setInterval` and formats the display with `padStart`.

## Known limitations / tips

- Persistence: Scores and time reset on reload; add `localStorage` or a backend if you need persistence.
- Clock controls: There’s no pause/reset button yet; you can add them by exposing the interval ID and wiring extra buttons.
- Semantics: Ensure all interactive elements remain `<button>`s for proper accessibility and keyboard support.
- HTML correctness: If you edit the TIME section, make sure all tags are closed properly to avoid layout issues.

## License

MIT — do whatever you like, attribution appreciated.

## Credits

Icons/graphics: Team logos bundled in `images/`. Score font: Google Fonts `Press Start 2P`.
# basketball-scoreboard
