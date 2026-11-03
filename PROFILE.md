# Profile assets

Regenerate the README and animated/static banners with Node.js (no packages, API keys, or workflow required):

```sh
node scripts/build-profile.mjs
```

The banner uses self-contained SVG and CSS animation. It contains no JavaScript, external fonts, requests, or credentials. GitHub renders it as an image; no script runs inside the README. The picture selects dark/light animated artwork. The profile owner explicitly requested animation even when the browser reports reduced motion; the visible static-view link remains available. No browser or operating-system preference is changed.

The n8n icon is from Simple Icons, under CC0-1.0; other technology icons retain their Devicon MIT notice in `assets/icons/LICENSE`. Brand names and marks belong to their respective owners.

Projects were checked against the owner's Obsidian summaries. RMUTI DORM and RMUTI HOME refer to one project. No operational URLs, project account details, or credentials are included. Listing RepairDesk here does not publish its source code.

## Rollback

The previous profile is commit `39481a6`; the local checkpoint is `checkpoint/before-chaos-profile`. To restore the previous README while preserving history:

```sh
git restore --source=39481a6 -- README.md
git add README.md
git commit -m "docs: restore previous profile"
git push origin main
```

Older assets remain available, so the restored README works without deleting or rewriting commits. Restore with a new commit rather than force-pushing.
