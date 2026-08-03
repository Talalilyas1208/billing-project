## What this is
A React + Vite single-page app for managing billing/invoicing (customers, products, invoices) with Firebase used for authentication and Firestore storage — intended as a small billing dashboard UI.

### Stack
- **Language(s):** JavaScript (JSX)
- **Framework / runtime:** React (Vite-powered app)
- **Notable libraries:** Firebase (client SDK), react-router-dom (routing), Redux Toolkit / react-redux (state), Ant Design (UI), Vite (build/dev)

## How it's organized
```
README.md                 project overview and run instructions
index.html                Vite HTML entry
vite.config.js            Vite configuration
package.json              scripts & dependencies
pnpm-workspace.yaml
pnpm-lock.yaml
public/                   static assets (vite-served)
src/
  main.jsx                app entry → mounts <App /> and Provider(store)
  App.jsx                 top-level app, routing and layout (uses Config)
  App.css, index.css      global styles
  firebase/
    firebase.jsx          Firebase initialization (auth + Firestore)
  routes/ or Routes/      public / private route definitions (Publicroutes, Privateroutes)
  login/                  login UI & flows
  register/               registration UI
  pages/                  Dashboard, Customer, Products, Invoice, Newinvoice, Offer, Contact, EmptyInvoicePage, etc.
  components/             Sidebar, Table, Modal, Button, Input, Select, FormField, subfolders (NewCustomers, NewInvoice, Product, ui)
  store/                  Redux store (store/store.js referenced by main.jsx)
  Services/               API / business-logic helpers (service wrappers)
  hooks/                  custom React hooks
  utils/                  utility helpers
  assets/                 images/fonts/static files
```

How it fits together: Vite serves index.html; src/main.jsx mounts the React tree and provides the Redux store. App.jsx (wrapped by Config) composes routing using the project's Public/Private route components and maps nested pages (products, invoices, offers, customers). Firebase is initialized in src/firebase/firebase.jsx and is used for auth and Firestore reads/writes; Services/ contains wrappers/business logic that talk to Firebase. UI components (components/) are reused across pages.

## How to run it
Short path from a fresh clone:
1. Install dependencies:
   ```
   pnpm install
   ```
2. Provide Firebase configuration (the app initializes Firebase in src/firebase/firebase.jsx). Prefer using Vite env vars (VITE_ prefixed) or replace the config in that file. Expected variables (used conventionally):
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
3. Start dev server:
   ```
   pnpm dev
   ```
4. Build / preview:
   ```
   pnpm build
   pnpm preview
   ```

Note: package.json provides scripts (dev/build/preview) and the repo currently contains a firebase config object inside src/firebase/firebase.jsx.
