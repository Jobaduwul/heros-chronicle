# Kazi Jawadul Islam Jishan — Portfolio

A responsive, Final Fantasy VII-inspired portfolio built with React, TypeScript, and Vite. It presents game development work, skills, career and education history, and contact links in an interactive RPG-style interface.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local address when the development server starts.

## Build and preview

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.tsx` — portfolio content, sections, navigation, and interactions
- `src/style.css` — visual design, responsive layout, and animations
- `public/images/` — portraits, game artwork, studio and school logos, and UI artwork
- `public/audio/` — background music and menu sound effects

## Personalizing content

Update the content and links in `src/App.tsx`. Replace or add image and audio files under `public/`, then update the corresponding asset paths in the app. The audio, cursor, and motion controls are available in the top bar.

## Notes

- The contact links open email, phone, GitHub, and LinkedIn destinations; there is no backend contact form.
- The project requires no environment variables or server-side services.
