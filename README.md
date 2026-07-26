## What this is
A React + Vite single‑page billing/invoicing frontend that provides product, invoice, offers and customer screens and uses Firebase for authentication and Firestore as its data store. It’s built as a client app (SPA) intended to run locally during development behind a proxied backend API (the code talks to /api).

### Stack
- **Language(s):** JavaScript (primarily)
- **Framework / runtime:** React 19 + Vite (Vite 7.x)
- **Notable libraries:** Firebase (auth + Firestore), Ant Design (UI), react-router-dom (routing), Tailwind (via @tailwindcss/vite), @dnd-kit (drag/drop utilities)

## How it's organized
Top-level (annotated):
```
.gitattributes
.gitignore
README.md                 # template README for React + Vite
eslint.config.js
index.html                # Vite entry HTML
package.json              # scripts & dependencies
pnpm-lock.yaml
pnpm-workspace.yaml
vite.config.js            # dev server + /api proxy to http://localhost:8080
public/                   # static assets (vite.svg, etc.)
src/                      # main application code (see below)
```

src/ (important entries)
```
src/
  main.jsx                 # app bootstrap, mounts <App />
  App.jsx                  # root router + route layout (Public / Private)
  index.css, App.css       # small global styles
  firebase/firebase.jsx    # Firebase initialize + exported auth, db (config is in this file)
  pages/                   # page views (Dashboard, Products, Invoice, Newinvoice, Offer, Contact, Customer, Emptyinvoicepage)
    Dashborad.jsx
    Products.jsx
    Invoice.jsx
    Newinvoice.jsx
    ... 
  components/              # reusable UI components (Sidebar, Table, Modal, Button, Config wrapper, etc.)
  hooks/                   # custom hooks (usefetch, useConfirmNavigation, etc.)
  routes/ or Routes/       # Public/Private route wrappers used by App.jsx
  Services/                # service layer (API wrappers, likely)
  utils/                   # utility helpers
  assets/                  # images/static assets
```

How it fits together:
- main.jsx mounts App, which wraps the app in a Config component and sets up react-router routes. PublicRoute and PrivateRoute control access to login/register vs dashboard pages.
- The app uses a custom usefetch hook to call REST endpoints under /api (Products.jsx shows calls to /api/products). Vite's dev server proxies /api to http://localhost:8080 (see vite.config.js).
- Firebase (src/firebase/firebase.jsx) provides client auth and Firestore access; many pages rely on an “activeUser” stored locally (use-local-storage) and on Firebase auth for sign-in/sign-out.
- UI is largely Ant Design components with some Tailwind integration and custom components for tables, modals and forms.

## How to run it
Shortest path from a fresh clone to a running dev server:
- This repo includes pnpm workspace files; use pnpm if available.

Commands:
```bash
git clone https://github.com/Talalilyas1208/billing-project.git
cd billing-project
# using pnpm (recommended because repo includes pnpm-workspace + pnpm-lock)
pnpm install
pnpm dev

# or with npm (works but respects package.json scripts)
npm install
npm run dev
```

Notes:
- Vite dev server proxies /api to http://localhost:8080 (vite.config.js). Start the backend API at that address (or change the proxy) to make endpoints such as /api/products work.
- Firebase config is currently initialized in src/firebase/firebase.jsx (keys are present in the file). No extra env vars are required by the code as-is, but you may want to move keys to environment variables for production.
- Build / preview:
```bash
pnpm build
pnpm preview
```
