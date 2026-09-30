# PlugIn3D — Dinis Pereira

A cinematic portfolio built with React and Next.js, exported to plain static HTML for GitHub Pages. No backend, account, database, or paid hosting is required.

## Preview locally

Use Node.js 24, then run:

```sh
npm ci
npm run build:github
npm run preview:github
```

Open http://127.0.0.1:4173/. Keep the preview command running while viewing the site. Rebuild after editing; refresh the browser to see changes. The existing Vinext development scripts remain available.

## Publish on GitHub Pages

1. Create a GitHub repository and upload this project's source files, including the hidden `.github` folder. Do not upload `node_modules`, `.next`, `out`, or `work`.
2. Use `main` as the default branch (or change the branch in `.github/workflows/pages.yml`).
3. In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Push to `main`, or run **Deploy portfolio to GitHub Pages** from the Actions tab.
5. When the workflow completes, GitHub Pages will show your published URL.

The workflow automatically sets the correct path for both `username.github.io` and `username.github.io/repository-name`. Custom domains configured in GitHub Pages are supported by the same workflow.

Deployments carry forward hashed CSS and JavaScript from the last three available successful Pages artifacts, so cached HTML keeps working after an update. Pages artifacts are retained for 30 days.

The source repository is https://github.com/denisspap/plugin3d-website. GitHub Pages uses the included workflow and retains the custom domain `plugin3d.studio`. Push changes to `main` to publish an update; check the Actions tab for build and deployment results.

## Edit content

- `lib/content.ts`: project titles, summaries, detailed descriptions, social links, product text, and image counts.
- `app/about/page.tsx`: the draft biography.
- `app/globals.css`: design, spacing, responsive layouts, and transitions.
- `app/page.tsx`: homepage slideshow. It starts with a random image on every visit or reload, avoids repeating the previous opening image in the same tab, and chooses randomized images at 4-second intervals, with a 1.15-second crossfade. Mouse-wheel scrolling and vertical touch swipes move through the images. It avoids immediate repeats, pauses in background tabs, and starts paused for visitors who request reduced motion.
- `public/projects`: all 19 supplied images in optimized WebP format, plus small versions for thumbnails.
- `public/tools`: the three official Superhive product covers.
- `public/models`: model cover images from Superhive.
- `lib/catalog.ts`: Making of posts and 3D model details.
- `public/plugin3d-logo.png`: transparent logo used in the header and About page.

Each project has a real static URL under `/projects/project-name/`, with its own gallery and page title. Making of lists eight specified Patreon posts, shuffled on each visit with direct links. 3D models and tools combines the three Superhive models and three Blender tools at `/tools/`; the previous `/models/` address forwards there. Contact shows only email and an Instagram message link (Instagram may require login). YouTube videos are embedded on matching project pages, including Partycles on Ring; Instagram videos use links only.

The original PNG images were not modified. To regenerate the optimized versions locally, run `node scripts/prepare-images.mjs "PATH_TO_ORIGINAL_IMAGES"`; the product originals must also be available in `work/product-assets`. Regeneration is not needed for deployment: the optimized files are already included.

## Research and copy

See `CONTENT-SOURCES.md` for provenance and editorial assumptions. TikTok is omitted until its profile is confirmed. About text is a draft for the owner to review. No client credits, awards, commercial partnerships, or employment history have been invented.
