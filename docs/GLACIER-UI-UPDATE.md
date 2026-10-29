# DevDirectory Glacier Liquid Glass Update

## Visual palette
- `#021024` — deep midnight navy
- `#052659` — primary navy
- `#5483B3` — ocean blue
- `#7DA0CA` — steel blue
- `#C1E8FF` — ice blue

The stylesheet uses glass surfaces, blur/saturation, soft blue gradients, animated entrance and floating orbs, hover elevation, progress transitions, responsive layouts, and reduced-motion support. Light and dark themes are retained.

## Workspace additions in this update
- Analytics view for project/task/goal/DSA summaries.
- Technical posts feed with create and delete actions using browser-local storage.
- Existing project, task, goal, issue, DSA, GitHub public repo lookup, profile/portfolio preview, resume print/export and notifications views retained.

## Important limitations
This is still a frontend demo. Feature data is stored in the current browser; it is not shared between accounts/devices. Authentication is mock/local and not secure production authentication. JSONPlaceholder is a demo API and does not persist created posts. GitHub integration retrieves public repositories only. Team matching uses sample profiles and keyword overlap. Portfolio preview is not hosted as a public URL. Resume export uses the browser print dialog (choose Save as PDF).

## Run locally
```bash
npm install
npm run dev
npm run build
```
