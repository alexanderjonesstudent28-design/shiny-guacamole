# Simple Unblocked Games — docs/ site

This folder is ready to be published with GitHub Pages from the repository `main` branch using the `docs/` folder.

To publish:

1. Commit and push the `docs/` folder to your repository.
2. On GitHub, go to Settings → Pages and set the Source to `main` branch / `docs/` folder.
3. Wait a minute and your site will be available at `https://<your-user>.github.io/<repo>/`.

Local testing:

```bash
cd docs
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes:
- This site includes only simple, self-hosted HTML5 games. Ensure you have rights to distribute any third-party games.
- To add games, put a folder in `docs/games/` and add a link from `docs/index.html`.
