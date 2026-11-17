# Ataur Rahman Akash — Architectural Portfolio

A static portfolio website prepared for GitHub Pages. The existing individual HTML, CSS, JavaScript, shared partials, and PDF files remain at the repository root. Image and audio files are organized in `assets/`.

## Main pages and public routes

| Page | Route |
|---|---|
| Home (preloader appears on the clean root visit) | `/` |
| Home after navigation | `/#home` |
| Resume modal | `/#resume` |
| Contact modal | `/#contact` |
| Resume PDF | `/resume.pdf` |
| 3D Visualization | `/3Dvisualization` |
| 3D Visualization — Exterior | `/3Dvisualization/exterior` |
| 3D Visualization — Interior | `/3Dvisualization/interior` |
| Animation Walkthrough | `/Animation_Walkthrough` |
| Animation Walkthrough — Exterior | `/Animation_Walkthrough/exterior` |
| Animation Walkthrough — Interior | `/Animation_Walkthrough/interior` |
| Experience | `/experience` |
| Experience — National | `/experience/national` |
| Experience — International | `/experience/international` |
| Miniature Models | `/miniature_models` |
| Studio | `/studio` |

The directory `index.html` files make these extensionless routes available on GitHub Pages. GitHub Pages may canonicalize a directory URL by adding a trailing slash when it is opened directly; navigation within the site writes the clean route without `.html`.

## Deploy to GitHub Pages

1. Extract the ZIP and upload the **contents** of `Akash_portfolio` to the root of your GitHub repository (so `index.html`, `assets/`, and the route folders are at the repository root). Do not upload only the outer folder as a nested directory.
2. In GitHub, open **Settings → Pages**. Select **Deploy from a branch**, choose the branch containing these files and the `/(root)` folder, then save.
3. For a custom domain such as `www.example.com`, add it in the Pages settings and configure the DNS records GitHub provides. The website files are also written to support GitHub project sites published under a repository subpath.
4. Once deployment finishes, open the published URL. The preloader is used on the clean root entry; navigating to Home uses `/#home` and does not replay it.

## Local preview

Run the folder through a local static web server (for example, VS Code Live Server). This is recommended because the site loads `nav.html` and `footer.html` with `fetch()`, which browsers block when an HTML file is opened directly using a `file://` URL.

## Project files

- `index.html` — homepage and initial preloader entry
- `preload.html` — preloading animation
- `nav.html`, `footer.html` — shared navigation and footer partials
- `style.css`, `script.js` — shared styles and site behavior/routing
- `3Dvis.html`, `AW.html`, `exp.html`, `model.html`, `studio.html` — retained source page files
- `resume.pdf` — CV document
- `assets/` — supplied portrait, backgrounds, work-card images, and ambient audio
- Route folders — static `index.html` entry points for the public URLs listed above

## Notes

- Keep the original file and folder names (including capitalization) when deploying; GitHub Pages URLs are case-sensitive.
- Update the corresponding file inside `assets/` if you replace any supplied picture or audio track.
- The `Open resume.pdf` link opens the PDF directly at `/resume.pdf`.
