# AfriVerse Website

A static, cinematic prototype website for AfriVerse.

## Deploy on Vercel

1. Create a GitHub repository named `afriverse`.
2. Upload:
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets/`
3. In Vercel choose **Add New → Project**.
4. Import the GitHub repository.
5. Framework preset: **Other**.
6. Build command: leave empty.
7. Output directory: leave empty.
8. Deploy.

## App mockups

Put the generated AfriVerse app interface screenshots in:

- `assets/app-01.png`
- `assets/app-02.png`
- `assets/app-03.png`

The CSS automatically places each screenshot inside a premium 3D phone frame.

Recommended screenshots:
- app-01: Ask AfriVerse / home interface
- app-02: Community knowledge contribution
- app-03: Knowledge verification / trust workflow

The page also includes HTML fallbacks, so it remains visually complete if the images are not yet present.

## Recommended future structure

Once the MVP becomes interactive, migrate this static presentation into Next.js/React and connect:
- Supabase
- authentication
- Q&A database
- voice upload
- expert verification
- multilingual services
- AI/RAG APIs
