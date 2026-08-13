# akhiltalati101 — Personal Website

Static HTML/CSS/JS personal site. No build step required.

## Structure

- `index.html` — all page content (About, Experience, Skills, Projects, Contact)
- `style.css` — styling, light/dark mode via `prefers-color-scheme`
- `script.js` — mobile nav toggle + pulls allowlisted repos live from the GitHub API
- `projects.json` — allowlist of repo names to show in Projects (edit this to control what's featured)
- `AkhilTalati_Resume.pdf` — linked from the nav bar "Resume" button
- `profile.md` — source data, not published (not referenced by the site)

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy to GitHub Pages

1. Push this repo to GitHub (already connected to `akhiltalati101/personal-website`):
   ```bash
   git add .
   git commit -m "Build personal website"
   git push -u origin main
   ```
2. On GitHub: repo → **Settings → Pages** → under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main / (root)** → Save.
3. Site will publish at `https://akhiltalati101.github.io/personal-website/`.

### Want it at the root domain instead?

`https://akhiltalati101.github.io/` (no `/personal-website/` path) only works if the repo is renamed to exactly `akhiltalati101.github.io`. Rename via repo **Settings → General → Repository name**, or set up a custom domain under **Settings → Pages → Custom domain**.

## Customizing

- **Projects**: shows only the repos listed in `projects.json`, in that order, pulled live from the GitHub API (name, description, language, star count come straight from GitHub — nothing to duplicate). To change what's featured, edit `projects.json`:
  ```json
  ["repo-name-one", "repo-name-two"]
  ```
  Repo names must match exactly (case-sensitive) what's in the GitHub URL. Anything not listed there won't show up, regardless of recency.
- **Phone number**: intentionally left off the public site (spam risk). Add it back in the Contact section of `index.html` if you want it visible.
- **Photo**: no headshot was provided. Drop an image (e.g. `photo.jpg`) in the project root and add an `<img>` tag in the `.hero` section of `index.html` if you'd like one.
- **Content weighting**: experience section follows the tiering already defined in `profile.md` (Faire/Replicant featured in full, internships condensed, lowest-tier roles omitted from the public page).
