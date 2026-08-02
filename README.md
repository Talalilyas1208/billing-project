## What this is
A small React + Vite single-page application for managing billing/invoicing (customers, products, invoices) with Firebase used for authentication/storage; it provides UI pages and components to create and view invoices, products, and customers and is intended for developers or small teams who want a client-side billing/admin front end.

### Stack
- **Language(s):** JavaScript (JSX)
- **Framework / runtime:** React (Vite-powered app)
- **Notable libraries / tools:** Firebase (client SDK) for auth/data, React Router (route files present), Vite (dev/build), CSS Modules / plain CSS for styling, pnpm as the package manager (pnpm-workspace.yaml / pnpm-lock.yaml present)

## How it's organized
```
README.md                 project overview, how-to, and notes
index.html                Vite HTML entry
vite.config.js            Vite configuration
package.json              npm scripts & deps
pnpm-workspace.yaml
pnpm-lock.yaml
public/                   static assets (served by Vite)
src/
  main.jsx                React entry → mounts <App />
  App.jsx                 top-level app + routing/layout
  App.css, index.css      global styles
  firebase/
    firebase.jsx          Firebase initialization and config
  Routes/
    Publicroutes.jsx      public route definitions
    Privateroutes.jsx     routes protected by auth
  Login/
    login.jsx             login UI & auth flows
  Register/
    Register.jsx          registration UI
  pages/
    Dashborad.jsx         dashboard page
    Customer.jsx          customer list / management
    Newinvoice.jsx        invoice creation flow
    Invoice.jsx           invoice detail page
    Products.jsx          product list / management
    EmptyInvoicePage.jsx
    Contact.jsx, Offer.jsx
  components/
    Sidebar.jsx           app navigation / layout
    Table.jsx             reusable table component
    Modal.jsx             modal dialogs
    Button.jsx, Input.jsx, Select.jsx, FormField.jsx, etc.
    (subfolders: NewCustomers, NewInvoice, Product, ui)
  Services/               API / business-logic helpers (service wrappers)
  utils/                  utility helpers
  hooks/                  custom React hooks
  assets/                 images/fonts/static files
.eslint.config.js         linting rules
.gitattributes/.gitignore
```

How it fits together:
- Vite starts the dev server and serves index.html → main.jsx mounts the React tree. App.jsx composes layout and loads route configuration from src/Routes (Publicroutes / Privateroutes). Pages under src/pages implement the major screens (Products, Customers, Invoices, Dashboard). UI is built from reusable components in src/components (Sidebar, Table, Modal, inputs). Firebase is initialized in src/firebase/firebase.jsx and used by the login/register pages and likely by Services for reads/writes. Services and utils encapsulate data access and helpers so components remain presentational.

## How to run it
Likely uses pnpm + Vite. From a fresh clone:
1. Install dependencies:
   ```
   pnpm install
   ```
2. Add Firebase credentials (the app initializes Firebase in src/firebase/firebase.jsx). Prefer adding Vite env vars in a `.env` file (Vite uses VITE_ prefixed vars), or supply the same config the code expects:
   - Example expected values: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc. (check src/firebase/firebase.jsx for exact names).
3. Start dev server:
   ```
   pnpm dev
   ```
4. Build for production:
   ```
   pnpm build
   pnpm preview
   ```

Notes: The repo uses Vite dev server (default port 5173). There are no visible test scripts in top-level files fetched; if tests exist, run via the script name in package.json (e.g., `pnpm test`).
